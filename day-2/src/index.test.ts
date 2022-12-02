import { readFile } from "node:fs/promises"

import { parseInput, totalScoreFirstStrategy, totalScoreSecondStrategy } from "./index"

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

describe("parseInput", () => {
  test("throws error on invalid input", () => {
    expect(() => {
      for (const _ of parseInput("A X\nD Y\n")) {
        /* empty */
      }
    }).toThrowError()
  })
})
