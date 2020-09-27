import { MouseEvent, CSSProperties } from 'react'

export type MouseHandler = (e?: MouseEvent<HTMLElement | undefined>) => any

export interface BaseProps {
  className?: string
  style?: CSSProperties
  onClick?: MouseHandler
}
