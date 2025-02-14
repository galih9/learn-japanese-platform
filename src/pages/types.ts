export type IHiragana = {
  hira: string
  alpha: string
  id: string
  score: number
  modifier?: string
  played?: boolean
  meaning?: string[]
}

export type IPower = {
  name: string;
  description: string;
}

export type IResult = {
  timeSpent: string
  score: number
  wrong: number
  correct: number
  difficulty: string
}

export const powerUps = [
  {
    name: "Extra Score",
    description: "Add extra score modifier to random card in deck",
  },
  {
    name: "Extra Mult",
    description: "Add extra multiplier modifier to random card in deck",
  },
  {
    name: "Hiragana Stamp",
    description: "Increase Hiragana multiplier level",
  },
  {
    name: "Katakana Stamp",
    description: "Increase Katakana multiplier level",
  },
  {
    name: "Shuriken",
    description: "Increase difficulty +",
  },
  {
    name: "Kunai",
    description: "Increase difficulty ++",
  },
  {
    name: "Katana",
    description: "Increase difficulty +++",
  },
  {
    name: "Bandage",
    description: "Heal back to 100% health",
  },
  {
    name: "Antidote",
    description:
      "Remove a random negative effect, if no negative effect applied, will gain +100.000 score",
  },
  {
    name: "Ninja scroll",
    description: "Increase all stamp"
  }
]
