import { readFile } from "node:fs/promises"

import { fullyContainedPairs, overlappingPairs, SectionAssignment } from "./index"

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

  test("2-4 does not overlap with 6-8", async () => {
    expect(new SectionAssignment(2, 4).overlaps(new SectionAssignment(6, 8))).toBeFalsy()
  })

  test("6-8 does not overlap with 2-4", async () => {
    expect(new SectionAssignment(6, 8).overlaps(new SectionAssignment(2, 4))).toBeFalsy()
  })

  test("2-3 does not overlap with 4-5", async () => {
    expect(new SectionAssignment(2, 3).overlaps(new SectionAssignment(4, 5))).toBeFalsy()
  })

  test("5-7 overlaps with 7-9", async () => {
    expect(new SectionAssignment(5, 7).overlaps(new SectionAssignment(7, 9))).toBeTruthy()
  })

  test("2-8 overlaps with 3-7", async () => {
    expect(new SectionAssignment(2, 8).overlaps(new SectionAssignment(3, 7))).toBeTruthy()
  })

  test("6-6 overlaps with 4-6", async () => {
    expect(new SectionAssignment(6, 6).overlaps(new SectionAssignment(4, 6))).toBeTruthy()
  })

  test("4-6 overlaps with 6-6", async () => {
    expect(new SectionAssignment(4, 6).overlaps(new SectionAssignment(4, 6))).toBeTruthy()
  })

  test("2-6 overlaps with 4-8", async () => {
    expect(new SectionAssignment(2, 6).overlaps(new SectionAssignment(4, 8))).toBeTruthy()
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

test("sample contains 4 overlapping pairs", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(overlappingPairs(contents.toString())).toBe(4)
})

test("input contains 766 overlapping pairs", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(overlappingPairs(contents.toString())).toBe(893)
})
