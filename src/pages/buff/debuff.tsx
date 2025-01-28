import { motion, useAnimation } from "motion/react"
import { generateRandomNumber } from "../../utils/coordinates"
import { RootState } from "../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { FC, useEffect, useState } from "react"
import { Box, IBuff } from "../types"
import {
  changeConditionByIndex,
  directModifyGameOver,
  directModifyPoint,
  removeDataByIndex,
} from "../slice"
import { checkIsGameOver } from "../functions"

interface IProps {
  e: IBuff
  i: number
}

export const DebuffBox: FC<IProps> = ({ e, i }) => {
  const { data, playerData, activeDebuff } = useSelector(
    (state: RootState) => state.gameSlice,
  )
  const dispatch = useDispatch()
  const control = useAnimation()
  const [isTriggered, setIsTriggered] = useState(false)
  useEffect(() => {
    if (activeDebuff.length > 0) {
      for (let k = 0; k < activeDebuff.length; k++) {
        const element = activeDebuff[k]
        let id = parseInt(element.id.replace(/\D/g, "") ?? 0)
        if (element.id.includes("DEBUFF_CARD")) {
          if (id === 1) {
            // remove active card
            if (playerData.mergeCount % 3 === 0 && playerData.mergeCount != 0) {
              let active_list: Box[] = data.filter(
                e =>
                  e.condition != "locked" &&
                  e.isFilled &&
                  !e.itemTypes?.code.includes("BAG"),
              )
              if (active_list.length > 0) {
                let idx =
                  active_list.length === 1
                    ? active_list[0].index
                    : active_list[
                        generateRandomNumber(active_list.length - 1, 0)
                      ].index
                control.start({ scale: [1, 2, 1] })
                setIsTriggered(true)
                dispatch(removeDataByIndex(idx))
              }
            }
          }
          if (id === 2) {
            // lock card
            if (playerData.mergeCount % 3 === 0 && playerData.mergeCount != 0) {
              let active_list: Box[] = data.filter(
                e =>
                  e.condition != "locked" &&
                  e.isFilled &&
                  !e.itemTypes?.code.includes("BAG"),
              )
              if (active_list.length > 0) {
                let idx =
                  active_list.length === 1
                    ? active_list[0].index
                    : active_list[
                        generateRandomNumber(active_list.length - 1, 0)
                      ].index
                control.start({ scale: [1, 2, 1] })
                setIsTriggered(true)
                dispatch(
                  changeConditionByIndex({ idx: idx, condition: "locked" }),
                )
              }
            }
          }
        }
        if (element.id.includes("DEBUFF_POINT")) {
          if (id === 1) {
            if (playerData.mergeCount % 3 === 0 && playerData.mergeCount != 0) {
              let res = playerData.score - 200
              dispatch(directModifyPoint(res))
              control.start({ scale: [1, 2, 1] })
              setIsTriggered(true)
            }
          }
        }
      }
    }
    // check is game over
    dispatch(directModifyGameOver(checkIsGameOver(data, playerData.score)))
  }, [playerData.mergeCount, data])

  return (
    <>
      <motion.div
        key={`${i}${generateRandomNumber()}`}
        initial={{ scale: 1 }}
        animate={control}
        className="relative group w-16 h-16 bg-red-300 m-3"
      >
        <p className="text-sm">{e.name}</p>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
          {e.description}
        </div>
        {isTriggered && (
          <motion.div
            key={`${e.id}`}
            initial={{
              y: 0,
              opacity: 1,
              scale: 0.8,
            }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setIsTriggered(false)
            }}
            animate={{ y: -100, x: 0, opacity: 0, scale: 1 }}
            className="absolute top-0 right-0 bg-red-500 text-white text-lg rounded-md shadow-lg p-4"
          >
            {"Triggered"}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
