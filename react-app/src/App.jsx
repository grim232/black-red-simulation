import { useState, useRef, useCallback } from 'react'
import SimulationCard from './components/SimulationCard'
import StatsPanel from './components/StatsPanel'
import MusicToggle from './components/MusicToggle'
import ConfirmModal from './components/ConfirmModal'

function App() {
  const [blackCount, setBlackCount] = useState(0)
  const [redCount, setRedCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null) // 'black' | 'red' | null

  // Card pool settings state
  const [initBlack, setInitBlack] = useState(50)
  const [initRed, setInitRed] = useState(50)
  const [poolBlack, setPoolBlack] = useState(50)
  const [poolRed, setPoolRed] = useState(50)

  const audioRef = useRef(null)

  const handleResult = useCallback((result) => {
    if (result === 'red') {
      setRedCount((prev) => prev + 1)
      setPoolRed((prev) => Math.max(0, prev - 1))
      setLastUpdated('red')
    } else {
      setBlackCount((prev) => prev + 1)
      setPoolBlack((prev) => Math.max(0, prev - 1))
      setLastUpdated('black')
    }
    // Reset the "updated" animation trigger after a short delay
    setTimeout(() => setLastUpdated(null), 500)
  }, [])

  const handleResetRequest = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleResetConfirm = useCallback(() => {
    setBlackCount(0)
    setRedCount(0)
    setPoolBlack(initBlack === '' ? 0 : initBlack)
    setPoolRed(initRed === '' ? 0 : initRed)
    setShowModal(false)
  }, [initBlack, initRed])

  const handleResetCancel = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <>
      {/* Background music */}
      <audio ref={audioRef} loop preload="none">
        <source src={`${import.meta.env.BASE_URL}song.mp3`} type="audio/mpeg" />
      </audio>

      <div className="app-container">
        <SimulationCard
          onResult={handleResult}
          initBlack={initBlack}
          setInitBlack={setInitBlack}
          initRed={initRed}
          setInitRed={setInitRed}
          poolBlack={poolBlack}
          setPoolBlack={setPoolBlack}
          poolRed={poolRed}
          setPoolRed={setPoolRed}
        />
        <StatsPanel
          blackCount={blackCount}
          redCount={redCount}
          poolBlack={poolBlack}
          poolRed={poolRed}
          lastUpdated={lastUpdated}
          onReset={handleResetRequest}
        />
      </div>

      <MusicToggle audioRef={audioRef} />

      {showModal && (
        <ConfirmModal
          onConfirm={handleResetConfirm}
          onCancel={handleResetCancel}
        />
      )}
    </>
  )
}

export default App
