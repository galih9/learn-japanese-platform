import { FC } from "react"
import { BUFF_LIST_COMMON } from "../buffs"

interface IProps {
  onCloseModal: (v: boolean) => void
}

export const ListBuff: FC<IProps> = ({ onCloseModal }) => {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Buffs</h3>
            <div className="grid grid-cols-5">
              {BUFF_LIST_COMMON.map((e, i) => (
                <div key={i}>
                  <p>{e.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/*body*/}
          <div className="relative p-6 flex-auto"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
