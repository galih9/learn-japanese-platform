import { motion } from "motion/react"
import { FC, useEffect, useState } from "react"
import { IBuff } from "../types"
import { generateRandomNumber } from "../../utils/coordinates"

interface IProps {
  element: IBuff
  idx: number
}

export const BuffContainer: FC<IProps> = ({ element, idx }) => {
  const [prevCharges, setPrevCharges] = useState(element.charges)
  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    if (element.charges !== prevCharges) {
      setPrevCharges(element.charges)
      setIsTriggered(true)
    }
  }, [element.charges, prevCharges, isTriggered])
  return (
    <div
      key={`${idx}${generateRandomNumber()}`}
      className="relative group w-16 h-16 bg-orange-300 m-3"
    >
      <p className="text-sm">{element.name}</p>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
        {element.description}
        {element.charges != undefined && element.charges != 0 && (
          <p>{"charges: " + element.charges + " left"}</p>
        )}
      </div>
      { isTriggered && (
        <motion.div
          key={`${element.id}-${prevCharges}`}
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
          className="absolute top-0 right-0 bg-green-500 text-white text-lg rounded-md shadow-lg p-4"
        >
          {"-1"}
        </motion.div>
      )}
    </div>
  )
}
