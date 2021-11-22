import styled from 'styled-components'

const LineText = styled.div<{ lineWidth?: number, lineColor?: string }>`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
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
