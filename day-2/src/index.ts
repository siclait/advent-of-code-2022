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
  if (opponentPlay === Play.Rock) {
    if (responsePlay === Play.Rock) {
      return Outcome.Draw
    } else if (responsePlay === Play.Scissors) {
      return Outcome.Lose
    } else {
      return Outcome.Win
    }
  } else if (opponentPlay === Play.Scissors) {
    if (responsePlay === Play.Rock) {
      return Outcome.Win
    } else if (responsePlay === Play.Scissors) {
      return Outcome.Draw
    } else {
      return Outcome.Lose
    }
  } else {
    if (responsePlay === Play.Rock) {
      return Outcome.Lose
    } else if (responsePlay === Play.Scissors) {
      return Outcome.Win
    } else {
      return Outcome.Draw
    }
  }
}

function playForOutcome(opponentPlay: Play, desiredOutcome: Outcome): Play {
  if (opponentPlay === Play.Rock) {
    if (desiredOutcome === Outcome.Win) {
      return Play.Paper
    } else if (desiredOutcome === Outcome.Lose) {
      return Play.Scissors
    } else {
      return Play.Rock
    }
  } else if (opponentPlay === Play.Scissors) {
    if (desiredOutcome === Outcome.Win) {
      return Play.Rock
    } else if (desiredOutcome === Outcome.Lose) {
      return Play.Paper
    } else {
      return Play.Scissors
    }
  } else {
    if (desiredOutcome === Outcome.Win) {
      return Play.Scissors
    } else if (desiredOutcome === Outcome.Lose) {
      return Play.Rock
    } else {
      return Play.Paper
    }
  }
}
