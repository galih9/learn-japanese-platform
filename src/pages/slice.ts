import { createSlice } from "@reduxjs/toolkit"
import { IInitialProps } from "./types"

const initialState: IInitialProps = {
  data: [],
}

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    populateData: (state, { payload }) => {
      state.data = payload
    },
  },
})

export const { populateData } = gameSlice.actions
export default gameSlice
