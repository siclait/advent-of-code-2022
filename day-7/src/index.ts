export interface INode {
  name: string
  parent: INode
  root: IDirectory
  size: number
}

abstract class Node {
  private _parent?: INode

  constructor(readonly name: string) {}

  get parent(): INode {
    if (!this._parent) throw new Error("Parent not found")
    return this._parent
  }

  set parent(parent: INode) {
    this._parent = parent
  }

  get root(): IDirectory {
    if (this.name === "/") return this as unknown as IDirectory
    return this.parent.root
  }
}

export interface IFile {
  name: string
  size: number
  parent: INode
  root: IDirectory
}

class File extends Node implements IFile {
  constructor(readonly name: string, readonly size: number) {
    super(name)
  }

  toString(): string {
    return `- ${this.name} (file, size=${this.size})\n`
  }
}

export interface IDirectory {
  name: string
  children: INode[]
  addChild(child: INode): void
  cd(name: string): IDirectory
  parent: INode
  root: IDirectory
  size: number
}

class Directory extends Node implements IDirectory {
  readonly children: INode[] = []

  constructor(name: string) {
    super(name)
  }

  addChild(child: INode): void {
    child.parent = this
    this.children.push(child)
  }

  cd(name: string): IDirectory {
    const child = this.children.find((child) => child.name === name)
    if (!child || !isDirectory(child)) throw new Error(`No directory found with name ${name}`)
    return child
  }

  get size(): number {
    return this.children.map((child) => child.size).reduce((sum, value) => sum + value, 0)
  }

  toString(): string {
    let result = `- ${this.name} (dir)\n`
    for (const child of this.children) {
      result += padLeft(child.toString(), 2)
    }
    return result
  }
}

export function isDirectory(node: INode): node is IDirectory {
  return node instanceof Directory
}

function padLeft(s: string, n: number): string {
  let result = ""
  const lines = s.split("\n")

  for (const line of lines.slice(0, lines.length - 1)) {
    for (let i = 0; i < n; i++) {
      result += " "
    }
    result += `${line}\n`
  }

  return result
}

export function buildFilesystem(input: string): IDirectory {
  const filesystem = new Directory("/")
  const lines = input.split("\n")

  let currentNode: INode = filesystem

  for (const line of lines.slice(0, lines.length - 1)) {
    const command = parse(line)
    switch (command.type) {
      case CommandType.ChangeDirectoryIn:
        if (!isDirectory(currentNode)) throw new Error("Trying to CD on non-directory")
        currentNode = currentNode.cd(command.directory)
        break
      case CommandType.ChangeDirectoryOut:
        currentNode = currentNode.parent
        break
      case CommandType.ChangeDirectoryRoot:
        currentNode = currentNode.root
        break
      case CommandType.List:
        break
      case CommandType.AppendChild:
        if (!isDirectory(currentNode)) throw new Error("Trying to CD on non-directory")
        if (command.left === "dir") {
          currentNode.addChild(new Directory(command.right))
        } else {
          currentNode.addChild(new File(command.right, parseInt(command.left)))
        }
        break
    }
  }

  return filesystem.root
}

function parse(line: string): Command {
  const tokens = line.split(" ")

  if (tokens[0] !== "$") {
    return { type: CommandType.AppendChild, left: tokens[0], right: tokens[1] }
  }

  switch (tokens[1]) {
    case "cd": {
      if (tokens[2] === "/") return { type: CommandType.ChangeDirectoryRoot }
      if (tokens[2] === "..") return { type: CommandType.ChangeDirectoryOut }
      return { type: CommandType.ChangeDirectoryIn, directory: tokens[2] }
    }
    case "ls":
      return { type: CommandType.List }
    default:
      throw new Error("Parse error")
  }
}

enum CommandType {
  ChangeDirectoryIn,
  ChangeDirectoryOut,
  ChangeDirectoryRoot,
  List,
  AppendChild,
}

interface ChangeDirectoryIn {
  type: CommandType.ChangeDirectoryIn
  directory: string
}

interface ChangeDirectoryOut {
  type: CommandType.ChangeDirectoryOut
}

interface ChangeDirectoryRoot {
  type: CommandType.ChangeDirectoryRoot
}

interface List {
  type: CommandType.List
}

interface AppendChild {
  type: CommandType.AppendChild
  left: string
  right: string
}

type Command = ChangeDirectoryIn | ChangeDirectoryOut | ChangeDirectoryRoot | List | AppendChild

export function filter(root: IDirectory, predicate: (node: INode) => boolean): INode[] {
  let results: INode[] = []
  for (const child of root.children) {
    if (predicate(child)) results.push(child)
    if (isDirectory(child)) {
      results = results.concat(filter(child, predicate))
    }
  }
  return results
}

export function totalSizeDirectoryUnder100K(input: string): number {
  const filesystem = buildFilesystem(input)
  return filter(filesystem, (node) => isDirectory(node) && node.size <= 100_000)
    .map((node) => node.size)
    .reduce((sum, value) => sum + value, 0)
}

export function sizeOfDeletedDirectory(input: string): number {
  const filesystem = buildFilesystem(input)
  const usedSpace = filesystem.size
  const unusedSpace = 70_000_000 - usedSpace
  const toBeDeleted = 30_000_000 - unusedSpace

  const directorySizes = filter(filesystem, (node) => isDirectory(node)).map((node) => node.size)

  directorySizes.sort((a, b) => a - b)

  const result = directorySizes.find((size) => size >= toBeDeleted)
  if (result === undefined) throw new Error("No valid directory found")
  return result
}
