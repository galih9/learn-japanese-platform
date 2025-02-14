import { FC } from "react"
import { IHiragana } from "../types"

interface CardProps {
  card: IHiragana
  isSelected: boolean
  onSelect: (card: IHiragana) => void
  selectionOrder?: number // New prop
}

const Card: FC<CardProps> = ({ card, isSelected, onSelect, selectionOrder }) => {
  return (
    <div
      className={`border mb-3 p-4 rounded-lg shadow-lg bg-white relative overflow-hidden cursor-pointer ${
        isSelected ? "bg-blue-200" : ""
      }`}
      onClick={() => onSelect(card)}
    >
      <div>
        <p>{card.hira}</p>
        <p>{card.alpha}</p>
        <p>{card.modifier}</p>
        {isSelected && selectionOrder !== undefined && (
          <p className="absolute top-0 right-0 m-2 text-lg font-bold">{selectionOrder}</p>
        )}
      </div>
    </div>
  )
}

export default Card
