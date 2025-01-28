import { FC } from "react"
import { generateRandomNumber } from "../../utils/coordinates"
import { IQuest } from "../types"
import { getSpecificItemCount } from "../functions"
import { completeQuest, insertQuest } from "../slice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { motion, useAnimation } from "motion/react"
import { QUESTS_LIST_COMMON } from "../quests"
interface IProps {
  i: number
  e?: IQuest
}
export const QuestBox: FC<IProps> = ({ i, e }) => {
  const dispatch = useDispatch()
  const controls = useAnimation()
  const { data, quests } = useSelector((state: RootState) => state.gameSlice)
  if (e === undefined) {
    return
  }
  return (
    <>
      <div key={`${i}${generateRandomNumber()}`}>
        <motion.div
          key={`${i}${generateRandomNumber()}`}
          initial={{ opacity: 1 }}
          animate={controls}
          transition={{ duration: 1 }}
          className="py-4 bg-cyan-400 m-2"
          onAnimationComplete={() => {
            const randomIndex = generateRandomNumber(QUESTS_LIST_COMMON.length)
            const newQuest = QUESTS_LIST_COMMON[randomIndex]
            dispatch(insertQuest([...quests, newQuest]))
          }}
        >
          <div>
            <p>{e?.title ?? ""}</p>
            <p>{`Reward : ${e?.reward_type === "item" ? e?.reward_item?.title + " card" : e?.reward_point + " point"}`}</p>
            <p>
              {getSpecificItemCount(data, e.required_type)} / {e.required_item}
            </p>
          </div>
          <div>
            <button
              disabled={
                getSpecificItemCount(data, e.required_type) < e.required_item
              }
              onClick={() => {
                dispatch(completeQuest({ questIdx: i }))
                const quest = quests.filter((_, idx) => idx != i)
                dispatch(insertQuest(quest))
              }}
              className={`rounded-lg text-sm w-32 h-8 ${getSpecificItemCount(data, e.required_type) < e.required_item ? "bg-[#6b727d]" : "bg-green-600"} text-[#ffffff] justify-center`}
            >
              Complete
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
