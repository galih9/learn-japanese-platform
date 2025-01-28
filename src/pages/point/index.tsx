import { motion } from "motion/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useEffect, useState } from "react"

export const ScoreViewer = () => {
  const { playerData } = useSelector((state: RootState) => state.gameSlice)
  const [isAnimateComplete, setIsAnimateComplete] = useState(true)

  useEffect(() => {
    if (playerData.lastScored != 0) {
      setIsAnimateComplete(false)
    }
  }, [playerData.score])

  return (
    <>
      <p>Your Score</p>
      {!isAnimateComplete && (
        <motion.div
          key={playerData.score}
          initial={{
            y: 0,
            x: 0,
            opacity: 1,
            scale: 0.2,
          }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            setIsAnimateComplete(true)
          }}
          animate={{ y: 0, opacity: 0.5, x: 0, scale: [1, 1.5, 1] }}
          className="absolute top-0 ml-24 bg-green-500 text-white text-lg rounded-md shadow-lg p-4"
        >
          {"+" + playerData.lastScored}
        </motion.div>
      )}
      {playerData.score}
      <p>Merge Count</p>
      {playerData.mergeCount}
    </>
  )
}
