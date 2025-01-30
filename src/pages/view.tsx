import { FC, memo, useEffect, useState } from "react"
import { RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { generateRandomNumberList } from "../utils/coordinates"
import { hiragana, IHiragana, IResult } from "./types"
import { populateData } from "./slice"
import { motion, useAnimation } from "framer-motion"
import Confetti from "react-confetti"
interface ViewProps {}

const View: FC<ViewProps> = () => {
  const dispatch = useDispatch()

  const { data } = useSelector((state: RootState) => state.gameSlice)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)
  const [totalWrong, setTotalWrong] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [helpCount, setHelpCount] = useState(0)
  const controls = useAnimation()
  const [result, setResult] = useState<IResult | null>(null)
  const [_, setIsAnimateComplete] = useState(true)
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false)
  const [showWrongAnimation, setShowWrongAnimation] = useState(false)

  useEffect(() => {
    if (isGameStarted) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime + 1)
      }, 1000)
      return () => clearInterval(timerId)
    }
  }, [isGameStarted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const onPlay = () => {
    setScore(0)
    setCurrentIdx(0)
    setTimeLeft(0)
    setShowHelp(false)
    setAnswer("")
    let res: IHiragana[] = []
    let nums = generateRandomNumberList(hiragana.length - 1, 10)
    for (let i = 0; i < nums.length; i++) {
      const e = nums[i]
      res.push(hiragana[e])
    }
    dispatch(populateData(res))
    setIsGameStarted(true)
  }

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  }

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
    if (e.target.value.length === data[currentIdx].alpha.length) {
      if (data[currentIdx].alpha === e.target.value) {
        setShowCorrectAnimation(true)
        setTimeout(() => setShowCorrectAnimation(false), 1000)
        if (currentIdx < data.length - 1) {
          setWrongCount(0)
          setScore(score + 5)
          setCurrentIdx(currentIdx + 1)
          setAnswer("")
          setIsWrongAnswer(false)
          setShowHelp(false)
          setHelpCount(0)
        } else {
          setScore(score + 5)
          setTotalWrong(0)
          setResult({
            difficulty: "Easy",
            correct: data.length - totalWrong,
            wrong: totalWrong,
            timeSpent: formatTime(timeLeft),
            score: score,
          })
          setIsGameStarted(false)
        }
      } else {
        controls.start(shakeAnimation)
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
      {isGameStarted && data.length > 0 ? (
        <div className="my-3 flex items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="bg-white p-5 rounded-md grid grid-cols-3 gap-x-4 gap-y-2 h-full shadow-lg">
              <p className="text-lg font-semibold col-span-3 text-center">
                {formatTime(timeLeft)}
                <span className="text-xs font-normal block">{`${currentIdx + 1}/10`}</span>
                <span>{score}</span>
              </p>
              <p className="text-2xl font-bold text-center col-span-3">
                {data[currentIdx].hira}
                {showHelp && (
                  <p>
                    {data[currentIdx].alpha.split("").map((e, i) => (
                      <span
                        key={i}
                        className="ml-1 border-b-2 border-black min-w-[20px] inline-block"
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
                {showWrongAnimation && (
                  <motion.div
                    key={totalWrong}
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
                    className="absolute top-0 ml-24 bg-red-500 text-white text-lg rounded-md shadow-lg p-4"
                  >
                    {"WRONG!!!"}
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
                    }}
                  >
                    {"Need Help?"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-3 items-center justify-center grid">
          {result && <Confetti />}
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={onPlay}
          >
            {result ? "Play Again!" : "Play"}
          </button>
          {result && (
            <div className="bg-white p-5 rounded-md shadow-lg mt-5 text-center">
              <h2 className="text-2xl font-bold mb-4">{"Result"}</h2>
              <p className="text-lg">
                {"Difficulty : "}{" "}
                <span className="font-semibold">{result.difficulty}</span>
              </p>
              <p className="text-lg">
                {"Wrong Answer : "}{" "}
                <span className="font-semibold">{result.wrong}</span>
              </p>
              <p className="text-lg">
                {"Correct Answer : "}{" "}
                <span className="font-semibold">{result.correct}</span>
              </p>
              <p className="text-lg">
                {"Time Spent : "}{" "}
                <span className="font-semibold">{result.timeSpent}</span>
              </p>
              <p className="text-lg">
                {"Score : "}{" "}
                <span className="font-semibold">{result.score}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default memo(View)
