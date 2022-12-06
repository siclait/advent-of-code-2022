type Crate = string

export class Stack {
  crates: Crate[] = []

  constructor(private readonly index: number) {}

  unshift(crate: Crate): void {
    this.crates.unshift(crate)
  }

  pop(): Crate {
    const crate = this.crates.pop()
    if (!crate) throw new Error("Tried to pop element off empty stack")
    return crate
  }

  peek(): Crate {
    return this.crates[this.height - 1]
  }

  push(crate: Crate): void {
    this.crates.push(crate)
  }

  get height(): number {
    return this.crates.length
  }

  toString(): string {
    let output = ""
    for (let i = this.height - 1; i >= 0; i--) {
      output += `[${this.crates[i]}]\n`
    }
    output += ` ${this.index} `
    return output
  }
}

export class Board {
  private stacks: Stack[] = []

  addStack(): void {
    this.stacks.push(new Stack(this.length + 1))
  }

  at(index: number): Stack {
    return this.stacks[index]
  }

  get length(): number {
    return this.stacks.length
  }

  toString(): string {
    let output = this.stacks[0].toString()
    for (const stack of this.stacks.slice(1)) {
      output = concat(output, stack.toString())
    }
    return output
  }
}

export function concat(left: string, right: string, sep = " "): string {
  const [leftHeight, rightHeight] = [left.split("\n").length, right.split("\n").length]
  const maxHeight = Math.max(leftHeight, rightHeight)

  if (maxHeight > rightHeight) {
    right = padTop(right, leftHeight - rightHeight)
  } else if (maxHeight > leftHeight) {
    left = padTop(left, rightHeight - leftHeight)
  }

  const [leftComponents, rightComponents] = [left.split("\n"), right.split("\n")]

  let output = ""
  for (let i = 0; i < maxHeight; i++) {
    output += `${leftComponents[i]}${sep}${rightComponents[i]}`
    if (i < maxHeight - 1) output += "\n"
  }
  return output
}

export function padTop(s: string, n: number, padding = "   "): string {
  let output = ""
  for (let i = 0; i < n; i++) {
    output += `${padding}\n`
  }
  return output + s
}

export class BoardParser {
  private tokens: string[] = []
  private current = 0
  private board = new Board()

  parse(line: string): Board {
    this.tokens = Array.from(line)
    this.current = 0
    let stack = 0

    while (this.current < this.tokens.length) {
      if (this.board.length <= stack) this.board.addStack()
      this.crate(stack)
      if (this.isAtEnd()) break
      this.match(" ")
      stack++
    }

    return this.board
  }

  private crate(stack: number): void {
    if (this.peek() === "[") {
      this.advance()
      this.board.at(stack).unshift(this.advance())
      this.advance()
    } else {
      this.advance()
      this.advance()
      this.advance()
    }
  }

  private match(s: string): void {
    if (this.peek() !== s) throw new Error(`Parse error. Expected ${s}, got ${this.tokens[this.current]}`)
    this.advance()
  }

  private peek(): string {
    return this.tokens[this.current]
  }

  private advance(): string {
    const token = this.tokens[this.current]
    this.current++
    return token
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length - 1
  }
}

interface Instruction {
  count: number
  start: number
  end: number
}

export class CraneMover9000 {
  instructions: Instruction[] = []

  addInstruction(input: string): void {
    const instruction = new InstructionParser().parse(input)
    this.instructions.push(instruction)
  }

  execute(board: Board): Board {
    for (const { count, start, end } of this.instructions) {
      const startStack = board.at(start - 1)
      const endStack = board.at(end - 1)

      for (let i = 0; i < count; i++) {
        const popped = startStack.pop()
        endStack.push(popped)
      }
    }
    return board
  }
}

export class CraneMover9001 {
  instructions: Instruction[] = []

  addInstruction(input: string): void {
    const instruction = new InstructionParser().parse(input)
    this.instructions.push(instruction)
  }

  execute(board: Board): Board {
    for (const { count, start, end } of this.instructions) {
      const startStack = board.at(start - 1)
      const endStack = board.at(end - 1)

      const popped = []
      for (let i = 0; i < count; i++) {
        popped.push(startStack.pop())
      }

      for (;;) {
        const crate = popped.pop()
        if (!crate) break
        endStack.push(crate)
      }
    }
    return board
  }
}

export class InstructionParser {
  private tokens: string[] = []
  private current = 0
  private _count = 0
  private _start = 0
  private _end = 0

  parse(input: string): Instruction {
    this.tokens = input.split(" ")
    this.match("move")
    this.count()
    this.match("from")
    this.start()
    this.match("to")
    this.end()
    return { count: this._count, start: this._start, end: this._end }
  }

  private match(s: string): void {
    if (this.peek() !== s) throw new Error(`Parse error. Expected ${s}, got ${this.tokens[this.current]}`)
    this.advance()
  }

  private count(): void {
    const value = this.peek()
    if (isNaN(+value)) throw new Error(`Parse error. Expected number, got ${value}`)
    this._count = +value
    this.advance()
  }

  private start(): void {
    const value = this.peek()
    if (isNaN(+value)) throw new Error(`Parse error. Expected number, got ${value}`)
    this._start = +value
    this.advance()
  }

  private end(): void {
    const value = this.peek()
    if (isNaN(+value)) throw new Error(`Parse error. Expected number, got ${value}`)
    this._end = +value
    this.advance()
  }

  private peek(): string {
    return this.tokens[this.current]
  }
  private advance(): void {
    this.current++
  }
}

type Stage = "board" | "instructions"

export function topCrates(input: string, crane = new CraneMover9000()): string {
  let stage: Stage = "board"

  const boardParser = new BoardParser()
  let board = new Board()

  for (const line of readLines(input)) {
    if (line.length === 0) {
      stage = "instructions"
      continue
    }

    switch (stage) {
      case "board":
        board = boardParser.parse(line)
        break
      case "instructions":
        crane.addInstruction(line)
        break
    }
  }

  crane.execute(board)

  let output = ""
  for (let i = 0; i < board.length; i++) {
    output += board.at(i).peek()
  }
  return output
}

function readLines(input: string): string[] {
  const lines = input.split("\n")
  lines.pop()
  return lines
}
