import React, { FC } from 'react'
import styled from 'styled-components'
import View from '../View'
import Icon, { BaseIconType } from './Icon'
import { BaseProps } from '../types'

const Container = styled(View.Center) <{ size: number, color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

interface IconProps extends BaseProps {
  iconClassName?: string
  /** 图片地址 */
  src?: string
  type?: BaseIconType
  /** 尺寸 */
  size?: number
  /** 内部图标尺寸 */
  iconSize?: number
  /** 背景颜色 */
  color?: string
  /** 图标颜色 */
  iconColor?: string
  /** 是否旋转 */
  spin?: boolean
}

const CircleIcon: FC<IconProps> = props => {
  const {
    className,
    iconClassName,
    size = 42,
    iconSize = 20,
    src,
    type,
    color = '#EEEEEE',
    spin,
    iconColor,
    children,
    ...rest
  } = props
  return (
    <Container className={className} size={size} color={color} {...rest}>
      {
        children ||
        <Icon className={iconClassName} type={type} spin={spin} size={iconSize} src={src} color={iconColor} />
      }
    </Container>
  )
}

export default CircleIcon
