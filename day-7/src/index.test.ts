import { readFile } from "node:fs/promises"
import { buildFilesystem, filter, isDirectory, sizeOfDeletedDirectory, totalSizeDirectoryUnder100K } from "./index"

const SAMPLE_EXPECTED = `- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
`

test("prints the correct directory structure from sample.txt", async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(`${buildFilesystem(contents.toString())}`).toBe(SAMPLE_EXPECTED)
})

test(`prints the correct directory size for "e" from sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  const filesystem = buildFilesystem(contents.toString())
  expect(filesystem.cd("a").cd("e").size).toBe(584)
})

test(`prints the correct directory size for "a" from sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  const filesystem = buildFilesystem(contents.toString())
  expect(filesystem.cd("a").size).toBe(94_853)
})

test(`prints the correct directory size for "d" from sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  const filesystem = buildFilesystem(contents.toString())
  expect(filesystem.cd("d").size).toBe(24_933_642)
})

test(`prints the correct directory size for "/" from sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  const filesystem = buildFilesystem(contents.toString())
  expect(filesystem.root.size).toBe(48_381_165)
})

test(`filters for folders with size <= 100_000 from sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  const filesystem = buildFilesystem(contents.toString())
  expect(filter(filesystem, (node) => isDirectory(node) && node.size <= 100_000).map((node) => node.name)).toEqual([
    "a",
    "e",
  ])
})

test(`calculates total size of directories under 100K for sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(totalSizeDirectoryUnder100K(contents.toString())).toBe(95_437)
})

test(`calculates total size of directories under 100K for input.txt`, async () => {
  const contents = await readFile("./resources/input.txt")
  expect(totalSizeDirectoryUnder100K(contents.toString())).toBe(1_642_503)
})

test(`calculates size of deleted directory for sample.txt`, async () => {
  const contents = await readFile("./resources/sample.txt")
  expect(sizeOfDeletedDirectory(contents.toString())).toBe(24_933_642)
})

test(`calculates size of deleted directory for input.txt`, async () => {
  const contents = await readFile("./resources/input.txt")
  expect(sizeOfDeletedDirectory(contents.toString())).toBe(6_999_588)
})
