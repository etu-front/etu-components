import React, { FC } from 'react'
import styled from 'styled-components'

export type Colors = [string, string] | undefined

interface LoadingStyles {
  /** 方块尺寸 */
  size: number
  /** 圆角 */
  radius: number
  /** 动画时间 */
  duration: number
  /** 颜色设置，[primaryColor, secondaryColor] */
  colors: Colors
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FilterDiv: FC<LoadingStyles> = ({ size, duration, radius, colors, ...rest }) => <div {...rest} />

const Container = styled(FilterDiv)`
  position: relative;
  transform: translate(-50%, -50%);
  width: ${props => props.size! * 1.5}px;
  height: ${props => props.size}px;
  @keyframes magnet-loading-opacity {
    0% {
      transform: translate(0 0);
      opacity: 1;
    }
    49.99% {
      opacity: 1;
      transform: translate(${props => props.size * 2}px, 0);
    }
    50% {
      opacity: 0;
      transform: translate(${props => props.size * 2}px, 0);
    }
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
  }
  @keyframes magnet-loading {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${props => props.size * 2}px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  &> div {
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: ${props => props.radius}px;
    top: 0;
    left: 0;
  }
  &> div:nth-child(1) {
    background: ${props => props.colors![0]};
  animation: magnet-loading ${props => props.duration}s linear infinite;
    animation-delay: -${props => props.duration / 2}s;
  }
  &> div:nth-child(2) {
    background: ${props => props.colors![1]};
    animation: magnet-loading ${props => props.duration}s linear infinite;
    animation-delay: 0s;
  }
  &> div:nth-child(3) {
    background: ${props => props.colors![0]};
    animation: magnet-loading-opacity ${props => props.duration}s linear infinite;
    animation-delay: -${props => props.duration / 2}s;
  }
`

const Loading: FC<Partial<LoadingStyles>> = props => {
  const {
    size = 20, duration = 1, radius = 8, colors
  } = props
  return (
    <Container size={size} duration={duration} radius={radius} colors={colors || ['#3f3dd0', '#55a388']}>
      <div />
      <div />
      <div />
    </Container>
  )
}
export default Loading
