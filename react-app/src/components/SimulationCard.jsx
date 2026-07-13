import { useState, useRef, useCallback, useEffect } from 'react'

const RESULTS = [
  { key: 'black', text: 'ดำ มึงรอด', emoji: '🖤' },
  { key: 'red', text: 'แดง มึงไม่รอด', emoji: '❤️‍🔥' },
]

function SimulationCard({ onResult }) {
  const [phase, setPhase] = useState('idle') // idle | countdown | result
  const [countdown, setCountdown] = useState(3)
  const [result, setResult] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const timerRef = useRef(null)

  const startSimulation = useCallback(() => {
    setDisabled(true)
    setPhase('countdown')
    setCountdown(3)
    setResult(null)

    let count = 3
    timerRef.current = setInterval(() => {
      count--
      if (count > 0) {
        setCountdown(count)
      } else {
        clearInterval(timerRef.current)
        // Pick random result
        const picked = RESULTS[Math.floor(Math.random() * RESULTS.length)]
        setResult(picked)
        setPhase('result')
        setDisabled(false)
        onResult(picked.key)
      }
    }, 1000)
  }, [onResult])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const getDisplayClass = () => {
    if (phase === 'countdown') return 'display-area countdown'
    if (phase === 'result' && result) {
      return `display-area result-${result.key}`
    }
    return 'display-area idle'
  }

  const renderDisplay = () => {
    if (phase === 'countdown') {
      return <span key={countdown}>{countdown}</span>
    }
    if (phase === 'result' && result) {
      return (
        <span key={result.text}>
          {result.emoji} {result.text}
        </span>
      )
    }
    return <span>กดปุ่มเพื่อเสี่ยงดวง</span>
  }

  return (
    <div className="glass-card">
      <h1 className="card-title">จับใบดำใบแดง</h1>
      <p className="card-subtitle">ลองเสี่ยงดวงของคุณ — ดำรอด แดงไม่รอด</p>

      <div className={getDisplayClass()}>
        {renderDisplay()}
      </div>

      <button
        id="btn-simulate"
        className="btn-primary"
        onClick={startSimulation}
        disabled={disabled}
      >
        {disabled ? 'กำลังเสี่ยง...' : '🎲 เสี่ยงดวง!'}
      </button>
    </div>
  )
}

export default SimulationCard
