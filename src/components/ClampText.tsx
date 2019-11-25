import React, { FC } from 'react'
import styled from 'styled-components'
import { BaseProps } from './types'

const Container = styled.div<{ title?: string, max: number }>`
  display: -webkit-box;
  line-clamp: ${props => props.max};
  -webkit-line-clamp: ${props => props.max};
  -webkit-box-orient: vertical;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
`

interface IProps {
  max?: number
  /**标题，当组件无 children 时，title 就为原文字 */
  title?: string
  text?: string
}
const ClampText: FC<IProps & BaseProps> = props => {
  const { max, title, text, className = '', children, style, ...rest } = props
  const clamp = Math.max(1, max || 1)
  return (
    <Container max={clamp} title={title || text} className={className}
      style={style}
      {...rest}
    >
      {children || title || text}
    </Container>
  )
}

export default ClampText
