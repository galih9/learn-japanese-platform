import { FC, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
type Iprops = {}
export const LogView: FC<Iprops> = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <div className="flex  justify-center">
        <div className="w-4/5 h-[50px] border border-red-600 overflow-auto scroll-snap-y-container">
          {/* <div className="flex h-0 w-0">.</div> */}
          <ol>
            <div ref={messagesEndRef} />
          </ol>
          {/* <div className="flex h-0 w-0">.</div> */}
        </div>
      </div>
    </>
  )
}
