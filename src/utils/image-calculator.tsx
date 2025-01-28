import { FC } from "react"
import BAG from "../assets/Bag.png"
import A1 from "../assets/pixel/A1.png"
import A2 from "../assets/pixel/A2.png"
import A3 from "../assets/pixel/A3.png"
import A4 from "../assets/pixel/A4.png"
import A5 from "../assets/pixel/A5.png"
import B1 from "../assets/B1.png"
import B2 from "../assets/B2.png"
import B3 from "../assets/B3.png"
import B4 from "../assets/B4.png"
import C1 from "../assets/C1.png"
import C2 from "../assets/C2.png"
import D1 from "../assets/D1.png"
import D2 from "../assets/D2.png"
import D3 from "../assets/D3.png"
import F1 from "../assets/F1.png"
import F2 from "../assets/F2.png"

interface IProps {
  src: string | undefined | null
}
export const ItemImageDisplayer: FC<IProps> = ({ src }) => {
  return src === null ? (
    <></>
  ) : (
    <img src={src} className="h-10" style={{ imageRendering: "pixelated" }} />
  )
}

export const calculateImageId = (id: string | null | undefined) => {
  if (id === null || id === undefined) {
    return null
  }
  let result = ""
  switch (id) {
    case "BAG1":
      result = BAG
      break
    case "A1":
      result = A1
      break
    case "A2":
      result = A2
      break
    case "A3":
      result = A3
      break
    case "A4":
      result = A4
      break
    case "A5":
      result = A5
      break
    case "B1":
      result = B1
      break
    case "B2":
      result = B2
      break
    case "B3":
      result = B3
      break
    case "B4":
      result = B4
      break
    case "C1":
      result = C1
      break
    case "C2":
      result = C2
      break
    case "D1":
      result = D1
      break
    case "D2":
      result = D2
      break
    case "D3":
      result = D3
      break
    case "F1":
      result = F1
      break
    case "F2":
      result = F2
      break
    default:
      result = ""
      break
  }
  return result
}
