import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { motion } from "framer-motion"
import DashPic from "./dash"
import { generateRandomNumber } from "../../utils/coordinates"
import { complimentText, doneQuestText, idleText } from "../types"
import { setShowedNpcText } from "../slice"

type IProps = {}

export const NpcView: FC<IProps> = () => {
  const { currentStatus, npcData } = useSelector(
    (state: RootState) => state.gameSlice,
  )
  const dispatch = useDispatch()
  // const hasStartedRef = useRef(false)
  useEffect(() => {
    // if (!hasStartedRef.current && status) {
    //   hasStartedRef.current = true
    // }
    console.log("test", currentStatus)

    if (currentStatus === "idle") {
      dispatch(
        setShowedNpcText(
          idleText[generateRandomNumber(idleText.length - 1, 0)],
        ),
      )
    }
    if (currentStatus === "done_merge") {
      dispatch(
        setShowedNpcText(
          complimentText[generateRandomNumber(complimentText.length - 1, 0)],
        ),
      )
    }
    if (currentStatus === "done_quest") {
      dispatch(
        setShowedNpcText(
          doneQuestText[generateRandomNumber(doneQuestText.length - 1, 0)],
        ),
      )
    }
  }, [currentStatus, npcData.showedText])
  return (
    <div className="flex flex-col items-center">
      <DashPic rotate={false} />
      <div className="max-w-[200px] p-4 bg-gray-100 rounded-md text-center overflow-hidden break-words">
        {npcData.showedText.split("").map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 10,
            }}
            key={i}
          >
            {el === " " ? "\u00A0" : el}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
