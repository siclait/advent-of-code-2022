enum Play {
  Rock,
  Paper,
  Scissors,
}

enum Outcome {
  Lose,
  Draw,
  Win,
}

const SHAPE_SCORES = {
  [Play.Rock]: 1,
  [Play.Paper]: 2,
  [Play.Scissors]: 3,
}

const ROUND_SCORES = {
  [Outcome.Lose]: 0,
  [Outcome.Draw]: 3,
  [Outcome.Win]: 6,
}

export function totalScoreFirstStrategy(input: string): number {
  let score = 0
  for (const [opponentValue, responseValue] of parseInput(input)) {
    score += computeScore(ABC_PLAYS[opponentValue], XYZ_PLAYS[responseValue])
  }
  return score
}

export function totalScoreSecondStrategy(input: string): number {
  let score = 0
  for (const [opponentValue, outcomeValue] of parseInput(input)) {
    const play = ABC_PLAYS[opponentValue]
    score += computeScore(play, playForOutcome(play, XYZ_OUTCOMES[outcomeValue]))
  }
  return score
}

type ABC = "A" | "B" | "C"
type XYZ = "X" | "Y" | "Z"

export function* parseInput(input: string): Generator<[ABC, XYZ], void, undefined> {
  for (const value of input.split("\n")) {
    if (value === "") break
    const [x, y] = value.split(" ")
    if (!isABC(x) || !isXYZ(y)) throw new Error("Invalid input")
    yield [x, y]
  }
}

function isABC(value: string): value is ABC {
  return ["A", "B", "C"].includes(value)
}

function isXYZ(value: string): value is XYZ {
  return ["X", "Y", "Z"].includes(value)
}

const XYZ_OUTCOMES: Record<XYZ, Outcome> = {
  X: Outcome.Lose,
  Y: Outcome.Draw,
  Z: Outcome.Win,
}

const ABC_PLAYS: Record<ABC, Play> = {
  A: Play.Rock,
  B: Play.Paper,
  C: Play.Scissors,
}

const XYZ_PLAYS: Record<XYZ, Play> = {
  X: Play.Rock,
  Y: Play.Paper,
  Z: Play.Scissors,
}

function computeScore(opponentPlay: Play, responsePlay: Play): number {
  return SHAPE_SCORES[responsePlay] + ROUND_SCORES[computeOutcome(opponentPlay, responsePlay)]
}

function computeOutcome(opponentPlay: Play, responsePlay: Play): Outcome {
  const [opponentBeats, responseBeats] = [beats(opponentPlay), beats(responsePlay)]

  if (responsePlay === opponentBeats) {
    return Outcome.Lose
  } else if (opponentPlay === responseBeats) {
    return Outcome.Win
  } else {
    return Outcome.Draw
  }
}

function playForOutcome(opponentPlay: Play, desiredOutcome: Outcome): Play {
  const opponentBeats = beats(opponentPlay)

  if (desiredOutcome === Outcome.Lose) {
    return opponentBeats
  } else if (desiredOutcome === Outcome.Draw) {
    return opponentPlay
  } else {
    const plays = new Set([Play.Rock, Play.Scissors, Play.Paper])
    plays.delete(opponentBeats)
    plays.delete(opponentPlay)
    return Array.from(plays)[0]
  }
}

function beats(play: Play): Play {
  switch (play) {
    case Play.Rock:
      return Play.Scissors
    case Play.Paper:
      return Play.Rock
    case Play.Scissors:
      return Play.Paper
  }
}
