import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { motion } from "framer-motion"

type IProps = {
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AchievementModal: FC<IProps> = ({ onCloseModal }) => {
  const { achievements } = useSelector(
    (state: RootState) => state.katakanaSlice,
  )
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
              <h3 className="text-3xl font-semibold">{"Achievements"}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onCloseModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div
                className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto"
                onMouseMove={handleMouseMove}
              >
                {achievements.map(e => (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotateX: (mousePosition.y - window.innerHeight / 2) / 20,
                      rotateY: (mousePosition.x - window.innerWidth / 2) / 20,
                    }}
                    style={{ perspective: 1000 }}
                    className="flex justify-between border mb-3 p-4 rounded-lg shadow-lg bg-white relative overflow-hidden"
                  >
                    <div
                      className="text-left"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <p className="text-3xl">{e.name}</p>
                      <p className="text-xs">{e.description}</p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={e.status}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <p className="text-xs">
                        {e.status ? "Completed" : "Incomplete"}
                      </p>
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
