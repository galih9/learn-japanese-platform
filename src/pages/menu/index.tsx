import { FC, useState } from "react"
import { IResult } from "../types"
import Confetti from "react-confetti"

interface IProps {
  onPlay: () => void;
}

const MenuPage: FC<IProps> = ({ onPlay }) => {
  const [result, setResult] = useState<IResult | null>(null)
  return (
    <div className="my-3 items-center justify-center grid">
      {result && <Confetti />}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        onClick={onPlay}
      >
        {result ? "Play Again!" : "Play"}
      </button>
      {result && (
        <div className="bg-white p-5 rounded-md shadow-lg mt-5 text-center">
          <h2 className="text-2xl font-bold mb-4">{"Result"}</h2>
          <p className="text-lg">
            {"Difficulty : "}{" "}
            <span className="font-semibold">{result.difficulty}</span>
          </p>
          <p className="text-lg">
            {"Wrong Answer : "}{" "}
            <span className="font-semibold">{result.wrong}</span>
          </p>
          <p className="text-lg">
            {"Correct Answer : "}{" "}
            <span className="font-semibold">{result.correct}</span>
          </p>
          <p className="text-lg">
            {"Time Spent : "}{" "}
            <span className="font-semibold">{result.timeSpent}</span>
          </p>
          <p className="text-lg">
            {"Score : "} <span className="font-semibold">{result.score}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default MenuPage
