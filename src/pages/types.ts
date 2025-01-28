export interface IItemTypes {
  code: string
  title: string
  charges?: number
}
const createItems = (
  prefix: string,
  count: number,
  charges?: number,
): IItemTypes[] => {
  return Array.from({ length: count }, (_, index) => ({
    code: `${prefix}${index + 1}`,
    title: `${prefix}${index + 1}`,
    ...(charges !== undefined && { charges }),
  }))
}

// Define the lists using the utility function
export const list_bag: IItemTypes[] = [
  ...createItems("BAG", 1, 20),
  ...createItems("BAG", 1, 30),
  ...createItems("BAG", 2, 50), // Includes BAG3 and BAG4
]

export const COUNTER_SHOP = 10
export const list_item: IItemTypes[] = createItems("A", 17)
export const list_item2: IItemTypes[] = createItems("B", 9)
export const list_item3: IItemTypes[] = createItems("C", 12)
export const list_item4: IItemTypes[] = createItems("D", 6)
export const list_item5: IItemTypes[] = createItems("E", 13)
export const list_item6: IItemTypes[] = createItems("F", 8)

export const checkItemTypes = (type: string): IItemTypes[] => {
  let res: IItemTypes[] = []
  let temp = type.replace(/[0-9]/g, "")
  switch (temp) {
    case "A":
      res = list_item
      break
    case "B":
      res = list_item2
      break
    case "C":
      res = list_item3
      break
    case "D":
      res = list_item4
      break
    case "E":
      res = list_item5
      break
    case "F":
      res = list_item6
      break

    default:
      res = list_bag
      break
  }
  return res
}

export const COL_CHOCOLATE = "#de6800"
export const COL_BRIGHT_CHOCOLATE = "#f5ae70"
export const COL_LESS_BRIGHT_CHOCOLATE = "#b38052"

export type Box = {
  isFilled: boolean
  name: string
  index: number
  itemTypes?: IItemTypes
  charges?: number | null | undefined
  condition: "locked" | "normal"
}

export interface ICompleteQuestProps {
  questIdx: number
}

export interface IQuest {
  title: string
  required_item: number
  current_progress: number
  required_type: string
  reward_type: "point" | "item",
  reward_point?: number
  reward_item?: IItemTypes
}

export interface IInitialProps {
  data: Box[]
  quests: IQuest[]
  playerData: IPlayerInformation
  log: string[]
  // npc: INpcDialogues
  npcData: INpcData
  currentStatus: "init" | "game_over" | "idle" | "done_merge" | "done_quest"
  activeDebuff: IBuff[]
  activeBuff: IBuff[]
}

export interface IBuff {
  name: string
  description: string
  charges?: number
  price?: number
  toBeActivated?: boolean;
  type: "active" | "passive" | "consumable"
  id: string
  rarity: "common" | "rare" | "epic" | "legendary"
}
export interface INpcData {
  showedText: string
}
export interface INpcDialogues {
  gameOverText: string[]
  idleText: string[]
  complimentText: string[]
  doneQuestText: string[]
}

export interface IPlayerInformation {
  score: number
  mergeCount: number
  isGameOver: boolean
  gameOverText: string
  isShopAvailable: boolean
  lastScored: number;
}
export interface IReplaceProps {
  indexFr: number
  indexTo: number
}
export const doneQuestText = [
  "nice one",
  "ah you notice the quest, finally",
  "hmm, nice",
  "Im counting on you",
]
export const gameOverText = [
  "maybe complete the side quest next time",
  "try to get as many bag available",
  "I think you are not built for this game",
]
export const idleText = [
  "don't get rushed",
  "take it slow, but not too slow",
  "thinking... are you?",
  "hellooo?? are you sleeping?",
]
export const complimentText = [
  "nice move",
  "I would do that too",
  "damn, that unpredictable",
  "wow",
]
