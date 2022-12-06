import { readFile } from "node:fs/promises"
import {
  Board,
  concat,
  padTop,
  InstructionParser,
  Stack,
  BoardParser,
  CrateMover900,
  topCrates,
  CrateMover9001,
} from "./index"

test("correctly prints individual stack", () => {
  const stack = new Stack(1)
  stack.push("Z")
  stack.push("N")
  expect(stack.toString()).toBe("[N]\n[Z]\n 1 ")
})

test("pads a string with the correct number of lines", () => {
  expect(padTop("[P]\n 3 ", 2)).toBe("   \n   \n[P]\n 3 ")
})

test("concats two columnar strings", () => {
  expect(concat("   \n[N]\n[Z]\n 1 ", "[D]\n[C]\n[M]\n 2 ")).toBe("    [D]\n[N] [C]\n[Z] [M]\n 1   2 ")
})

test("prints the correct board", () => {
  const board = new Board()

  board.addStack()
  board.at(0).push("Z")
  board.at(0).push("N")

  board.addStack()
  board.at(1).push("M")
  board.at(1).push("C")
  board.at(1).push("D")

  board.addStack()
  board.at(2).push("P")

  expect(board.toString()).toBe("    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 ")
})

test(`correctly parses "move 3 from 1 to 3"`, () => {
  expect(new InstructionParser().parse("move 3 from 1 to 3")).toEqual({ count: 3, start: 1, end: 3 })
})

test(`correctly parses a board`, () => {
  const board = new Board()

  board.addStack()
  board.at(0).push("Z")
  board.at(0).push("N")

  board.addStack()
  board.at(1).push("M")
  board.at(1).push("C")
  board.at(1).push("D")

  board.addStack()
  board.at(2).push("P")

  const parser = new BoardParser()
  parser.parse("    [D]\n")
  parser.parse("[N] [C]\n")
  parser.parse("[Z] [M] [P]\n")
  const actual = parser.parse(" 1   2   3\n")

  expect(actual.toString()).toEqual(board.toString())
})

test("correctly executes a single instruction", () => {
  const crane = new CrateMover900()
  crane.addInstruction("move 1 from 2 to 1")

  const boardBefore = new Board()

  boardBefore.addStack()
  boardBefore.at(0).push("Z")
  boardBefore.at(0).push("N")

  boardBefore.addStack()
  boardBefore.at(1).push("M")
  boardBefore.at(1).push("C")
  boardBefore.at(1).push("D")

  boardBefore.addStack()
  boardBefore.at(2).push("P")

  const boardAfter = new Board()

  boardAfter.addStack()
  boardAfter.at(0).push("Z")
  boardAfter.at(0).push("N")
  boardAfter.at(0).push("D")

  boardAfter.addStack()
  boardAfter.at(1).push("M")
  boardAfter.at(1).push("C")

  boardAfter.addStack()
  boardAfter.at(2).push("P")

  expect(crane.execute(boardBefore).toString()).toBe(boardAfter.toString())
})

test(`top crates for sample is "CMZ"`, async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(topCrates(contents.toString())).toBe("CMZ")
})

test(`top crates for input is "ZBDRNPMVH"`, async () => {
  const contents = await readFile("./resources/input.txt")
  expect(topCrates(contents.toString())).toBe("ZBDRNPMVH")
})

test(`top crates (CrateMover9001) for sample is "MCD"`, async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(topCrates(contents.toString(), new CrateMover9001())).toBe("MCD")
})

test(`top crates (CrateMover9001) for input is "WDLPFNNNB"`, async () => {
  const contents = await readFile("./resources/input.txt")
  expect(topCrates(contents.toString(), new CrateMover9001())).toBe("WDLPFNNNB")
})
