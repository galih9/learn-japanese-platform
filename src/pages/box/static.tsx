import { FC } from "react"

interface BoxProps {
  name: string
  index: number
  type?: string
  boxId: string
  isFilled: boolean
  isLocked?: boolean
}

export const StaticBox: FC<BoxProps> = ({
  type,
  boxId,
  isFilled,
  isLocked = false,
}) => {
  return (
    <div className={"bg-emerald-600 cursor-grab h-[50px]"}>
      <div id={boxId}>
        <div
          className={`h-[50px] w-[50px] bg-yellow-300 flex flex-row justify-center items-center`}
        >
          <div
            className={` ${isFilled ? "opacity-100" : "opacity-0"} h-[45px] w-[45px] ${isLocked ? "bg-slate-400" : "bg-white"} font-extrabold flex flex-row justify-center items-center border border-solid border-slate-950`}
          >
            {/* <ItemImageDisplayer src={calculateImageId(type)} /> */}
            {type ?? ""}
          </div>
        </div>
        {/* <span className="text-sm font-thin">{"\n" + index}</span> */}
      </div>
    </div>
  )
}
