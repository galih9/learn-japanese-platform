import { motion } from "motion/react"
import { FC } from "react"

interface IProps {
  setShowAllQuest: React.Dispatch<React.SetStateAction<boolean>>
  setShowAllLevels: React.Dispatch<React.SetStateAction<boolean>>
  setIsAnimateComplete: React.Dispatch<React.SetStateAction<boolean>>
  showWrongAnimation: boolean
  times: string
  counter: string
  score: number
  health: number
  ttlWrong: number
  scoreIdx: number
}

const IndicatorTab: FC<IProps> = ({
  setShowAllLevels,
  setShowAllQuest,
  setIsAnimateComplete,
  showWrongAnimation,
  times,
  counter,
  score,
  health,
  ttlWrong,
  scoreIdx
}) => {
  return (
    <div className="flex justify-center gap-x-4  col-span-3 text-center">
      <div className="text-lg font-semibold">
        {times}
        <span className="text-xs font-normal block">{counter}</span>
      </div>
      <div>
        <p>{`Current Score : ${score}`}</p>
        <p>{`Target Score : -`}</p>
      </div>

      <div className="flex flex-col">
        <p>{"Health :"}</p>
        <div className="w-full h-[20px] bg-red-400">
          <div
            className="h-[20px] bg-green-400"
            style={{ width: `${health}%` }}
          >
            <p className="text-xs">{health + "/100"}</p>
          </div>
          {showWrongAnimation && (
            <motion.div
              key={ttlWrong}
              initial={{
                y: 0,
                x: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                setIsAnimateComplete(true)
              }}
              animate={{ y: 100, opacity: 0, x: 0 }}
              className="absolute top-0 ml-24 bg-red-500 text-white text-lg rounded-md shadow-lg p-4"
            >
              {`-${scoreIdx}`}
            </motion.div>
          )}
        </div>
        <button
          className="text-sm text-blue-300 ml-5 cursor-pointer"
          onClick={() => {
            setShowAllQuest(true)
          }}
        >
          {"Check All Card"}
        </button>
        <button
          className="text-sm text-blue-300 ml-5 cursor-pointer"
          onClick={() => {
            setShowAllLevels(true)
          }}
        >
          {"Check All Levels"}
        </button>
      </div>
    </div>
  )
}
export default IndicatorTab
