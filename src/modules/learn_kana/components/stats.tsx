import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { motion } from "framer-motion"
import { hiraganaToText } from "../../../utils/data"

type IProps = {
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const StatsModal: FC<IProps> = ({ onCloseModal }) => {
  const { data } = useSelector((state: RootState) => state.katakanaSlice)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{"Questions"}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onCloseModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div
                className="grid grid-cols-5 gap-4 max-h-96 overflow-y-auto"
                onMouseMove={handleMouseMove}
              >
                {data.map(e => (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotateX: (mousePosition.y - window.innerHeight / 2) / 20,
                      rotateY: (mousePosition.x - window.innerWidth / 2) / 20,
                    }}
                    style={{ perspective: 1000 }}
                    className="border mb-3 p-4 rounded-lg shadow-lg bg-white relative overflow-hidden"
                  >
                    <div style={{ transformStyle: "preserve-3d" }}>
                      <p className="text-6xl">{e.kanji}</p>
                      <p className="text-xs">{e.onyomi[0]}</p>
                      <p className="text-xs">
                        {`${hiraganaToText(e.onyomi[0])}`}
                      </p>
                      <p className="text-xs">{e.meaning}</p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 invisible group-hover:visible w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                        {e.meaning}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onCloseModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
