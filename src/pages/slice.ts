import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  Box,
  complimentText,
  COUNTER_SHOP,
  doneQuestText,
  gameOverText,
  ICompleteQuestProps,
  idleText,
  IInitialProps,
  IReplaceProps,
  list_bag,
  list_item,
  // list_item2,
  // list_item3,
} from "./types"
import {
  checkAvailableSlot,
  calculateBagType,
  calculateNextTier,
  getEmptySlots,
  checkIsGameOver,
  pointModifier,
} from "./functions"
import { generateRandomNumber } from "../utils/coordinates"

const populateData = (): Box[] => {
  var result: Box[] = Array.from(new Array(45)).map((_, index) => ({
    isFilled: false,
    index,
    name: index.toString(),
    charges: undefined,
    itemTypes: undefined,
    condition: "normal",
    // locked // normal
  }))

  const { outerEdge, innerEdge } = getGridEdges(result, 5, 9) // 5 rows, 9 columns

  for (let i = 0; i < outerEdge.length; i++) {
    const element = outerEdge[i]
    result[element] = {
      ...result[element],
      isFilled: true,
      itemTypes: list_item[7],
      condition: "locked",
    }
  }

  for (let i = 0; i < innerEdge.length; i++) {
    const element = innerEdge[i]
    result[element] = {
      ...result[element],
      isFilled: true,
      itemTypes: list_item[4],
      condition: "locked",
    }
  }

  // // bag level 1
  result[20] = {
    ...result[20],
    isFilled: true,
    charges: 10,
    itemTypes: list_bag[0],
    condition: "normal",
  }

  result[23] = {
    ...result[23],
    isFilled: true,
    itemTypes: list_item[1],
    condition: "locked",
  }

  result[24] = {
    ...result[24],
    isFilled: true,
    itemTypes: list_item[2],
    condition: "locked",
  }

  result[25] = {
    ...result[25],
    isFilled: true,
    itemTypes: list_item[3],
    condition: "locked",
  }

  return result
}
function getGridEdges(grid: Box[], rows: number, cols: number) {
  const outerEdge: number[] = []
  const innerEdge: number[] = []

  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / cols)
    const col = i % cols

    // Outer edge: first/last row OR first/last column
    if (
      row === 0 || // Top row
      row === rows - 1 || // Bottom row
      col === 0 || // First column
      col === cols - 1 // Last column
    ) {
      outerEdge.push(i)
    }
    // Inner edge: second/second-to-last row/column excluding the true outer edge
    else if (
      row === 1 ||
      row === rows - 2 || // Second/second-to-last rows
      col === 1 ||
      col === cols - 2 // Second/second-to-last columns
    ) {
      // Include only valid inner edge cells
      if (
        (row === 1 && col >= 1 && col <= cols - 2) || // Top inner edge
        (row === rows - 2 && col >= 1 && col <= cols - 2) || // Bottom inner edge
        (col === 1 && row > 1 && row < rows - 2) || // Left inner edge
        (col === cols - 2 && row > 1 && row < rows - 2) // Right inner edge
      ) {
        innerEdge.push(i)
      }
    }
  }

  return { outerEdge, innerEdge }
}

