import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { StaticBox } from "../box/static"
import { motion } from "motion/react"
import { setStatusGame } from "../slice"

type IProps = {
  onCloseModal: (p: boolean) => void
}

const TabOne = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <motion.div
            animate={{
              x: 125, // Horizontal movement to the second StaticBox position
            }}
            transition={{
              duration: 1, // Duration of 1 second
              repeat: Infinity, // Loop the animation
              repeatType: "loop", // Repeat seamlessly
            }}
          >
            <StaticBox
              name={"A1"}
              index={0}
              boxId={"A1"}
              isFilled={true}
              type="A1"
            />
          </motion.div>
          <div className="w-[80px]"></div>
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A1"
          />
          {" = "}
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A2"
          />
        </div>
      </div>
    </>
  )
}

const TabTwo = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="BAG1"
          />
          <motion.div
            animate={{
              x: 125, // Horizontal movement to the second StaticBox position
            }}
            transition={{
              duration: 1, // Duration of 1 second
              repeat: Infinity, // Loop the animation
              repeatType: "loop", // Repeat seamlessly
            }}
          >
            <StaticBox
              name={"A1"}
              index={0}
              boxId={"A1"}
              isFilled={true}
              type="A1"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

const TabThree = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <motion.div
            animate={{
              x: 125, // Horizontal movement to the second StaticBox position
            }}
            transition={{
              duration: 1, // Duration of 1 second
              repeat: Infinity, // Loop the animation
              repeatType: "loop", // Repeat seamlessly
            }}
          >
            <StaticBox
              name={"A1"}
              index={0}
              boxId={"A1"}
              isFilled={true}
              type="BAG1"
            />
          </motion.div>
          <div className="w-[80px]"></div>
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="BAG1"
          />
          {" = "}
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="BAG2"
          />
        </div>
      </div>
    </>
  )
}

const TabFour = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <motion.div
            animate={{
              x: 125, // Horizontal movement to the second StaticBox position
            }}
            transition={{
              duration: 1, // Duration of 1 second
              repeat: Infinity, // Loop the animation
              repeatType: "loop", // Repeat seamlessly
            }}
          >
            <StaticBox
              name={"A1"}
              index={0}
              boxId={"A1"}
              isFilled={true}
              type="A1"
            />
          </motion.div>
          <div className="w-[80px]"></div>
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A1"
            isLocked={true}
          />
          {" = "}
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A2"
          />
        </div>
      </div>
    </>
  )
}

const TabFive = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            isLocked={true}
            type="A1"
          />
        </div>
      </div>
    </>
  )
}
const TabSix = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center mt-5">
        <div className="flex flex-row">
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            isLocked={true}
            type="A1"
          />
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A2"
          />
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type="A3"
          />
          <StaticBox
            name={"A1"}
            index={0}
            boxId={"A1"}
            isFilled={true}
            type=""
          />
        </div>
      </div>
    </>
  )
}

export const TutorialModal: FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch()
  const {} = useSelector((state: RootState) => state.gameSlice)

  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    {
      element: <TabOne />,
      text: "Gain points by merging an item with the same type, for example A1 + A1 will be earning A2, etc",
    },
    {
      element: <TabTwo />,
      text: "Click on the BAG item to add more item in the grids",
    },
    {
      element: <TabThree />,
      text: "You can also upgrade BAG item by combining it with the same type (BAG1 + BAG1 will earn BAG2 etc)",
    },
    {
      element: <TabFour />,
      text: "Locked item is an item that can be unlocked by merging it with the same type",
    },
    {
      element: <TabFive />,
      text: "Locked item cannot be moved",
    },
    {
      element: <TabSix />,
      text: "The game is over when you cannot earn item, merge any item in the grid or the score reaches 0",
    },
  ]

  const handleNextOrPrevious = (next: boolean) => {
    setActiveIndex(prevIndex => {
      const itemCount = items.length
      if (next) {
        return prevIndex < itemCount - 1 ? prevIndex + 1 : itemCount - 1
      } else {
        return prevIndex > 0 ? prevIndex - 1 : 0
      }
    })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">How To Play</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onCloseModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative h-[200px] flex-auto">
              <div className={`p-6 w-96 flex relative`}>
                {items.map((item, i) => (
                  <div
                    className={`p-2 absolute h-full w-full top-0 left-0 transition-opacity duration-500 ease-in-out ${
                      activeIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                    key={i}
                  >
                    {item.text}
                    {item.element}
                  </div>
                ))}
              </div>
              <div className="absolute flex justify-center gap-4 z-10 w-full bottom-0">
                <button
                  className={activeIndex === 0 ? "hidden" : "visible"}
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleNextOrPrevious(false)}
                >
                  Previous
                </button>
                <button
                  className={
                    activeIndex === items.length - 1 ? "hidden" : "visible"
                  }
                  disabled={activeIndex === items.length - 1}
                  type="button"
                  onClick={() => {
                    handleNextOrPrevious(true)
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {activeIndex === items.length - 1 && (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    onCloseModal(false)
                    dispatch(setStatusGame("idle"))
                  }}
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
