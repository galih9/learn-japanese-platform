import { FC, useState } from "react"
import { View } from "./view"
import { useDispatch, useSelector } from "react-redux"
import {
  ILearnKana,
  populateData,
  resetCardCondition,
  setListToPlayed,
  setListToPlayedCustom,
  updateHelper,
  updateScroll,
  updateAchievementStatus,
} from "./slice"
import { RootState } from "../../app/store"

import katakana from "../../assets/db/katakana.json"
import katakanaDakuten from "../../assets/db/katakana_dakuten.json"
import katakanaYoon from "../../assets/db/katakana_yoon.json"

import hiragana from "../../assets/db/hiragana.json"
import hiraganaDakuten from "../../assets/db/hiragana_dakuten.json"
import hiraganaYoon from "../../assets/db/hiragana_yoon.json"
import hiragana2 from "../../assets/db/hiragana_two_simple.json"
import hiragana3 from "../../assets/db/hiragana_three_simple.json"

interface IProps {}

export interface IUpg {
  name: string
  description: string
  id: string
}

const COMMON_UPGRADES: IUpg[] = [
  {
    name: "Hiragana Mokkan",
    description: "Add extra 5 hiragana card",
    id: "HIRA_EXTRA1",
  },
  {
    name: "Hiragana Washi",
    description: "Add extra 10 hiragana card",
    id: "HIRA_EXTRA2",
  },
  {
    name: "Hiragana Kansubon",
    description: "Add extra 10 hiragana dakuten card",
    id: "HIRA_DAKUTEN",
  },
  {
    name: "Hiragana Orihon",
    description: "Add extra 10 hiragana yoon card",
    id: "HIRA_YOON",
  },
  {
    name: "Katakana Scroll",
    description: "Add extra 5 katakana card",
    id: "KATA_EXTRA",
  },
  {
    name: "Katakana Scroll v2",
    description: "Add extra 10 katakana card",
    id: "KATA_EXTRA2",
  },
  {
    name: "Katakana Scroll v3",
    description: "Add extra 10 katakana dakuten card",
    id: "KATA_DAKUTEN",
  },
  {
    name: "Katakana Scroll v3",
    description: "Add extra 10 katakana yoon card",
    id: "KATA_YOON",
  },
  {
    name: "Hisho",
    description: "Add extra 1 helper",
    id: "HISHO_EXTRA",
  },
]

