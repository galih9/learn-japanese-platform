import { FC, memo, useEffect, useRef, useState } from "react"
import { Box as Boxes } from "./box"
import { RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import {
  insertQuest,
  retryGame,
  setModalShop,
} from "./slice"
// import { NpcView } from "./npc"
import { DashModal } from "./npc/dashModal"
import { TutorialModal } from "./npc/tutorialModal"
import { generateRandomNumber } from "../utils/coordinates"
import { ShopView } from "./shop"
import { QUESTS_LIST_COMMON } from "./quests"
import { BuffContainer } from "./buff"
import { ScoreViewer } from "./point"
import { QuestBox } from "./quest"
import { DebuffBox } from "./buff/debuff"
interface ViewProps {}

const View: FC<ViewProps> = () => {
  const { data, quests, playerData, activeBuff, activeDebuff } = useSelector(
    (state: RootState) => state.gameSlice,
  )
  const dispatch = useDispatch()
  const [showTutorial, setShowTutorial] = useState(false)
  const targetRef = useRef<HTMLButtonElement | null>(null)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (playerData.isGameOver) {
      setShowModal(true)
    }
  }, [playerData.isGameOver])

  useEffect(() => {
    if (quests.length < 3) {
      dispatch(
        insertQuest([
          ...quests,
          QUESTS_LIST_COMMON[
            generateRandomNumber(0, QUESTS_LIST_COMMON.length)
          ],
          QUESTS_LIST_COMMON[
            generateRandomNumber(0, QUESTS_LIST_COMMON.length)
          ],
          QUESTS_LIST_COMMON[
            generateRandomNumber(0, QUESTS_LIST_COMMON.length)
          ],
        ]),
      )
    }
  }, [])

  return (
    <>
      {showTutorial && (
        <TutorialModal onCloseModal={() => setShowTutorial(false)} />
      )}

      <div className="my-3 flex items-center justify-center">
        <div className="flex gap-4">
          <div className="border h-full w-60 bg-white rounded-md">
            <p>Quests</p>
            {quests.map((e, i) => (
              <QuestBox e={e} i={i} key={i} />
            ))}

            {/* <button
              ref={targetRef}
              onClick={() => setShowTutorial(!showTutorial)}
              className={`rounded-lg text-sm w-32 h-8 bg-[#0464ff] text-[#ffffff] justify-center`}
            >
              TEST
            </button>
            <button
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Open regular modal
            </button> */}
          </div>
          <div
            className={`bg-white p-5 rounded-md col-span-9 grid grid-cols-9 gap-4 ${playerData.isGameOver && "pointer-events-none"} h-full`}
          >
            {data.map((e, i) => (
              <Boxes
                isFilled={e.isFilled}
                key={i}
                name={`${i + 1}`}
                index={i}
                type={e.itemTypes?.code ?? ""}
                boxId={`box-` + i}
              />
            ))}
          </div>
          <div className="border rounded-md p-3 bg-white h-full w-60">
            <ScoreViewer />
            {playerData.isGameOver && (
              <div className="mb-3">
                <button
                  ref={targetRef}
                  onClick={() => dispatch(retryGame())}
                  className={`rounded-lg text-sm w-32 h-8 bg-[#36a018] text-[#ffffff] justify-center`}
                >
                  Retry
                </button>
              </div>
            )}
            <div>
              {/* {!playerData.isGameOver && <NpcView />} */}
              <button
                onClick={() => setShowTutorial(!showTutorial)}
                className={`rounded-lg text-sm w-32 h-8 bg-[#0464ff] text-[#ffffff] justify-center`}
              >
                How to Play
              </button>
            </div>
            <div>
              <p>active buff</p>
              <div className="grid grid-cols-3 gap-2">
                {activeBuff.map((e, i) => (
                  <BuffContainer key={i} element={e} idx={i} />
                ))}
              </div>
            </div>
            <div>
              <p>active debuff</p>
              <div className="grid grid-cols-3 gap-2">
                {activeDebuff.map((e, i) => (
                  <DebuffBox key={i} e={e} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <DashModal
            onCloseModal={val => {
              setShowModal(val)
            }}
            onRetry={() => {
              dispatch(retryGame())
            }}
          />
        </>
      )}
      {playerData.isShopAvailable && (
        <ShopView onCloseModal={() => dispatch(setModalShop(false))} />
      )}
    </>
  )
}

export default memo(View)
