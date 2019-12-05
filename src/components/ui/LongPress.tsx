import React from 'react'
import { useState, useEffect } from 'react'


function useLongPress(callback = () => { }, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false)
  const [timerId, setTimer] = useState(0)

  useEffect(() => {
    if (startLongPress) {
      setTimer(setTimeout(callback, ms))
    } else {
      clearTimeout(timerId)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [startLongPress, callback, ms])

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false)
  }
}

interface ILongPressProps {
  children: any
  callback: () => void
  ms?: number
}

export default function LongPress({ children, callback, ms }: ILongPressProps) {
  const longPressEvents = useLongPress(callback, ms)

  return <span style={{ display: 'block' }} {...longPressEvents}>{children}</span>
}
