import { useState, useCallback } from 'react'

function MusicToggle({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(() => {
        // Browser may block autoplay; ignore silently
      })
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [audioRef])

  return (
    <button
      id="music-toggle"
      className={`music-fab${isPlaying ? ' playing' : ''}`}
      onClick={toggleMusic}
      data-tip="เปิด/ปิดเพลงประกอบ"
      aria-label="Toggle background music"
    >
      <span className="material-icons-round">
        {isPlaying ? 'volume_up' : 'volume_off'}
      </span>
    </button>
  )
}

export default MusicToggle
