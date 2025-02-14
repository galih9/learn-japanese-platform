import { createSlice } from "@reduxjs/toolkit"
import { IHiragana, IPower, powerUps } from "./types"
import { updatePlayStatus } from "../utils/data"
export interface IInitialProps {
  data: IHiragana[]
  difficulty: number
  health: number
  playerMult: IPmult[]
  availablePower: IPower[]
  yen: number
  shuffle: number
  size: number
  answer: number
}

type IPmult = {
  name: string
  level: number
  mult: number
  coin: number
  id: string
  playCount: number
}

const initialState: IInitialProps = {
  data: [],
  difficulty: 0,
  health: 100,
  yen: 0,
  answer: 5,
  shuffle: 5,
  size: 5,
  playerMult: [
    {
      name: "Hiragana",
      level: 1,
      coin: 10,
      mult: 2,
      id: "HR",
      playCount: 0,
    },
    {
      name: "Katakana",
      level: 1,
      coin: 10,
      mult: 4,
      id: "KN",
      playCount: 0,
    },
    {
      name: "Two Hiragana",
      level: 1,
      coin: 10,
      mult: 2,
      id: "2HR",
      playCount: 0,
    },
    {
      name: "Three Hiragana",
      level: 1,
      coin: 10,
      mult: 3,
      id: "3HR",
      playCount: 0,
    },
    {
      name: "Two Hiragana (Meaning)",
      level: 1,
      coin: 10,
      mult: 3,
      id: "2HRM",
      playCount: 0,
    },
    {
      name: "Three Hiragana (Meaning)",
      level: 1,
      coin: 10,
      mult: 5,
      id: "3HRM",
      playCount: 0,
    },
  ],
  availablePower: [powerUps[0], powerUps[1], powerUps[2]],
}

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    populateData: (state, { payload }) => {
      state.data = payload
    },
    setPlayedData: (state, { payload }) => {
      for (let i = 0; i < state.data.length; i++) {
        const element = state.data[i]
        if (element.id === payload) {
          state.data[i].played = true;
          break;
        }
      }
      console.log(state.data);
    },
    setDifficulty: (state, { payload }) => {
      state.difficulty = payload
    },
    setHealth: (state, { payload }) => {
      state.health = payload
    },
  },
})

export const { populateData, setDifficulty, setHealth, setPlayedData } =
  gameSlice.actions
export default gameSlice
