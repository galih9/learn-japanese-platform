import { FC } from "react"
import { ConnectableElement, useDrag, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import {
  addData,
  mergeData,
  modifyActiveCharge,
  replaceData,
  setActiveBuff,
} from "../slice"
import { RootState } from "../../app/store"
import { motion } from "framer-motion"
import { calculateRandomNumber } from "../../utils/coordinates"

interface BoxProps {
  name: string
  index: number
  type?: string
  boxId: string
  isFilled: boolean
}

export const Box: FC<BoxProps> = ({ name, index, type, boxId, isFilled }) => {
  const dispatch = useDispatch()
  const { data, activeBuff, activeDebuff } = useSelector(
    (state: RootState) => state.gameSlice,
  )

  // DRAG
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "obj",
      item: { name: name, index: index, type: type },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<BoxProps>()
        if (item && dropResult) {
          if (index != dropResult.index) {
            if (type === dropResult.type) {
              dispatch(
                mergeData({
                  indexFr: item.index,
                  indexTo: dropResult.index,
                }),
              )
              if (activeBuff.length > 0) {
                let actRes = activeBuff
                for (let k = 0; k < activeBuff.length; k++) {
                  const element = activeBuff[k]
                  if (element.charges !== undefined && element.charges > 0) {
                    dispatch(
                      modifyActiveCharge({
                        id: element.id,
                        value: element.charges - 1,
                      }),
                    )
                  }
                  if (element.charges !== undefined && element.charges === 1) {
                    dispatch(
                      setActiveBuff(
                        actRes.filter(item => item.id !== element.id),
                      ),
                    )
                  }
                }
              }
            } else if (data[dropResult.index].condition != "locked") {
              dispatch(
                replaceData({
                  indexFr: item.index,
                  indexTo: dropResult.index,
                }),
              )
            }
          }
        }
      },
      canDrag: data[index].condition != "locked",
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, type, index, data],
  )

  // DROP
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "obj",
      item: { name, index, type },
      drop: () => ({ name: name, index: index, type: type }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: data[index].condition === "normal" ? monitor.canDrop() : false,
        // canDrop: monitor.canDrop(),
      }),
    }),
    [name, type, index, data],
  )

  function attachRef(el: ConnectableElement) {
    drag(el)
    drop(el)
  }
  return (
    <div className={"bg-emerald-600 cursor-grab h-[50px]"}>
      <div
        id={boxId}
        className={`${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
      >
        <motion.div
          whileHover={
            data[index].condition != "locked" ? { scale: 1.2 } : undefined
          }
          whileTap={
            data[index].condition != "locked" ? { scale: 0.8 } : undefined
          }
          initial={{
            y: calculateRandomNumber(300, 100),
            x: calculateRandomNumber(300, 100),
            opacity: 0,
            scale: 0.8,
          }}
          animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          className={`${!isDragging ? "visible" : "hidden"} h-[50px] w-[50px] ${isOver ? "opacity-20" : "opacity-100"} ${isFilled ? "bg-yellow-300" : canDrop ? "bg-lime-300" : "bg-slate-300"} flex flex-row justify-center items-center`}
        >
          <div
            onClick={() => {
              if (data[index].charges) {
                dispatch(
                  addData({
                    parentIndex: index,
                    bagType: data[index].itemTypes?.code ?? "",
                  }),
                )
              }
            }}
            ref={attachRef}
            className={` ${isFilled ? "opacity-100" : "opacity-0"} h-[45px] w-[45px] ${data[index].condition === "normal" ? "bg-white" : "bg-gray-400"} font-extrabold flex flex-row justify-center items-center border border-solid border-slate-950`}
          >
            {/* <ItemImageDisplayer src={calculateImageId(type)} /> */}
            {type ?? ""}
          </div>
        </motion.div>
        {/* <span className="text-sm font-thin">{"\n" + index}</span> */}
      </div>
    </div>
  )
}
