import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "./App.css"
import GamePage from "./pages"
import { useEffect, useRef, useState } from "react"
import { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { isTouchDevice } from "./utils/engine"
import { TouchBackend } from "react-dnd-touch-backend"

const App = () => {
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend

  const [init, setInit] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null) // Explicitly typing the ref
  useEffect(() => {
    initParticlesEngine(async engine => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setInit(true)
    })

    const handleInteraction = () => {
      const audio = audioRef.current
      if (audio) {
        audio.play().catch(error => {
          console.error("Audio playback failed:", error)
        })
      }
      // Remove the event listener after interaction
      document.removeEventListener("click", handleInteraction)
    }

    // Listen for the first user interaction
    document.addEventListener("click", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
    }
  }, [])
 
  if (init) {
    return (
      <>
        <div className="App">
          {/* <audio ref={audioRef} src={AUDIO} loop /> */}
          <DndProvider backend={backend}>
            <GamePage />
          </DndProvider>
        </div>
      </>
    )
  }
}

export default App
