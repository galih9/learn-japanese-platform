export interface IUpg {
  name: string
  description: string
  id: string
}

export const COMMON_UPGRADES: IUpg[] = [
  {
    name: "Kanji Essence",
    description: "Add extra 5 kanji card",
    id: "KANJI_EXTRA1",
  },
  {
    name: "Hisho",
    description: "Add extra 1 helper",
    id: "HISHO_EXTRA",
  },
]

export const UNCOMMON_UPGRADES: IUpg[] = [
  {
    name: "Kanji Washi",
    description: "Add extra 10 kanji card",
    id: "KANJI_EXTRA2",
  },
  {
    name: "Dai Hisho",
    description: "Add extra 3 helper",
    id: "HISHO_EXTRA2",
  },
]
export const RARE_UPGRADES: IUpg[] = [
  {
    name: "Kanji Orihon",
    description: "Add extra 15 kanji card",
    id: "KANJI_EXTRA3",
  },
  {
    name: "Chiroshi",
    description: "Reset all cards conditions",
    id: "HISHO_CARD",
  },
  {
    name: "Nooka",
    description: "+5 answer size",
    id: "SCROLL_EXTRA",
  },
  {
    name: "Noomin",
    description: "+10 answer size",
    id: "SCROLL_EXTRA",
  },
]

export const EPIC_UPGRADES: IUpg[] = [
  {
    name: "Kanji Kansubon",
    description: "Add extra 25 kanji card",
    id: "KANJI_EXTRA4",
  },
]
