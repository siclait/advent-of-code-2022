import { readFile } from "node:fs/promises"
import { countVisible, isVisible, readGrid, computeVisibility } from "./index"

test("reads in grid from sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(readGrid(contents.toString()).cells).toEqual([
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ])
})

test("calculates west visibility for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(computeVisibility(grid).west).toEqual([
    [-1, 3, 3, 3, 7],
    [-1, 2, 5, 5, 5],
    [-1, 6, 6, 6, 6],
    [-1, 3, 3, 5, 5],
    [-1, 3, 5, 5, 9],
  ])
})

test("calculates north visibility for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(computeVisibility(grid).north).toEqual([
    [-1, -1, -1, -1, -1],
    [3, 0, 3, 7, 3],
    [3, 5, 5, 7, 3],
    [6, 5, 5, 7, 3],
    [6, 5, 5, 7, 9],
  ])
})

test("calculates south visibility for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(computeVisibility(grid).south).toEqual([
    [6, 5, 5, 9, 9],
    [6, 5, 5, 9, 9],
    [3, 5, 5, 9, 9],
    [3, 5, 3, 9, 0],
    [-1, -1, -1, -1, -1],
  ])
})

test("calculates east visibility for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(computeVisibility(grid).east).toEqual([
    [7, 7, 7, 3, -1],
    [5, 5, 2, 2, -1],
    [5, 3, 3, 2, -1],
    [9, 9, 9, 9, -1],
    [9, 9, 9, 0, -1],
  ])
})

test("calculates visibility of cell at (1,1) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(1, 1, grid, computeVisibility(grid))).toBeTruthy()
})

test("calculates visibility of cell at (1,2) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(1, 2, grid, computeVisibility(grid))).toBeTruthy()
})

test("calculates visibility of cell at (1,3) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(1, 3, grid, computeVisibility(grid))).toBeFalsy()
})

test("calculates visibility of cell at (2,1) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(2, 1, grid, computeVisibility(grid))).toBeTruthy()
})

test("calculates visibility of cell at (2,2) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(2, 2, grid, computeVisibility(grid))).toBeFalsy()
})

test("calculates visibility of cell at (2,3) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(2, 3, grid, computeVisibility(grid))).toBeTruthy()
})

test("calculates visibility of cell at (3,1) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(3, 1, grid, computeVisibility(grid))).toBeFalsy()
})

test("calculates visibility of cell at (3,2) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(3, 2, grid, computeVisibility(grid))).toBeTruthy()
})

test("calculates visibility of cell at (3,3) for sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  const grid = readGrid(contents.toString())

  expect(isVisible(3, 3, grid, computeVisibility(grid))).toBeFalsy()
})

test("counts visible trees in sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(countVisible(contents.toString())).toBe(21)
})

test("counts visible trees in input.txt", async () => {
  const contents = await readFile("./resources/input.txt")
  expect(countVisible(contents.toString())).toBe(1_809)
})
