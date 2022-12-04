import { readFile } from "node:fs/promises"
import { sumPriorities } from "./index"

test("sum of priorities for items in sample is 157", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(sumPriorities(contents.toString())).toBe(157)
})

test("sum of priorities for items in sample is 157", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(sumPriorities(contents.toString())).toBe(8123)
})
