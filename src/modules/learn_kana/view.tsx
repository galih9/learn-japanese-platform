import { FC } from "react"
import { KanaGame } from "./components/game"
import { StatsModal } from "./components/stats"
import { KanaIndicator } from "./components/indicator"
import { IResultKana } from "./slice"
import ResultSubtitle from "./components/subtitle"
import { IUpg } from "."
import { AchievementModal } from "./components/achievement"

interface IProps {
  scene: string
  showModal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  onRePlay: (e?: IUpg) => void
  onPlay: () => void
  result: IResultKana | null
  onBackToScreen: () => void
  totalScore: number
  listUpgrade: IUpg[]
  helper: number
  showModalAch: boolean
  setModalAch: React.Dispatch<React.SetStateAction<boolean>>
  scrollSize: number
  totalCard: number
}

export const View: FC<IProps> = ({
  showModalAch,
  setModalAch,
  scene,
  onPlay,
  onRePlay,
  onBackToScreen,
  showModal,
  setModal,
  result,
  totalScore,
  listUpgrade,
  helper,
  scrollSize,
  totalCard,
}) => {
  return (
    <>
      <div className="my-3 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md">
          {scene === "RESULT" ? (
            <>
              {result != null && (
                <>
                  <p>{"Pick an Upgrade to Advance"}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {listUpgrade.map(e => (
                      <div
                        onClick={() => onRePlay(e)}
                        className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 relative group"
                      >
                        <p className="font-bold">{e.name}</p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 invisible group-hover:visible w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                          {e.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* <button
                className={`${result != null ? "px-1 py-1 text-xs bg-gray-300" : "px-4 py-2 bg-blue-500"} text-white font-bold rounded hover:bg-blue-700 transition duration-300`}
                onClick={() => (result != null ? onRePlay() : onPlay())}
              >
                {`${result != null ? "Play Without Upgrade" : "Play"}`}
              </button> */}

              {result != null && (
                <div className="p-3 bg-white shadow-md rounded-lg">
                  <KanaIndicator setModal={setModal} totalHelp={helper} />
                  <div className="flex">
                    <p
                      className=" cursor-pointer"
                      onClick={() => {
                        setModalAch(true)
                      }}
                    >
                      {"Check Achievements"}
                    </p>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Results</h2>
                  <ResultSubtitle correct={result.correct} />
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Level:</span>
                    <span>{result.level}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Answer Size:</span>
                    <span>{scrollSize + 1}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Score:</span>
                    <span>{result.score}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Correct:</span>
                    <span>{result.correct}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Wrong:</span>
                    <span>{result.wrong}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Time Spent:</span>
                    <span>{result.timeSpent}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Total Score:</span>
                    <span>
                      {`${result.score} + ${totalCard} (total card bonus) = ${totalScore}`}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : scene === "PLAY" ? (
            <>
              <KanaIndicator setModal={setModal} totalHelp={helper} />
              <KanaGame
                onBackToScreen={onBackToScreen}
                onCloseModal={setModal}
                screen={scene}
              />
            </>
          ) : (
            <>
              <button
                className={`${result != null ? "px-1 py-1 text-xs bg-gray-300" : "px-4 py-2 bg-blue-500"} text-white font-bold rounded hover:bg-blue-700 transition duration-300`}
                onClick={onPlay}
              >
                {`Play`}
              </button>
            </>
          )}
        </div>
      </div>
      {showModalAch && <AchievementModal onCloseModal={setModalAch} />}
      {showModal && <StatsModal onCloseModal={setModal} />}
    </>
  )
}
