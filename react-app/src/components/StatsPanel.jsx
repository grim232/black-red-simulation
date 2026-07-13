import { memo } from 'react'

function StatsPanel({ blackCount, redCount, lastUpdated, onReset }) {
  return (
    <div className="stats-panel">
      <div className="stat-item">
        <div className="stat-label">ดำ (รอด)</div>
        <div
          className={`stat-value black-val${lastUpdated === 'black' ? ' updated' : ''}`}
        >
          {blackCount}
        </div>
      </div>

      <button id="btn-reset" className="btn-reset" onClick={onReset}>
        ล้างสถิติ
      </button>

      <div className="stat-item">
        <div className="stat-label">แดง (ไม่รอด)</div>
        <div
          className={`stat-value red-val${lastUpdated === 'red' ? ' updated' : ''}`}
        >
          {redCount}
        </div>
      </div>
    </div>
  )
}

export default memo(StatsPanel)
