export function sumPriorities(input: string): number {
  return readLines(input)
    .map(splitLine)
    .map(toSet)
    .map(uniqueSetIntersection)
    .map(priority)
    .reduce((sum, value) => sum + value, 0)
}

export function sumBadgePriorities(input: string): number {
  const lines = readLines(input)
  return group(lines, 3)
    .map(toSet)
    .map(uniqueSetIntersection)
    .map(priority)
    .reduce((sum, value) => sum + value, 0)
}

function readLines(input: string): string[] {
  const lines = input.split("\n")
  lines.pop()
  return lines
}

function splitLine(line: string): [string, string] {
  return [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)]
}

function toSet(input: string[]): Array<Set<string>> {
  return input.map((ch) => new Set(ch))
}

function uniqueSetIntersection<T>(sets: Array<Set<T>>): T {
  let intersection = sets[0]
  for (const set of sets.slice(1)) {
    intersection = setIntersection(intersection, set)
  }
  return Array.from(intersection)[0]
}

function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>()
  for (const element of setA.values()) {
    if (setB.has(element)) result.add(element)
  }
  return result
}

const A_PRIORITY = 27

function priority(itemType: string): number {
  if (itemType.toUpperCase() === itemType) {
    return itemType.charCodeAt(0) - "A".charCodeAt(0) + A_PRIORITY
  } else {
    return itemType.charCodeAt(0) - "a".charCodeAt(0) + 1
  }
}

function group<T>(items: T[], n: number): T[][] {
  const batches = []
  let batch = []
  for (const [item, i] of enumerate(items)) {
    batch.push(item)
    if (i % n === n - 1) {
      batches.push(batch)
      batch = []
    }
  }
  return batches
}

export function* enumerate<T>(items: T[]): Generator<[T, number], void, undefined> {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    yield [item, i]
  }
}
