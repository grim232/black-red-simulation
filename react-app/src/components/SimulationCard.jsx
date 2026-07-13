import { useState, useRef, useCallback, useEffect } from 'react'

const RESULTS = [
  { key: 'black', text: 'ดำ มึงรอด', emoji: '🖤' },
  { key: 'red', text: 'แดง มึงไม่รอด', emoji: '❤️‍🔥' },
]

function SimulationCard({
  onResult,
  initBlack,
  setInitBlack,
  initRed,
  setInitRed,
  poolBlack,
  setPoolBlack,
  poolRed,
  setPoolRed,
}) {
  const [phase, setPhase] = useState('idle') // idle | countdown | result
  const [countdown, setCountdown] = useState(3)
  const [result, setResult] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const timerRef = useRef(null)

  // Recalculate totals and percentages
  const totalPool = poolBlack + poolRed
  const pctBlack = totalPool > 0 ? ((poolBlack / totalPool) * 100).toFixed(1) : 0
  const pctRed = totalPool > 0 ? ((poolRed / totalPool) * 100).toFixed(1) : 0

  const handleInitBlackChange = useCallback((e) => {
    const val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10) || 0)
    setInitBlack(val)
    setPoolBlack(val === '' ? 0 : val)
  }, [setInitBlack, setPoolBlack])

  const handleInitRedChange = useCallback((e) => {
    const val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10) || 0)
    setInitRed(val)
    setPoolRed(val === '' ? 0 : val)
  }, [setInitRed, setPoolRed])

  const handleRefillPool = useCallback(() => {
    setPoolBlack(initBlack === '' ? 0 : initBlack)
    setPoolRed(initRed === '' ? 0 : initRed)
  }, [initBlack, initRed, setPoolBlack, setPoolRed])

  const startSimulation = useCallback(() => {
    if (totalPool === 0) return

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
        
        // Dynamic draw based on current pool ratio
        const rand = Math.floor(Math.random() * totalPool)
        let pickedKey
        if (rand < poolBlack) {
          pickedKey = 'black'
        } else {
          pickedKey = 'red'
        }

        const picked = RESULTS.find((r) => r.key === pickedKey)
        setResult(picked)
        setPhase('result')
        setDisabled(false)
        onResult(picked.key)
      }
    }, 1000)
  }, [onResult, totalPool, poolBlack])

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

      {/* Settings Section */}
      <div className="pool-settings">
        <div className="pool-settings-title">
          <span>⚙️ ตั้งค่าจำนวนสลากเริ่มต้น</span>
          <button className="pool-reset-btn" onClick={handleRefillPool} disabled={disabled}>
            🔄 เติมสลากใหม่
          </button>
        </div>
        
        <div className="pool-inputs">
          <div className="pool-input-group">
            <label htmlFor="input-black">ใบดำ (Survive)</label>
            <input
              id="input-black"
              type="number"
              className="pool-input"
              value={initBlack}
              onChange={handleInitBlackChange}
              disabled={disabled}
              min="0"
            />
          </div>
          <div className="pool-input-group">
            <label htmlFor="input-red">ใบแดง (Eliminate)</label>
            <input
              id="input-red"
              type="number"
              className="pool-input"
              value={initRed}
              onChange={handleInitRedChange}
              disabled={disabled}
              min="0"
            />
          </div>
        </div>

        <div className="pool-info">
          <div className="pool-stats-row">
            <span>ใบดำเหลือ: {poolBlack} ใบ ({pctBlack}%)</span>
            <span>ใบแดงเหลือ: {poolRed} ใบ ({pctRed}%)</span>
          </div>
          <div className="pool-progress-bg">
            <div className="pool-progress-black" style={{ width: `${pctBlack}%` }}></div>
            <div className="pool-progress-red" style={{ width: `${pctRed}%` }}></div>
          </div>
        </div>
      </div>

      <div className={getDisplayClass()}>
        {renderDisplay()}
      </div>

      <button
        id="btn-simulate"
        className="btn-primary"
        onClick={startSimulation}
        disabled={disabled || totalPool === 0}
      >
        {disabled ? 'กำลังเสี่ยง...' : totalPool === 0 ? '🚫 สลากหมดกล่อง!' : '🎲 เสี่ยงดวง!'}
      </button>
    </div>
  )
}

export default SimulationCard
