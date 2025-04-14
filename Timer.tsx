import React, { useState, useEffect } from 'react'

interface TimerProps {
  onTimeUp: () => void
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [timeLeft, onTimeUp])

  return <div className="text-lg font-bold">Time left: {timeLeft} sec</div>
}

export default Timer
