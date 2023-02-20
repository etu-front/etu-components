import React from 'react'
import styled from 'styled-components'
import Loading, { Colors } from './ui/Loading'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
interface Props {
  size?: number
  className?: string
  colors?: Colors
  children?: any
}
const PageLoading: React.FC<Props> = ({ children, size = 10, className, colors }) => (
  <Container className={className}>
    {children || <Loading size={size} colors={colors} />}
  </Container>
)
export default PageLoading
