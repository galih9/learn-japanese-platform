import { createSlice } from "@reduxjs/toolkit"
import { IKanji } from "../../pages/types"
interface IInitialProps {
  data: ILearnKana[]
  result: IResultKana | null
  toPlayedIds: string[]
  totalScore: number
  helper: number
  scrollSize: number
  achievements: IAchievement[]
}

export interface IAchievement {
  name: string
  description: string
  status: boolean
}

export interface IResultKana {
  level: number
  score: number
  wrong: number
  correct: number
  timeSpent: string
}

export interface ILearnKana extends IKanji {
  wrongCount: number
  correctCount: number
}

const initialState: IInitialProps = {
  data: [],
  toPlayedIds: [],
  result: null,
  helper: 3,
  scrollSize: 9,
  totalScore: 0,
  achievements: [
    {
      name: "Hiragana Student",
      description: "Collect every single hiragana cards",
      status: false,
    },
    {
      name: "Hiragana Teacher",
      description: "Collect every single hiragana word cards",
      status: false,
    },
    {
      name: "Katakana Mechanics",
      description: "Collect every single katakana cards",
      status: false,
    },
    {
      name: "Shogun",
      description: "Have more than 10 hisho",
      status: false,
    },
    {
      name: "Daimyo",
      description: "Have more than 25 answer size",
      status: false,
    },
    {
      name: "Dreamer",
      description: "Collect every single achievement",
      status: false,
    },
  ],
}

const katakanaSlice = createSlice({
  name: "katakanaSlice",
  initialState,
  reducers: {
    populateData: (state, { payload }) => {
      state.data = payload
    },
    updateHelper: (state, { payload }) => {
      state.helper = payload
    },
    updateScroll: (state, { payload }) => {
      state.scrollSize = payload
    },
    setResult: (state, { payload }) => {
      state.result = payload
      state.totalScore += payload?.score + state.data.length
    },
    setListToPlayedCustom: (state, { payload }) => {
      state.toPlayedIds = []
      if (state.data.length > 0) {
        const shuffled = state.data
          .map(item => item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, payload)
        state.toPlayedIds = shuffled
      }
    },
    setListToPlayed: state => {
      state.toPlayedIds = []
      if (state.data.length > 0) {
        const shuffled = state.data
          .map(item => item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)
        state.toPlayedIds = shuffled
      }
    },
    updateKanaData: (state, { payload }) => {
      const { id, wrongCount, correctCount } = payload
      const kana = state.data.find(item => item.id === id)
      if (kana) {
        kana.wrongCount += wrongCount
        kana.correctCount = correctCount
      }
    },
    onResetAll: state => {
      state = initialState
    },
    resetCardCondition: state => {
      let res = state.data
      for (let i = 0; i < res.length; i++) {
        res[i].wrongCount = 0
        res[i].correctCount = 0
      }
    },
    updateAchievementStatus: (state, { payload }) => {
      state.achievements = payload
    },
  },
})

export const {
  populateData,
  setResult,
  updateKanaData,
  setListToPlayed,
  setListToPlayedCustom,
  updateHelper,
  onResetAll,
  resetCardCondition,
  updateScroll,
  updateAchievementStatus,
} = katakanaSlice.actions
export default katakanaSlice
