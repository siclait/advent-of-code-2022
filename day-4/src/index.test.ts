// import { readFile } from "node:fs/promises"

import { readFile } from "node:fs/promises"

import { fullyContainedPairs, SectionAssignment } from "./index"

describe("SectionAssignment", () => {
  test("2-4 does not contain 6-8", async () => {
    expect(new SectionAssignment(2, 4).contains(new SectionAssignment(6, 8))).toBeFalsy()
  })

  test("5-7 does not contain 7-9", async () => {
    expect(new SectionAssignment(5, 7).contains(new SectionAssignment(7, 9))).toBeFalsy()
  })

  test("2-8 contians 3-7", async () => {
    expect(new SectionAssignment(2, 8).contains(new SectionAssignment(3, 7))).toBeTruthy()
  })

  test("4-6 contians 6-6", async () => {
    expect(new SectionAssignment(4, 6).contains(new SectionAssignment(6, 6))).toBeTruthy()
  })
})

test("sample contains 2 fully contained pairs", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(fullyContainedPairs(contents.toString())).toBe(2)
})

test("input contains 582 fully contained pairs", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(fullyContainedPairs(contents.toString())).toBe(582)
})
