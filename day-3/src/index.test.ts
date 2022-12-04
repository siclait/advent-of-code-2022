import { readFile } from "node:fs/promises"
import { enumerate, sumBadgePriorities, sumPriorities } from "./index"

test("sum of priorities for items in sample is 157", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(sumPriorities(contents.toString())).toBe(157)
})

test("sum of priorities for items in input is 8123", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(sumPriorities(contents.toString())).toBe(8123)
})

test("sum of priorities for badges in sample is 70", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(sumBadgePriorities(contents.toString())).toBe(70)
})

test("sum of priorities for badges in input is 2620", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(sumBadgePriorities(contents.toString())).toBe(2620)
})

describe("enumerate", () => {
  test("returns items and indices for array [1, 2, 3, 4, 5]", () => {
    const result = []
    for (const [item, i] of enumerate([1, 2, 3, 4, 5])) {
      result.push([item, i])
    }
    expect(result).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
    ])
  })
})
