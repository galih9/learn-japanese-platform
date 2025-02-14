import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

interface IProps {}

const ShopPage: FC<IProps> = () => {
  const { availablePower } = useSelector((state: RootState) => state.gameSlice)
  return (
    <div className="my-3 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="grid">
          <p>{"Pick your upgrade"}</p>

          <div className="grid grid-cols-3 gap-4 mt-5">
            {availablePower.map(e => (
              <>
                <div className=" h-[200px] border bg-yellow-100">{e.name}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
