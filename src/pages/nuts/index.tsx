import { FC } from "react"
import { motion } from "framer-motion"

interface BoxProps {
  name: string
  index: number
  type?: string
  boxId: string
  isFilled: boolean
}

export const Nut: FC<BoxProps> = ({ index, type, boxId, isFilled }) => {
  return (
    <div key={index} className={"bg-emerald-600 cursor-grab h-[50px]"}>
      <div id={boxId}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          className={` h-[50px] w-[50px] flex flex-row justify-center items-center`}
        >
          <div
            onClick={() => {}}
            className={` ${isFilled ? "opacity-100" : "opacity-0"} h-[45px] w-[45px] font-extrabold flex flex-row justify-center items-center border border-solid border-slate-950`}
          >
            {type ?? ""}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
