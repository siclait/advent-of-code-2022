export function fullyContainedPairs(input: string): number {
  return readLines(input)
    .map(isFullyContainedPair)
    .reduce((sum, value) => sum + +value, 0)
}

export function overlappingPairs(input: string): number {
  return readLines(input)
    .map(isOverlappingPair)
    .reduce((sum, value) => sum + +value, 0)
}

function readLines(input: string): string[] {
  const lines = input.split("\n")
  lines.pop()
  return lines
}

function isFullyContainedPair(line: string): boolean {
  const [assignment1, assignment2] = line.split(",").map((pair) => new SectionAssignment(...splitPair(pair)))
  return assignment1.contains(assignment2) || assignment2.contains(assignment1)
}

function isOverlappingPair(line: string): boolean {
  const [assignment1, assignment2] = line.split(",").map((pair) => new SectionAssignment(...splitPair(pair)))
  console.log(`1: ${assignment1}, 2: ${assignment2}, overlaps: ${assignment1.overlaps(assignment2)}`)
  return assignment1.overlaps(assignment2)
}

function splitPair(pair: string): [number, number] {
  const [left, right] = pair.split("-")
  return [parseInt(left), parseInt(right)]
}

export class SectionAssignment {
  constructor(readonly left: number, readonly right: number) {}

  contains(other: SectionAssignment): boolean {
    return this.left <= other.left && this.right >= other.right
  }

  overlaps(other: SectionAssignment): boolean {
    return (
      (this.left <= other.left && this.right >= other.left) ||
      (this.left <= other.right && this.right >= other.right) ||
      this.contains(other) ||
      other.contains(this)
    )
  }

  toString(): string {
    return `[${this.left},${this.right}]`
  }
}
