import { FC, useEffect, useState } from "react"
import { KanaGame } from "./components/game"
import { StatsModal } from "./components/stats"
import { KanaIndicator } from "./components/indicator"
import { IResultKana } from "./slice"
import ResultSubtitle from "./components/subtitle"
import { AchievementModal } from "./components/achievement"
import { IUpg } from "./types"
import { motion } from "motion/react"

interface IProps {
  scene: string
  showModal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  onRePlay: () => void
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
  onPowerUp: (e: IUpg) => void
  upgradePicked: boolean
  setUpgradePicked: React.Dispatch<React.SetStateAction<boolean>>
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
  onPowerUp,
  upgradePicked,
}) => {
  const [newCard, setNewCard] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (newCard > 0) {
      setShowAnimation(true)
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [newCard])

  const handlePowerUp = (e: IUpg) => {
    onPowerUp(e)
    if (e.id.includes("KANJI")) {
      setNewCard(newCard + 1)
    }
  }

  return (
    <>
      <div className="my-3 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md">
          {scene === "RESULT" ? (
            <>
              {result != null && (
                <>
                  {!upgradePicked && (
                    <>
                      <p>{"Pick an Upgrade to Advance"}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {listUpgrade.map(e => (
                          <div
                            onClick={() => handlePowerUp(e)}
                            className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 relative group"
                          >
                            <p className="font-bold">{e.name}</p>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 invisible group-hover:visible w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                              <p className="font-bold">{e.name}</p>
                              <p>{e.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    className={`${!upgradePicked ? "px-1 py-1 text-xs bg-gray-300" : "px-4 py-2 bg-blue-500"} text-white font-bold rounded hover:bg-blue-700 transition duration-300`}
                    onClick={onRePlay}
                    disabled={!upgradePicked}
                  >
                    {`Play`}
                  </button>
                </>
              )}

              {result != null && (
                <div className="p-3 bg-white shadow-md rounded-lg">
                  <KanaIndicator setModal={setModal} totalHelp={helper} />
                  <div className="flex my-3">
                    <p
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
                      onClick={() => {
                        setModal(true)
                      }}
                    >
                      {"Check All Cards"}
                    </p>
                    {showAnimation && (
                      <motion.div
                        initial={{
                          y: 100,
                          x: 0,
                          opacity: 1,
                          scale: 0.2,
                        }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => {}}
                        animate={{ y: 0, opacity: 0, x: 0, scale: [1, 1.5, 1] }}
                        className="absolute top-0 ml-24 bg-green-500 text-white text-lg rounded-md shadow-lg p-4"
                      >
                        {`+${newCard} New Kanji Card Added`}
                      </motion.div>
                    )}
                  </div>
                  <div className="flex">
                    <p
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
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
                className={`${"px-4 py-2 bg-blue-500"} text-white font-bold rounded hover:bg-blue-700 transition duration-300`}
                onClick={onPlay}
              >
                {`Play`}
              </button>
              <p>{"You should learn before playing ;)"}</p>
              <div className="flex">
                <p
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => {
                    setModal(true)
                  }}
                >
                  {"Check All Cards"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {showModalAch && <AchievementModal onCloseModal={setModalAch} />}
      {showModal && <StatsModal onCloseModal={setModal} />}
    </>
  )
}

// import Kanji from "../../assets/images/kanji_card.png"
// <div
//   onClick={() => onRePlay(e)}
//   className="cursor-pointer rounded-lg transition duration-300 relative group"
//   style={{
//     backgroundImage: `url(${Kanji})`,
//     backgroundSize: "contain",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     imageRendering: "pixelated",
//     aspectRatio: "1 / 1"
//   }}
// >
//   <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 invisible group-hover:visible w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
//     <p className="font-bold">{e.name}</p>
//     <p>{e.description}</p>
//   </div>
// </div>
