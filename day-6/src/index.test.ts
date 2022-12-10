import { readFile } from "node:fs/promises"

import { locateMarker } from "./index"

test("locates start-of-packet marker in sample1 at character 7", async () => {
  const contents = await readFile("./resources/sample1.txt")
  expect(locateMarker(contents.toString())).toBe(7)
})

test("locates start-of-packet marker in sample2 at character 5", async () => {
  const contents = await readFile("./resources/sample2.txt")
  expect(locateMarker(contents.toString())).toBe(5)
})

test("locates start-of-packet marker in sample3 at character 6", async () => {
  const contents = await readFile("./resources/sample3.txt")
  expect(locateMarker(contents.toString())).toBe(6)
})

test("locates start-of-packet marker in sample4 at character 10", async () => {
  const contents = await readFile("./resources/sample4.txt")
  expect(locateMarker(contents.toString())).toBe(10)
})

test("locates start-of-packet marker in sample5 at character 11", async () => {
  const contents = await readFile("./resources/sample5.txt")
  expect(locateMarker(contents.toString())).toBe(11)
})

test("locates start-of-packet marker in input at character 1760", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(locateMarker(contents.toString())).toBe(1760)
})

test("locates start-of-message marker in sample1 at character 19", async () => {
  const contents = await readFile("./resources/sample1.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(19)
})

test("locates start-of-message marker in sample2 at character 23", async () => {
  const contents = await readFile("./resources/sample2.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(23)
})

test("locates start-of-message marker in sample3 at character 23", async () => {
  const contents = await readFile("./resources/sample3.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(23)
})

test("locates start-of-message marker in sample4 at character 29", async () => {
  const contents = await readFile("./resources/sample4.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(29)
})

test("locates start-of-message marker in sample5 at character 26", async () => {
  const contents = await readFile("./resources/sample5.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(26)
})

test("locates start-of-message marker in input at character 2974", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(locateMarker(contents.toString(), 14)).toBe(2974)
})
