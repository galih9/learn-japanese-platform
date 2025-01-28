import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IBuff } from "../types"
import { generateRandomNumber } from "../../utils/coordinates"
import { setActiveBuff, setActiveDeBuff } from "../slice"
import { RootState } from "../../app/store"
import { BUFF_LIST_COMMON, DEBUFF_LIST_COMMON } from "../buffs"
type IProps = {
  onCloseModal: (p: boolean) => void
}

export const ShopView: FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch()
  const { activeBuff } = useSelector((state: RootState) => state.gameSlice)
  const [availablePower, setAvailablePower] = useState<IBuff[]>([
    BUFF_LIST_COMMON[0],
    BUFF_LIST_COMMON[1],
    BUFF_LIST_COMMON[2],
  ])
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Shop</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onCloseModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p>active buff</p>
              <div className="grid grid-cols-3 gap-2">
                {availablePower.map((e, i) => (
                  <div
                    key={`${i}${generateRandomNumber()}`}
                    className="relative group w-16 h-32 bg-orange-300 m-3 hover:bg-orange-400"
                    onClick={() => {
                      dispatch(setActiveBuff([...activeBuff, e]))
                      dispatch(setActiveDeBuff([DEBUFF_LIST_COMMON[0]]))
                      onCloseModal(false)
                    }}
                  >
                    <p className="text-sm">{e.name}</p>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                      {e.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div className="relative group">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onCloseModal(false)}
                >
                  Close
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                  {
                    "Are you sure you want to close the shop? If you do, you have to merge 10 times to open the shop again."
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
