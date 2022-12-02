import { readFile } from "node:fs/promises"

import { opponentPlay, outcome, responsePlay, totalScoreFirstStrategy, totalScoreSecondStrategy } from "./index"

describe("totalScoreFirstStrategy", () => {
  test("reads the sample file", async () => {
    const contents = await readFile("./resources/sample.txt")
    expect(totalScoreFirstStrategy(contents.toString())).toBe(15)
  })

  test("reads the input file", async () => {
    const contents = await readFile("./resources/input.txt")
    expect(totalScoreFirstStrategy(contents.toString())).toBe(13_526)
  })
})

describe("totalScoreSecondStrategy", () => {
  test("reads the sample file", async () => {
    const contents = await readFile("./resources/sample.txt")
    expect(totalScoreSecondStrategy(contents.toString())).toBe(12)
  })

  test("reads the input file", async () => {
    const contents = await readFile("./resources/input.txt")
    expect(totalScoreSecondStrategy(contents.toString())).toBe(14_204)
  })
})

test("outcome throws exception on bad input", () => {
  expect(() => outcome("W")).toThrowError()
})

test("opponentPlay throws exception on bad input", () => {
  expect(() => opponentPlay("W")).toThrowError()
})

test("responsePlay throws exception on bad input", () => {
  expect(() => responsePlay("W")).toThrowError()
})