const initialState: IInitialProps = {
  data: populateData(),
  quests: [],
  playerData: {
    score: 0,
    mergeCount: 0,
    isGameOver: false,
    isShopAvailable: false,
    gameOverText: "",
    lastScored: 0,
  },
  log: [],
  currentStatus: "init",
  activeDebuff: [
    {
      name: "Rot Infection",
      description:
        "Remove 1 random active card from the deck for every 3 merges",
      type: "passive",
      id: "DEBUFF_CARD_1",
      rarity: "common",
    },
    {
      name: "Virus Infection",
      description: "Minus 200 point for every 3 merges",
      type: "passive",
      id: "DEBUFF_POINT_1",
      rarity: "common",
    },
    // {
    //   name: "Over Protection",
    //   description: "Locking any random active card for every 3 merges",
    //   type: "passive",
    //   id: "DEBUFF_CARD_2",
    //   rarity: "common",
    // },
  ],
  activeBuff: [],
  npcData: {
    showedText: "Hello my name is dash, i will be your guide",
  },
}

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload
    },
    addData: (
      state,
      action: PayloadAction<{ parentIndex: number; bagType: string }>,
    ) => {
      const idx = checkAvailableSlot(state.data)
      const pdx = action.payload.parentIndex
      const charges = state.data[pdx].charges
      if (idx != null) {
        if (charges != null && charges != undefined) {
          if (charges < 2) {
            state.data[pdx].isFilled = false
            state.data[pdx].itemTypes = undefined
          }
          state.data[pdx].charges! -= 1
        }
        const newdata: Box = calculateBagType(action.payload.bagType, idx)
        state.data[idx] = newdata
      }
      // log
      state.log.push("added item!")
    },
    mergeData: (state, action: PayloadAction<IReplaceProps>) => {
      let table = state.data
      const fdx = action.payload.indexFr
      const tdx = action.payload.indexTo
      const fr = table[fdx]
      const to = table[tdx]
      const next_tier = calculateNextTier(fr.itemTypes?.code)
      if (fr.itemTypes?.code != to.itemTypes?.code || next_tier === undefined) {
        table[tdx] = fr
        table[fdx] = to
        // log
        state.log.push("item swapped!")
      } else {
        table[tdx] = {
          ...to,
          itemTypes: next_tier,
          charges: next_tier.charges,
          condition: to.condition === "locked" ? "normal" : to.condition,
        }
        table[fdx] = {
          ...fr,
          isFilled: false,
          itemTypes: undefined,
        }
        let item_point = parseInt(next_tier.code.replace(/\D/g, ""))
        let point = pointModifier(
          item_point,
          state.activeBuff,
        )
        state.log.push(
          `point: ${point} - ${item_point} - charges ${state.activeBuff[0]?.charges}`,
        )
        state.playerData.lastScored = point
        state.playerData.score += point
        state.playerData.mergeCount += 1
        // =========================== to be fixed
        if (
          state.playerData.mergeCount != 0 &&
          state.playerData.mergeCount % 5 === 0
        ) {
          let check = getEmptySlots(state.data)
          state.log.push(`${JSON.stringify(check)}`)
          state.log.push(`index from ${fdx}`)
          state.log.push(`index to ${tdx}`)
        }
        // =============================================

        // log
        state.log.push("item merged!")
        state.currentStatus = "done_merge"
        state.npcData.showedText =
          complimentText[generateRandomNumber(complimentText.length - 1, 0)]
        // show shop modal
        if (state.playerData.mergeCount % COUNTER_SHOP === 0) {
          state.playerData.isShopAvailable = true
        }
      }
      if (checkIsGameOver(state.data, state.playerData.score)) {
        state.playerData.gameOverText =
          state.playerData.score <= 0
            ? "You have no more point left!"
            : "You can't do any merging or spawning any item, there is nothing more you can do!"
        state.currentStatus = "done_merge"
        state.npcData.showedText =
          gameOverText[generateRandomNumber(gameOverText.length - 1, 0)]
      }
      state.playerData.isGameOver = checkIsGameOver(
        state.data,
        state.playerData.score,
      )
      state.data = table
    },
    replaceData: (state, action: PayloadAction<IReplaceProps>) => {
      const fr = state.data[action.payload.indexFr]
      const to = state.data[action.payload.indexTo]
      state.data[action.payload.indexTo] = fr
      state.data[action.payload.indexFr] = to
      // log
      state.log.push("item replaced!")
    },
    insertQuest: (state, action) => {
      state.quests = action.payload
    },
    completeQuest: (state, action: PayloadAction<ICompleteQuestProps>) => {
      const targetIdx = checkAvailableSlot(state.data)
      if (targetIdx != null) {
        const id = action.payload.questIdx
        const quest_code = state.quests[id].required_type
        if (
          state.quests[id].reward_type === "item" &&
          state.quests[id].reward_item
        ) {
          const reward = state.quests[id].reward_item

          // place reward
          const newdata: Box = {
            isFilled: true,
            name: `${targetIdx + 1}`,
            index: targetIdx,
            itemTypes: reward,
            charges: reward.charges,
            condition: "normal",
          }
          state.data[targetIdx] = newdata
        }
        if (
          state.quests[id].reward_type === "point" &&
          state.quests[id].reward_point
        ) {
          state.playerData.score += state.quests[id].reward_point
          state.playerData.lastScored = state.quests[id].reward_point
        }

        // remove required item
        var temp = state.data
        for (let i = 0; i < state.data.length; i++) {
          const element = state.data[i]
          if (
            element.itemTypes?.code === quest_code &&
            element.condition === "normal"
          ) {
            temp[i] = { ...temp[i], isFilled: false, itemTypes: undefined }
          }
        }

        state.currentStatus = "done_quest"
        state.npcData.showedText =
          doneQuestText[generateRandomNumber(doneQuestText.length - 1, 0)]
        // log
        state.log.push("quest completed!")
      }
    },
    retryGame: state => {
      state.data = initialState.data
      state.log = initialState.log
      state.playerData = initialState.playerData
      state.npcData.showedText =
        idleText[generateRandomNumber(idleText.length - 1, 0)]
      state.activeBuff = []
      state.activeDebuff = []
    },
    setStatusGame: (state, action) => {
      state.currentStatus = action.payload
    },
    setShowedNpcText: (state, action) => {
      state.npcData.showedText = action.payload
    },
    setModalShop: (state, action) => {
      state.playerData.isShopAvailable = action.payload
    },
    setActiveBuff: (state, action) => {
      state.activeBuff = action.payload
    },
    setActiveDeBuff: (state, action) => {
      state.activeDebuff = action.payload
    },
    modifyActiveCharge: (state, action) => {
      const { id, value } = action.payload
      const buff = state.activeBuff.find(item => item.id === id)
      if (buff) {
        buff.charges = value
      }
    },
    removeDataByIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload
      if (index >= 0 && index < state.data.length) {
        state.data[index] = {
          ...state.data[index],
          isFilled: false,
          itemTypes: undefined,
        }
      }
    },
    directModifyPoint: (state, action) => {
      state.playerData.score = action.payload
    },
    directModifyGameOver: (state, action) => {
      state.playerData.isGameOver = action.payload
    },
    changeConditionByIndex: (
      state,
      action: PayloadAction<{ idx: number; condition: "locked" | "normal" }>,
    ) => {
      const index = action.payload.idx
      if (index >= 0 && index < state.data.length) {
        state.data[index] = {
          ...state.data[index],
          condition: action.payload.condition,
        }
      }
    },
  },
})

export const {
  setData,
  replaceData,
  addData,
  mergeData,
  completeQuest,
  retryGame,
  setStatusGame,
  setShowedNpcText,
  modifyActiveCharge,
  setActiveBuff,
  setActiveDeBuff,
  removeDataByIndex,
  setModalShop,
  insertQuest,
  changeConditionByIndex,
  directModifyGameOver,
  directModifyPoint,
} = gameSlice.actions
export default gameSlice
