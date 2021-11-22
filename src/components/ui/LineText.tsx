import styled from 'styled-components'

interface IProps {
  width?: string | number
  lineWidth?: number
  lineColor?: string
}
const LineText = styled.div<IProps>`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ width }) => width ? (typeof width === 'number' ? `${width}px` : width) : '100%'};
  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    width: ${props => props.lineWidth || 44}px;
    top: 50%;
    background: ${props => props.lineColor || '#d8d8d8'};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
  i.icon {
    width: 38px;
  }
`

export default LineText
