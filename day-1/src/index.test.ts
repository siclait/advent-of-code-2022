import { readFile } from "node:fs/promises"

import { mostCalories, parseInput, totalTopThreeCalories } from "./index"

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

test("reads the input file", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(parseInput(contents.toString())).toEqual(expectedInventories)
})

test("calculates most calories for sample", async () => {
  const contents = await readFile("./resources/sample.txt")
  const input = parseInput(contents.toString())
  expect(mostCalories(input)).toEqual(24_000)
})

test("calculates most calories for input", async () => {
  const contents = await readFile("./resources/input.txt")
  const input = parseInput(contents.toString())
  expect(mostCalories(input)).toEqual(71_300)
})

test("calculates total calories for top three inventories of sample", async () => {
  const contents = await readFile("./resources/sample.txt")
  const input = parseInput(contents.toString())
  expect(totalTopThreeCalories(input)).toEqual(45_000)
})

test("calculates total calories for top three inventories of input", async () => {
  const contents = await readFile("./resources/input.txt")
  const input = parseInput(contents.toString())
  expect(totalTopThreeCalories(input)).toEqual(209_691)
})
