import { FC, memo, useEffect, useState } from "react"
import { RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { generateRandomNumberList } from "../utils/coordinates"
import { IHiragana, IResult } from "./types"
import { populateData, setHealth, setPlayedData } from "./slice"
import { motion, useAnimation } from "framer-motion"
import { DashModal } from "./quests"
import Card from "./components/Card.tsx"

import hiragana from "../assets/db/hiragana.json"
import dkh from "../assets/db/hiragana_dakuten.json"
import yh from "../assets/db/hiragana_yoon.json"
import katakana from "../assets/db/hiragana.json"
import dkn from "../assets/db/hiragana_dakuten.json"
import yk from "../assets/db/hiragana_yoon.json"

import { difficulties, IDDA } from "../utils/difficulties"
import { LevelModal } from "./levels"
import ShopPage from "./shop/index.tsx"
import MenuPage from "./menu/index.tsx"
import IndicatorTab from "./indicator/index.tsx"
import { formatTime } from "../utils/time.ts"

interface ViewProps {}

const View: FC<ViewProps> = () => {
  const [screen, setScreen] = useState("")
  // "DECK"
  // "SCROLL"
  // "ANSWER"
  // "SHOP"
  // "RESULT" || "" || "MENU"

  const dispatch = useDispatch()

  const { data, difficulty, health, availablePower, size } = useSelector(
    (state: RootState) => state.gameSlice,
  )

  const [timeLeft, setTimeLeft] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)
  const [totalWrong, setTotalWrong] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [helpCount, setHelpCount] = useState(0)
  const [totalHelp, setTotalHelp] = useState<null | number>(null)
  const controls = useAnimation()
  const [_, setIsAnimateComplete] = useState(true)
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false)
  const [showWrongAnimation, setShowWrongAnimation] = useState(false)

  const [showAllQuest, setShowAllQuest] = useState(false)
  const [showAllLevels, setShowAllLevels] = useState(false)
  const [currDiff, setCurrDiff] = useState<null | IDDA>(null)

  const [hands, setHands] = useState<IHiragana[]>([])
  const [selectedCards, setSelectedCards] = useState<IHiragana[]>([])

  const [streak, setStreak] = useState(0)

  const handleCardSelect = (card: IHiragana) => {
    setSelectedCards(prev => {
      if (prev.includes(card)) {
        return prev.filter(c => c.id !== card.id)
      } else {
        return [...prev, card]
      }
    })
  }

  useEffect(() => {
    if (screen === "ANSWER") {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime + 1)
      }, 1000)
      return () => clearInterval(timerId)
    }
  }, [screen])


  const insertQuests = (c: number): IHiragana[] => {
    let diff = difficulties[c]
    setCurrDiff(diff)

    let res: IHiragana[] = []
    // fill hiraganas
    if (diff.hiragana > 0) {
      let nums = generateRandomNumberList(hiragana.length - 1, diff.hiragana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: hiragana[e].alpha,
          hira: hiragana[e].hira,
          played: false,
          id: hiragana[e].id,
          score: 5,
        })
      }
    }
    if (diff.dakutenHiragana > 0) {
      let nums = generateRandomNumberList(dkh.length - 1, diff.dakutenHiragana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: dkh[e].alpha,
          hira: dkh[e].hira,
          played: false,
          id: dkh[e].id,
          score: 10,
        })
      }
    }
    if (diff.yoonHiragana > 0) {
      let nums = generateRandomNumberList(yh.length - 1, diff.yoonHiragana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: yh[e].alpha,
          hira: yh[e].hira,
          played: false,
          id: yh[e].id,
          score: 20,
        })
      }
    }
    // fill katakanas
    if (diff.katakana > 0) {
      let nums = generateRandomNumberList(katakana.length - 1, diff.katakana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: katakana[e].alpha,
          hira: katakana[e].hira,
          played: false,
          id: katakana[e].id,
          score: 20,
        })
      }
    }
    if (diff.dakutenKatakana > 0) {
      let nums = generateRandomNumberList(dkn.length - 1, diff.dakutenKatakana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: dkn[e].alpha,
          hira: dkn[e].hira,
          played: false,
          id: dkn[e].id,
          score: 25,
        })
      }
    }
    if (diff.yoonKatakana > 0) {
      let nums = generateRandomNumberList(yk.length - 1, diff.yoonKatakana)
      for (let i = 0; i < nums.length; i++) {
        const e = nums[i]
        res.push({
          alpha: yk[e].alpha,
          hira: yk[e].hira,
          played: false,
          id: yk[e].id,
          score: 30,
        })
      }
    }
    return res
  }

  const onPlay = () => {
    setScore(0)
    setCurrentIdx(0)
    setTimeLeft(0)
    setIsWrongAnswer(false)
    setShowHelp(false)
    setAnswer("")
    let res = insertQuests(difficulty)
    dispatch(populateData(res))
    let firstGame: number[] = generateRandomNumberList(res.length, size)
    for (let i = 0; i < firstGame.length; i++) {
      const idx = firstGame[i]
      setHands(prev => [...prev, res[idx]])
    }
    setScreen("DECK")
  }

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  }

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
    if (e.target.value.length === selectedCards[currentIdx].alpha.length) {
      if (selectedCards[currentIdx].alpha === e.target.value.toLowerCase()) {
        setShowCorrectAnimation(true)
        setScore(score + 5)
        setTimeout(() => setShowCorrectAnimation(false), 1000)
        dispatch(setPlayedData(selectedCards[currentIdx].id))
        if (currentIdx < selectedCards.length - 1) {
          setWrongCount(0)
          setCurrentIdx(currentIdx + 1)
          setAnswer("")
          setIsWrongAnswer(false)
          setShowHelp(false)
          setHelpCount(0)
        } else {
          // back to deck
          setScreen("DECK")
          setTotalWrong(0)
          // start refilling container
          console.log(data);
        }
      } else {
        controls.start(shakeAnimation)
        dispatch(setHealth(health - selectedCards[currentIdx].score))
        setShowWrongAnimation(true)
        setTimeout(() => setShowWrongAnimation(false), 1000)
        setIsWrongAnswer(true)
        setTotalWrong(totalWrong + 1)
        setWrongCount(wrongCount + 1)
      }
    }
  }

  return (
    <>
      {screen === "ANSWER" || screen === "DECK" ? (
        <div className="my-3 flex items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="bg-white p-5 rounded-md grid grid-cols-3 gap-x-4 gap-y-2 h-full shadow-lg">
              <IndicatorTab
                setIsAnimateComplete={setIsAnimateComplete}
                setShowAllLevels={setShowAllLevels}
                setShowAllQuest={setShowAllQuest}
                showWrongAnimation={showWrongAnimation}
                times={formatTime(timeLeft)}
                counter={`${currentIdx + 1}/${data.length}`}
                scoreIdx={data[currentIdx].score}
                score={score}
                ttlWrong={totalWrong}
                health={health}
              />
              {screen === "ANSWER" ? (
                <>
                  <p className="text-2xl font-bold text-center col-span-3">
                    {selectedCards[currentIdx].hira}
                    {showHelp && (
                      <p>
                        {selectedCards[currentIdx].alpha
                          .split("")
                          .map((e, i) => (
                            <span
                              key={i}
                              className="ml-1 border-b-2 border-black min-w-[20px] min-h-[10px] inline-block"
                            >
                              {helpCount > i + 1 ? e : ""}
                            </span>
                          ))}
                      </p>
                    )}
                    {showCorrectAnimation && (
                      <motion.div
                        key={score}
                        initial={{
                          y: 100,
                          x: 0,
                          opacity: 1,
                          scale: 0.2,
                        }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => {
                          setIsAnimateComplete(true)
                        }}
                        animate={{ y: 0, opacity: 0, x: 0, scale: [1, 1.5, 1] }}
                        className="absolute top-0 ml-24 bg-green-500 text-white text-lg rounded-md shadow-lg p-4"
                      >
                        {"CORRECT!!!"}
                      </motion.div>
                    )}
                  </p>
                  <div className="col-span-3">
                    <motion.input
                      type="text"
                      className={`w-full border ${isWrongAnswer ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md p-2 focus:outline-none focus:ring-2`}
                      value={answer}
                      onChange={onAnswerChange}
                      animate={controls}
                    />
                    {wrongCount > 2 && (
                      <span
                        className="text-sm text-blue-300 ml-5 cursor-pointer"
                        onClick={() => {
                          setShowHelp(true)
                          setHelpCount(helpCount + 1)
                          setScore(score - 10)
                        }}
                      >
                        {"Need Help?"}
                      </span>
                    )}
                    <div className="flex justify-end">
                      <p>
                        {totalHelp != null
                          ? `${totalHelp} Help Remaining`
                          : "Need Help?"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-3">
                  <p>{`decks`}</p>
                  <div className="grid grid-cols-5 gap-4 mt-3">
                    {hands.map(e => (
                      <Card
                        key={e.id}
                        card={e}
                        isSelected={selectedCards.includes(e)}
                        onSelect={handleCardSelect}
                        selectionOrder={selectedCards.indexOf(e) + 1}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center mt-3">
                    <button
                      disabled={selectedCards.length === 0}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                      onClick={() => {
                        setScreen("ANSWER")
                      }}
                    >
                      {"Answer"}
                    </button>

                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                      onClick={() => {}}
                    >
                      {"Discard"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : screen === "SHOP" ? (
        <ShopPage />
      ) : (
        <MenuPage onPlay={onPlay} />
      )}

      {showAllQuest && (
        <>
          <DashModal
            onCloseModal={val => {
              setShowAllQuest(val)
            }}
            onRetry={() => {}}
          />
        </>
      )}
      {showAllLevels && (
        <>
          <LevelModal
            onCloseModal={val => {
              setShowAllLevels(val)
            }}
            onRetry={() => {}}
          />
        </>
      )}
    </>
  )
}

export default memo(View)