const UNCOMMON_UPGRADES: IUpg[] = [
  {
    name: "Hiragana Advanced Inscription v2",
    description: "Add extra 10 hiragana words card level 2",
    id: "HIRA_WORD2_EXTRA",
  },
  {
    name: "Hiragana Advanced Inscription v3",
    description: "Add extra 10 hiragana words card level 3",
    id: "HIRA_WORD3_EXTRA",
  },
  {
    name: "Dai Hisho",
    description: "Add extra 3 helper",
    id: "HISHO_EXTRA2",
  },
]
const RARE_UPGRADES: IUpg[] = [
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

const EPIC_UPGRADES: IUpg[] = [
  {
    name: "Shuurishi",
    description: "Remove all katakana card",
    id: "KATA_REMOVE",
  },
  {
    name: "Haikankoo",
    description: "Remove all hiragana card",
    id: "KATA_REMOVE",
  },
]

const getRandomUpgrade = () => {
  const rand = Math.random() * 100
  if (rand < 50) {
    return COMMON_UPGRADES[Math.floor(Math.random() * COMMON_UPGRADES.length)]
  } else if (rand < 80) {
    return UNCOMMON_UPGRADES[
      Math.floor(Math.random() * UNCOMMON_UPGRADES.length)
    ]
  } else if (rand < 95) {
    return RARE_UPGRADES[Math.floor(Math.random() * RARE_UPGRADES.length)]
  } else {
    return EPIC_UPGRADES[Math.floor(Math.random() * EPIC_UPGRADES.length)]
  }
}

const generateUpgrades = () => {
  const upgrades: IUpg[] = []
  const usedIds = new Set<string>()
  while (upgrades.length < 3) {
    const upgrade = getRandomUpgrade()
    if (!usedIds.has(upgrade.id)) {
      upgrades.push(upgrade)
      usedIds.add(upgrade.id)
    }
  }
  return upgrades
}

const LearnKana: FC<IProps> = () => {
  const { result, data, totalScore, helper, scrollSize, achievements } =
    useSelector((state: RootState) => state.katakanaSlice)
  const [scene, setScene] = useState("")
  const [showModalAch, setShowModalAch] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [listUpgrade, setListUpgrade] = useState<IUpg[]>([])

  const dispatch = useDispatch()
  const onPlay = () => {
    let res: ILearnKana[] = []
    for (let i = 0; i < 10; i++) {
      const nums = i
      res.push({
        hira: hiragana[nums].hira,
        alpha: hiragana[nums].alpha,
        id: hiragana[nums].id,
        score: 5,
        wrongCount: 0,
        correctCount: 0,
      })
    }
    dispatch(populateData(res))
    dispatch(setListToPlayedCustom(10))
    setScene("PLAY")
  }

  const onRePlay = (e?: IUpg) => {
    if (e === undefined) {
      dispatch(setListToPlayed())
      setScene("PLAY")
      return
    }

    if (e.id.includes("HIRA")) {
      let res: ILearnKana[] = [...data]
      let scoring = e.id.includes("DAKUTEN")
        ? 10
        : e.id.includes("YOON")
          ? 10
          : e.id.includes("WORD")
            ? e.id.includes("2")
              ? 20
              : 30
            : 5
      let type = e.id.includes("DAKUTEN")
        ? "HD"
        : e.id.includes("YOON")
          ? "HY"
          : e.id.includes("WORD")
            ? e.id.includes("2")
              ? "HVT"
              : "HWD"
            : "HI"
      // Get all hiragana IDs currently in data
      const onlyHira = data.filter(item => item.id.includes(type))
      const currentIds = new Set(onlyHira.map(item => item.id))

      // Filter hiragana to get only those not in current data
      let unclaimedHira: any[] = []
      switch (type) {
        case "HD":
          unclaimedHira = hiraganaDakuten.filter(
            item => !currentIds.has(item.id),
          )
          break
        case "HY":
          unclaimedHira = hiraganaYoon.filter(item => !currentIds.has(item.id))
          break
        case "HVT":
          unclaimedHira = hiragana2.filter(item => !currentIds.has(item.id))
          break
        case "HWD":
          unclaimedHira = hiragana3.filter(item => !currentIds.has(item.id))
          break
        default:
          unclaimedHira = hiragana.filter(item => !currentIds.has(item.id))
          break
      }

      // Shuffle the unclaimedHira array
      for (let i = unclaimedHira.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[unclaimedHira[i], unclaimedHira[j]] = [
          unclaimedHira[j],
          unclaimedHira[i],
        ]
      }

      let addSize = e.id.includes("EXTRA") && !e.id.includes("2") ? 5 : 10

      for (let i = 0; i < addSize && i < unclaimedHira.length; i++) {
        const item = unclaimedHira[i]
        res.push({
          hira: item.hira,
          alpha: item.alpha,
          id: item.id,
          meaning: item.meaning,
          score: scoring,
          wrongCount: 0,
          correctCount: 0,
        })
      }

      dispatch(populateData(res))
    }
    if (e.id.includes("KATA")) {
      let res: ILearnKana[] = [...data]

      let addSize = e.id.includes("EXTRA") && !e.id.includes("2") ? 5 : 10
      let scoring = e.id.includes("DAKUTEN")
        ? 10
        : e.id.includes("YOON")
          ? 10
          : 5
      let type = e.id.includes("DAKUTEN")
        ? "KD"
        : e.id.includes("YOON")
          ? "KY"
          : "KA"

      // Get all katakana IDs currently in data
      const onlyKata = data.filter(item => item.id.includes(type))
      const currentIds = new Set(onlyKata.map(item => item.id))

      // Filter katakana to get only those not in current data
      let unclaimedKata: any[] = []
      switch (type) {
        case "KD":
          unclaimedKata = katakanaDakuten.filter(
            item => !currentIds.has(item.id),
          )
          break
        case "KY":
          unclaimedKata = katakanaYoon.filter(item => !currentIds.has(item.id))
          break
        default:
          unclaimedKata = katakana.filter(item => !currentIds.has(item.id))
          break
      }

      // Shuffle the unclaimedKata array
      for (let i = unclaimedKata.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[unclaimedKata[i], unclaimedKata[j]] = [
          unclaimedKata[j],
          unclaimedKata[i],
        ]
      }

      for (let i = 0; i < addSize && i < unclaimedKata.length; i++) {
        const item = unclaimedKata[i]
        res.push({
          hira: item.hira,
          alpha: item.alpha,
          id: item.id,
          score: scoring,
          wrongCount: 0,
          correctCount: 0,
        })
      }

      dispatch(populateData(res))
    }

    if (e.id.includes("HISHO")) {
      if (e.id.includes("EXTRA")) {
        if (e.id.includes("2")) {
          dispatch(updateHelper(helper + 3))
        } else {
          dispatch(updateHelper(helper + 1))
        }
      } else if (e.id.includes("CARD")) {
        dispatch(resetCardCondition())
      }
    }

    if (e.id.includes("SCROLL")) {
      if (e.id.includes("EXTRA")) {
        if (e.id.includes("2")) {
          dispatch(updateScroll(scrollSize + 10))
        } else {
          dispatch(updateScroll(scrollSize + 5))
        }
      }
    }

    // reset
    dispatch(setListToPlayed())
    setScene("PLAY")
  }

  const checkIsHiraganaComplete = () => {
    const allHiragana = [...hiragana, ...hiraganaDakuten, ...hiraganaYoon].map(
      item => item.id,
    )

    const dataIds = data.map(item => item.id)
    const isComplete = allHiragana.every(id => dataIds.includes(id))

    if (isComplete) {
      const updatedAchievements = achievements.map(achievement =>
        achievement.name === "Hiragana Student"
          ? { ...achievement, status: true }
          : achievement,
      )
      dispatch(updateAchievementStatus(updatedAchievements))
    }
  }

  const onResetGame = () => {
    checkIsHiraganaComplete()
    setScene("RESULT")
    setListUpgrade(generateUpgrades())
  }

  return (
    <View
      scrollSize={scrollSize}
      helper={helper}
      listUpgrade={listUpgrade}
      scene={scene}
      onRePlay={onRePlay}
      onPlay={onPlay}
      onBackToScreen={onResetGame}
      showModal={showModal}
      setModal={setShowModal}
      result={result}
      totalScore={totalScore}
      showModalAch={showModalAch}
      setModalAch={setShowModalAch}
      totalCard={data.length}
    />
  )
}

export default LearnKana
