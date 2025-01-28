import { IBuff } from "./types"

export const DEBUFF_LIST_COMMON: IBuff[] = [
  {
    name: "Rot Infection",
    description: "Remove 1 random active card from the deck for every 3 merges",
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
  {
    name: "Over Protection",
    description: "Locking any random active card for every 3 merges",
    type: "passive",
    id: "DEBUFF_CARD_2",
    rarity: "common",
  },
  {
    name: "Degrade",
    description:
      "Downgrade any random card to its previous level for every 5 merges, remove the card if the level is 1",
    type: "passive",
    id: "DEBUFF_CARD_3",
    rarity: "common",
  },
]

export const BUFF_LIST_COMMON: IBuff[] = [
  {
    name: "Extra Points",
    description: "Gain extra 50 point for the next 5 merges",
    charges: 5,
    price: 100,
    type: "passive",
    id: "BUFF_EXT_POINT_1",
    rarity: "common",
  },
  {
    name: "Instant Points",
    description: "Gain 200 points immediately",
    price: 70,
    type: "consumable",
    id: "BUFF_GAIN_POINT_1",
    rarity: "common",
  },
  {
    name: "Instant Extra Points",
    description: "Gain 500 points immediately",
    price: 150,
    type: "consumable",
    id: "BUFF_GAIN_POINT_2",
    rarity: "common",
  },
  {
    name: "Match",
    description: "Unlock 1 locked card",
    price: 35,
    type: "active",
    id: "BUFF_UNLOCK_CARD_1",
    rarity: "common",
  },
  {
    name: "Bag",
    description: "When activated, give 1 level 1 bag card",
    price: 90,
    type: "active",
    id: "BUFF_BAG_CARD_1",
    rarity: "common",
  },
  {
    name: "Trash Bag",
    description: "Can remove 3 movable item",
    price: 75,
    charges: 3,
    type: "active",
    id: "BUFF_REMOVE_ITEM_1",
    rarity: "common",
  },
]
export const BUFF_LIST_RARE: IBuff[] = [
  {
    name: "Extra Extra Points",
    description: "Gain extra 150 point for the next 5 merges",
    charges: 5,
    price: 150,
    type: "passive",
    id: "BUFF_EXT_POINT_2 ",
    rarity: "rare",
  },
  {
    name: "Burn the bridge",
    description: "Unlock all cards of your next merged column",
    price: 150,
    type: "consumable",
    id: "BUFF_ROW_1",
    rarity: "rare",
  },
]

export const BUFF_LIST_EPIC: IBuff[] = [
  {
    name: "Point Multiply",
    description: "Gain x3 point for the next 5 merge",
    charges: 5,
    price: 400,
    type: "passive",
    id: "BUFF_EXT_POINT_3",
    rarity: "epic",
  },
]

export const pointModifiers = [
  {
    id: 1,
    negative: null,
    positive: null,
    multiplier: null,
    extraPoints: 50,
  },
]
export const pointGainer = [
  {
    id: 1,
    point: 200,
  },
  {
    id: 1,
    point: 500,
  },
]
export const cardModifier = [
  {
    id: 1,
    remove: 1,
  },
]
export const commonUpgrade = []
