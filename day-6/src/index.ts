export function locateMarker(input: string, n = 4): number {
  let index = n

  while (index <= input.length) {
    const candidate = input.slice(index - n, index)
    if (allUnique(candidate)) break
    index++
  }

  return index
}

function allUnique(candidate: string): boolean {
  return candidate.length === new Set(Array.from(candidate)).size
}
