// N^2 solution: Check row and column (2N) for each entry (N) = 2N^2
// N solution: Calculate left, right, top, and bottom visibility (4N)

interface Grid {
  cells: number[][]
}

export function readGrid(input: string): Grid {
  const cells: number[][] = []
  const lines = input.split("\n")

  for (const line of lines.slice(0, lines.length - 1)) {
    cells.push(Array.from(line).map((x) => parseInt(x)))
  }

  return { cells }
}

export function computeVisibility(grid: Grid): VisibilityGrid {
  const visibility = new VisibilityGrid(grid.cells.length, grid.cells[0].length)

  for (let row = 0; row < grid.cells.length; row++) {
    for (let col = 0; col < grid.cells[0].length; col++) {
      if (col === 0) {
        visibility.at(row, col).west = -1
        continue
      }
      visibility.at(row, col).west = Math.max(visibility.at(row, col - 1).west!, grid.cells[row][col - 1])
    }
  }

  for (let col = 0; col < grid.cells[0].length; col++) {
    for (let row = 0; row < grid.cells.length; row++) {
      if (row === 0) {
        visibility.at(row, col).north = -1
        continue
      }
      visibility.at(row, col).north = Math.max(visibility.at(row - 1, col).north!, grid.cells[row - 1][col])
    }
  }

  for (let row = 0; row < grid.cells.length; row++) {
    for (let col = grid.cells[0].length - 1; col >= 0; col--) {
      if (col === grid.cells[0].length - 1) {
        visibility.at(row, col).east = -1
        continue
      }
      visibility.at(row, col).east = Math.max(visibility.at(row, col + 1).east!, grid.cells[row][col + 1])
    }
  }

  for (let col = 0; col < grid.cells[0].length; col++) {
    for (let row = grid.cells.length - 1; row >= 0; row--) {
      if (row === grid.cells.length - 1) {
        visibility.at(row, col).south = -1
        continue
      }
      visibility.at(row, col).south = Math.max(visibility.at(row + 1, col).south!, grid.cells[row + 1][col])
    }
  }

  return visibility
}

interface CellVisibility {
  north: number
  south: number
  east: number
  west: number
}

class VisibilityGrid {
  private readonly cells: Partial<CellVisibility>[][]

  constructor(rows: number, cols: number) {
    this.cells = []
    for (let row = 0; row < rows; row++) {
      this.cells.push([])
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = {}
      }
    }
  }

  at(row: number, col: number): Partial<CellVisibility> {
    return this.cells[row][col]
  }

  get west(): number[][] {
    return (this.cells as CellVisibility[][]).map((row) => row.map(({ west }) => west))
  }

  get east(): number[][] {
    return (this.cells as CellVisibility[][]).map((row) => row.map(({ east }) => east))
  }

  get north(): number[][] {
    return (this.cells as CellVisibility[][]).map((row) => row.map(({ north }) => north))
  }

  get south(): number[][] {
    return (this.cells as CellVisibility[][]).map((row) => row.map(({ south }) => south))
  }
}

export function isVisible(row: number, col: number, grid: Grid, visibility: VisibilityGrid): boolean {
  const { north, south, east, west } = visibility.at(row, col) as Required<CellVisibility>
  const height = grid.cells[row][col]
  return height > north || height > south || height > east || height > west
}

export function countVisible(input: string): number {
  const grid = readGrid(input)
  const visibility = computeVisibility(grid)

  let count = 0

  for (let i = 0; i < grid.cells.length; i++) {
    for (let j = 0; j < grid.cells[0].length; j++) {
      count += +isVisible(i, j, grid, visibility)
    }
  }

  return count
}
