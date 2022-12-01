import { readFile } from "node:fs/promises"

import { mostCalories, nLargest, parseInput, totalTopThreeCalories } from "./index"

const expectedInventories = [
  {
    meals: [{ calories: 1000 }, { calories: 2000 }, { calories: 3000 }],
  },
  {
    meals: [{ calories: 4000 }],
  },
  {
    meals: [{ calories: 5000 }, { calories: 6000 }],
  },
  {
    meals: [{ calories: 7000 }, { calories: 8000 }, { calories: 9000 }],
  },
  {
    meals: [{ calories: 10000 }],
  },
]

describe("parseInput", () => {
  test("reads the input file", async () => {
    const contents = await readFile("./resources/sample.txt")
    expect(parseInput(contents.toString())).toEqual(expectedInventories)
  })
})

describe("mostCalories", () => {
  test("calculates most calories for sample", async () => {
    const contents = await readFile("./resources/sample.txt")
    const input = parseInput(contents.toString())
    expect(mostCalories(input)).toBe(24_000)
  })

  test("calculates most calories for input", async () => {
    const contents = await readFile("./resources/input.txt")
    const input = parseInput(contents.toString())
    expect(mostCalories(input)).toBe(71_300)
  })
})

describe("totalTopThreeCalories", () => {
  test("calculates total calories for top three inventories of sample", async () => {
    const contents = await readFile("./resources/sample.txt")
    const input = parseInput(contents.toString())
    expect(totalTopThreeCalories(input)).toBe(45_000)
  })

  test("calculates total calories for top three inventories of input", async () => {
    const contents = await readFile("./resources/input.txt")
    const input = parseInput(contents.toString())
    expect(totalTopThreeCalories(input)).toBe(209_691)
  })
})

describe("nLargest", () => {
  test("returns all values in sorted order if array is larger than N", () => {
    expect(nLargest([2, 1, 4, 5, 3], (a, b) => b - a, 6)).toEqual([5, 4, 3, 2, 1])
  })
})
