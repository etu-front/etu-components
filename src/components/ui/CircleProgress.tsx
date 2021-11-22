import React, { FC } from 'react'

interface IProps {
  className?: string
  size?: number
  borderWidth?: number
  bgColor?: string
  color?: string
  percent?: number
}

const CircleProgress: FC<IProps> = props => {
  const { size = 44, bgColor = '#eee', className, color = '#ff8a37', borderWidth = 8, percent = 0 } = props
  const radius = (100 - borderWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percent / 100) * circumference
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      version="1.1"
    >
      <circle stroke={bgColor} strokeWidth={borderWidth} fill="transparent" r={radius} cx="50" cy="50" />
      <circle
        r={radius}
        stroke={color}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'all 100ms' }}
        strokeDashoffset={offset}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeWidth={borderWidth}
        fill="transparent"
        cx="50"
        cy="50"
      />
    </svg>
  )
}
export default CircleProgress
