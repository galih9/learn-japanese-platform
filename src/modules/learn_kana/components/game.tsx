import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { motion, useAnimation } from "motion/react"
import { ILearnKana, setResult, updateHelper, updateKanaData } from "../slice"
import { formatTime } from "../../../utils/time"
import { hiraganaToText } from "../../../utils/data"

interface IProps {
  onBackToScreen: () => void
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  screen: string
}

export const KanaGame: FC<IProps> = ({ onBackToScreen, screen }) => {
  const dispatch = useDispatch()
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  }
  // totals
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)

  const [wrongCount, setWrongCount] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [helpCount, setHelpCount] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [totalHelp, _] = useState<null | number>(null)
  const controls = useAnimation()
  const {
    data,
    toPlayedIds,
    scrollSize,
    helper,
    result: bb,
  } = useSelector((state: RootState) => state.katakanaSlice)

  const [cardAnswer, setCardAnswer] = useState<ILearnKana | undefined>(
    undefined,
  )

  useEffect(() => {
    let next = data.find(e => e.id === toPlayedIds[currentIndex])
    if (next === undefined) {
      let result = score
      if (wrongAnswers.size === 0) {
        result += 5
      }
      dispatch(
        setResult({
          level: (bb?.level ?? 0) + 1,
          score: result * 2,
          wrong: wrongAnswers.size,
          correct: totalCorrect - wrongAnswers.size + 1,
          timeSpent: formatTime(timeLeft),
        }),
      )
      // reset
      setTotalCorrect(0)
      setTimeLeft(0)
      setWrongAnswers(new Set())
      onBackToScreen()
    } else {
      setCardAnswer(next)
    }
  }, [currentIndex])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (cardAnswer === undefined) return
    if (e.key === "Enter" && cardAnswer.meaning !== undefined) {
      let isMatch = false
      for (let i = 0; i < cardAnswer.meaning.length; i++) {
        const element = cardAnswer.meaning[i]
        if (answer.toLowerCase() === element.toLowerCase()) {
          isMatch = true
          break
        }
      }
      // match text
      const onyomi_answer = hiraganaToText(cardAnswer.onyomi[0])
      const kunyomi_answer = hiraganaToText(cardAnswer.kunyomi[0])
      if (onyomi_answer != "" && kunyomi_answer != "" && !isMatch) {
        if (
          answer.toLowerCase() === onyomi_answer.toLowerCase() ||
          answer.toLowerCase() === kunyomi_answer.toLowerCase()
        ) {
          isMatch = true
        }
      }

      if (isMatch) {
        setShowCorrectAnimation(true)
        setTotalCorrect(totalCorrect + 1)
        setScore(score + 5)
        dispatch(
          updateKanaData({
            id: cardAnswer.id,
            wrongCount: cardAnswer.wrongCount,
            correctCount: cardAnswer.correctCount + 1,
          }),
        )
        setTimeout(() => setShowCorrectAnimation(false), 1000)
        if (currentIndex < scrollSize) {
          setWrongCount(0)
          setCurrentIndex(currentIndex + 1)
          setAnswer("")
          setIsWrongAnswer(false)
          setShowHelp(false)
          setHelpCount(0)
        } else {
          let result = score
          if (wrongAnswers.size === 0) {
            result += 5
          }
          dispatch(
            setResult({
              level: (bb?.level ?? 0) + 1,
              score: result * 2,
              wrong: wrongAnswers.size,
              correct: totalCorrect - wrongAnswers.size + 1,
              timeSpent: formatTime(timeLeft),
            }),
          )
          // reset
          setTotalCorrect(0)
          setTimeLeft(0)
          setWrongAnswers(new Set())
          onBackToScreen()
        }
      } else {
        controls.start(shakeAnimation)
        setIsWrongAnswer(true)
        setWrongCount(wrongCount + 1)
        setWrongAnswers(prev => new Set(prev).add(currentIndex))
        dispatch(
          updateKanaData({
            id: cardAnswer.id,
            wrongCount: cardAnswer.wrongCount + 1,
            correctCount: cardAnswer.correctCount,
          }),
        )
      }
    }
  }

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cardAnswer === undefined) return
    setAnswer(e.target.value)
  }

  useEffect(() => {
    if (screen != "") {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime + 1)
      }, 1000)
      return () => clearInterval(timerId)
    }
  }, [screen])

  useEffect(() => {
    if (wrongCount > 2 && helper === 0) {
      console.log("game over")
    }
  }, [cardAnswer])

  return (
    <>
      <p>{`Round ${currentIndex + 1}`}</p>
      <p className="text-3xl font-bold text-center col-span-3">
        {cardAnswer?.kanji}
        {showHelp && (
          <p>
            {hiraganaToText(cardAnswer?.onyomi[0] ?? "")
              .split("")
              .map((e, i) => (
                <span
                  key={i}
                  className="ml-1 border-b-2 border-black min-w-[20px] min-h-[10px] inline-block"
                >
                  {e}
                </span>
              ))}
          </p>
        )}
        {cardAnswer?.meaning && showHelp && (
          <div className="pt-3 flex gap-4">
            {cardAnswer.meaning.map(e => (
              <p className="text-blue-400">{e}</p>
            ))}
          </div>
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
            onAnimationComplete={() => {}}
            animate={{ y: 0, opacity: 0, x: 0, scale: [1, 1.5, 1] }}
            className="absolute top-0 ml-24 bg-green-500 text-white text-lg rounded-md shadow-lg p-4"
          >
            {"CORRECT!!!"}
          </motion.div>
        )}
      </p>
      <div className="col-span-3">
        {formatTime(timeLeft)}
        {cardAnswer?.meaning && (
          <p className="text-xs pb-1 flex">
            {
              "*Type the meaning or onyomi reading or kunyomi reading and click submit button"
            }
          </p>
        )}
        <motion.input
          type="text"
          className={`w-full border ${isWrongAnswer ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md p-2 focus:outline-none focus:ring-2`}
          value={answer}
          onChange={onAnswerChange}
          onKeyDown={onKeyDown}
          animate={controls}
        />
        {wrongCount > 2 && (
          <span
            className="text-sm text-blue-300 ml-5 cursor-pointer"
            onClick={() => {
              setShowHelp(true)
              setHelpCount(helpCount + 1)
              setScore(score - 10)
              if (helpCount === 0) {
                dispatch(updateHelper(helper - 1))
              }
            }}
          >
            {"Need Help?"}
          </span>
        )}
        <div className="flex justify-end">
          <p>
            {totalHelp != null ? `${totalHelp} Help Remaining` : "Need Help?"}
          </p>
        </div>
      </div>
    </>
  )
}
