import { pointGainer, pointModifiers } from "./buffs"
import {
  Box,
  checkItemTypes,
  IBuff,
  IItemTypes,
  list_bag,
  list_item,
} from "./types"

export const getEmptySlots = (state: Box[]): number[] => {
  let result: number[] = []
  for (let i = 0; i < state.length; i++) {
    const element = state[i]
    if (!element.isFilled) {
      result.push(i)
    }
  }
  return result
}

export const checkAvailableSlot = (state: Box[]): number | null => {
  for (let i = 0; i < state.length; i++) {
    const element = state[i]
    if (!element.isFilled) {
      return i
    }
  }
  return null
}

export const calculateBagType = (type: string, idx: number): Box => {
  let temp: Box = {
    isFilled: true,
    name: `${idx + 1}`,
    index: idx,
    itemTypes: list_item[0],
    condition: "normal",
  }
  if (type === "BAG1") {
    // let item = [list_item[0], list_item2[0], list_item3[0]]
    // let rand = calculateRandomNumber(2, 0, true)
    let randitem = list_item[0]
    temp.itemTypes = randitem
  }
  return temp
}

export const calculateNextTier = (
  val: string | undefined,
): IItemTypes | undefined => {
  if (val) {
    let items = checkItemTypes(val)
    for (let i = 0; i < items.length; i++) {
      const element = items[i]
      if (val === element.code && i != items.length) {
        return items[i + 1]
      }
    }
  }
  return undefined
}

export const getSpecificItemCount = (data: Box[], code: string): number => {
  let count = 0
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (element.itemTypes?.code === code && element.condition === "normal") {
      count += 1
    }
  }
  return count
}
export function areArraysDisjoint(array1: string[], array2: string[]): boolean {
  // Convert one of the arrays into a Set for faster lookups
  const set1 = new Set(array1)

  // Iterate through the second array and check for common elements
  for (const item of array2) {
    if (set1.has(item)) {
      return false // Found a common element
    }
  }

  return true // No common elements found
}
export function hasNoDuplicates(array: string[]): boolean {
  // Create a Set to store unique values
  const uniqueValues = new Set<string>()

  // Iterate through the array
  for (const item of array) {
    if (uniqueValues.has(item)) {
      return false // Duplicate found
    }
    uniqueValues.add(item) // Add to the set if not already present
  }

  return true // No duplicates found
}

export const checkIsGameOver = (data: Box[], score?: number): boolean => {
  let locked: string[] = []
  let unlocked: string[] = []
  let isgo = false
  if (score && score <= 0) {
    isgo = true
  }
  for (let j = 0; j < data.length; j++) {
    const element = data[j]
    if (element.condition != "locked") {
      if (element.itemTypes?.code) {
        unlocked.push(element.itemTypes?.code)
      }
    } else {
      if (element.itemTypes?.code != undefined) {
        if (!locked.includes(element.itemTypes?.code)) {
          locked.push(element.itemTypes?.code)
        }
      }
    }
  }
  // 1 check bags /// to be fixed
  for (let k = 0; k < list_bag.length; k++) {
    if (!unlocked.includes(list_bag[k].code)) {
      isgo = true
    }
    break
  }
  // 2 check locked item
  if (isgo) {
    isgo = areArraysDisjoint(unlocked, locked)
  }
  // 3 check unlocked item
  if (isgo) {
    isgo = hasNoDuplicates(unlocked)
  }
  return isgo
}

export const pointModifier = (
  baseScore: number,
  activeBuff: IBuff[],
): number => {
  let point = 0
  if (activeBuff.length > 0) {
    for (let i = 0; i < activeBuff.length; i++) {
      const element = activeBuff[i]
      console.log(element.id)
      if (element.id.includes("BUFF_EXT_POINT")) {
        let id = parseInt(element.id.replace(/\D/g, "") ?? 0)
        for (let j = 0; j < pointModifiers.length; j++) {
          if (id === pointModifiers[j].id) {
            if (pointModifiers[j].multiplier != null) {
              point += baseScore * (pointModifiers[j].multiplier ?? 1)
            }
            if (pointModifiers[j].positive != null) {
              point += baseScore + (pointModifiers[j].positive ?? 0)
            }
            if (pointModifiers[j].negative != null) {
              point += baseScore - (pointModifiers[j].negative ?? 0)
            }
            if (pointModifiers[j].extraPoints != null) {
              point += baseScore + (pointModifiers[j].extraPoints ?? 0)
            }
          }
        }
      }
      if (element.id.includes("BUFF_GAIN_POINT")) {
        let id = parseInt(element.id.replace(/\D/g, "") ?? 0)
        for (let j = 0; j < pointGainer.length; j++) {
          if (id === pointGainer[j].id) {
            point += pointGainer[j].point
          }
        }
      }
    }
  } else {
    point += baseScore;
  }
  // if (activeDebuff.length > 0) {
  //   for (let i = 0; i < activeDebuff.length; i++) {
  //     const element = activeDebuff[i];
  //     // card modifier
  //     if (element.id.includes("DEBUFF_CARD")) {
  //       let id = parseInt(element.id.replace(/\D/g, "") ?? 0)
  //       for (let j = 0; j < cardModifier.length; j++) {
  //         if (id === cardModifier[j].id) {
  //           if (cardModifier[j].remove != null) {

  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  return point
}
