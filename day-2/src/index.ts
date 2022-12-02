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
    score += computeScore(opponentPlay(opponentValue), responsePlay(responseValue))
  }
  return score
}

export function totalScoreSecondStrategy(input: string): number {
  let score = 0
  for (const [opponentValue, outcomeValue] of parseInput(input)) {
    const play = opponentPlay(opponentValue)
    score += computeScore(play, playForOutcome(play, outcome(outcomeValue)))
  }
  return score
}

function* parseInput(input: string): Generator<[string, string], void, undefined> {
  for (const value of input.split("\n")) {
    if (value === "") break
    const [x, y] = value.split(" ")
    yield [x, y]
  }
}

export function outcome(value: string): Outcome {
  if (value === "X") {
    return Outcome.Lose
  } else if (value === "Y") {
    return Outcome.Draw
  } else if (value === "Z") {
    return Outcome.Win
  } else {
    throw new Error("Invalid outcome string")
  }
}

export function opponentPlay(value: string): Play {
  if (value === "A") {
    return Play.Rock
  } else if (value === "B") {
    return Play.Paper
  } else if (value === "C") {
    return Play.Scissors
  } else {
    throw new Error("Invalid play for opponent")
  }
}

export function responsePlay(value: string): Play {
  if (value === "X") {
    return Play.Rock
  } else if (value === "Y") {
    return Play.Paper
  } else if (value === "Z") {
    return Play.Scissors
  } else {
    throw new Error("Invalid play in response")
  }
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
