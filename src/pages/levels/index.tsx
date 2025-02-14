import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
type IProps = {
  onCloseModal: (p: boolean) => void
  onRetry: () => void
}

export const LevelModal: FC<IProps> = ({ onCloseModal, onRetry }) => {
  const { playerMult } = useSelector((state: RootState) => state.gameSlice)

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{"Levels"}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onCloseModal(false)}
              ></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                {"Levels"}
              </p>
              <div>
                <div className="grid grid-cols-5 gap-x-4 font-semibold">
                  <div className="flex text-left">{"Name"}</div>
                  <div>{"Coin"}</div>
                  <div>{"Mult"}</div>
                  <div>{"Level"}</div>
                  <div>{"Play Count"}</div>
                </div>
                {playerMult.map(e => {
                  return (
                    <div className="grid grid-cols-5 gap-x-4">
                      <div className="flex text-left">{e.name}</div>
                      <div>{e.coin}</div>
                      <div>{e.mult}</div>
                      <div>{e.level}</div>
                      <div>{e.playCount}</div>
                    </div>
                  )
                })}
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
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  onCloseModal(false)
                  onRetry()
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
