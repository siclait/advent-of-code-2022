export function sumPriorities(input: string): number {
  return sum(...readLines(input).map(splitLine).map(mapSets).map(uniqueSetIntersection).map(priority))
}

function readLines(input: string): string[] {
  const lines = input.split("\n")
  lines.pop()
  return lines
}

function splitLine(line: string): [string, string] {
  return [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)]
}

function mapSets(input: [string, string]): Array<Set<string>> {
  return input.map((ch) => new Set(ch))
}

function uniqueSetIntersection<T>([setA, setB]: Array<Set<T>>): T {
  for (const element of setA.values()) {
    if (setB.has(element)) return element
  }
  throw new Error("Empty set intersection")
}

const A_PRIORITY = 27

function priority(itemType: string): number {
  if (itemType.toUpperCase() === itemType) {
    return itemType.charCodeAt(0) - "A".charCodeAt(0) + A_PRIORITY
  } else {
    return itemType.charCodeAt(0) - "a".charCodeAt(0) + 1
  }
}

function sum(...values: number[]): number {
  return values.reduce((total, x) => total + x)
}
