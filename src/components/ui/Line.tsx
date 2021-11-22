import React from 'react'
import View from '../View'
import { BaseProps } from '../types'

const Line: React.FC<{ height?: number, color?: string } & BaseProps> = ({
  height = 10,
  color,
  className,
  style
}) => <View className={className} style={style} height={height} background={color} />

export default Line
