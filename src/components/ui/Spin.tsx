import React, { CSSProperties, FC } from 'react'
import styled from 'styled-components'
import Loading, { Colors } from './Loading'

const Container = styled.div`
  position: relative;
  min-height: 200px;
`

const Inner = styled.div`
  color: ${props => props.theme.primaryColor};
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(255,255,255,0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

interface ISpin {
  className?: string
  spinning?: boolean
  style?: CSSProperties
  tip?: string
  colors?: Colors
}

const Spin: FC<ISpin> = props => {
  const { spinning = false, tip = '', children, colors, className, style } = props
  if (!spinning) return <>{children}</>
  return (
    <Container style={style} className={className}>
      {children}
      <Inner>
        <Loading size={10} colors={colors} />
        {tip}
      </Inner>
    </Container>
  )
}

export default Spin
