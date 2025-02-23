import { FC, useEffect, useState } from "react"
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

import kn5 from "../../assets/db/kanji_n5.json"
import { IKanji } from "../../pages/types"

interface IProps {}

export interface IUpg {
  name: string
  description: string
  id: string
}

const COMMON_UPGRADES: IUpg[] = [
  {
    name: "Kanji Mokkan",
    description: "Add extra 5 kanji card",
    id: "KANJI_EXTRA1",
  },
  {
    name: "Hisho",
    description: "Add extra 1 helper",
    id: "HISHO_EXTRA",
  },
]

const UNCOMMON_UPGRADES: IUpg[] = [
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
const RARE_UPGRADES: IUpg[] = [
  {
    name: "Kanji Kansubon",
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

const EPIC_UPGRADES: IUpg[] = [
  {
    name: "Kanji Orihon",
    description: "Add extra 25 kanji card",
    id: "KANJI_EXTRA4",
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

  useEffect(() => {
    let res: ILearnKana[] = []
    for (let i = 0; i < 10; i++) {
      const nums = i
      res.push({
        kanji: kn5[nums].kanji,
        onyomi: kn5[nums].onyomi,
        kunyomi: kn5[nums].kunyomi,
        alpha: kn5[nums].alpha,
        meaning: kn5[nums].meaning,
        id: kn5[nums].id,
        score: 5,
        wrongCount: 0,
        correctCount: 0,
      })
    }
    dispatch(populateData(res))
    dispatch(setListToPlayedCustom(10))
  }, [])

  const dispatch = useDispatch()
  const onPlay = () => {
    setScene("PLAY")
  }

  const onRePlay = (e?: IUpg) => {
    if (e === undefined) {
      dispatch(setListToPlayed())
      setScene("PLAY")
      return
    }

    if (e.id.includes("KANJI")) {
      let res: ILearnKana[] = [...data]
      let scoring = 5
      // Get all hiragana IDs currently in data
      const onlyHira = data.filter(item => item.id.includes("KN5"))
      const currentIds = new Set(onlyHira.map(item => item.id))

      // Filter hiragana to get only those not in current data
      let unclaimedHira: any[] = kn5.filter(item => !currentIds.has(item.id))

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
        const item: IKanji = unclaimedHira[i]
        res.push({
          kanji: item.kanji,
          onyomi: item.onyomi,
          kunyomi: item.kunyomi,
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

  const checkIsKanjiComplete = () => {
    const allHiragana = [...kn5].map(item => item.id)

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
    checkIsKanjiComplete()
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
