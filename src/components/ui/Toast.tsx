import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Icon } from '.'
import { BaseProps } from '../types'
import { BaseIconType } from './Icon'

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  min-width: 100px;
  max-width: 240px;
  line-height: 1.4;
  text-align: center;
  word-wrap: break-word;
  word-break: break-word;
  background-color: rgba(0,0,0,.6);
  -webkit-transform: translate(-50%,-50%);
  z-index: 1000;
  .toastIcon {
    display: block;
    margin: 10px auto;
    text-align: center;
    color: #ffffffbb;
  }
  &.toast-top {
    transform: translate(-50%, 0);
    top: 72px;
  }
  &.toast-bottom {
    top: auto;
    transform: translate(-50%, 0);
    bottom: 72px;
  }
`
type Position = 'top' | 'center' | 'bottom' | number

type ToastIcon = 'warning' | 'info' | 'check' | 'close'

interface ToastProps extends BaseProps {
  /** 字符串 或 ReactNode */
  title?: string | ReactNode
  /** 图标类型 */
  icon?: ToastIcon
  /** 位置 */
  position?: Position
}
const Toast: FC<ToastProps> = ({ icon, position, children }) => (
  <Container className={typeof position === 'string' ? `toast-${position}` : ''}
    style={typeof position === 'number' ? { transform: 'translate(-50%, 0', top: position } : undefined}
  >
    {icon && (typeof icon === 'string' ?
      <Icon type={`${icon}-circle-fill` as BaseIconType} size={36} className="toastIcon" /> :
      icon)
    }
    {children}
  </Container>
)
/** showToast 选项 */
interface Options extends ToastProps {
  /** 显示毫秒数，默认 3000 毫秒，当为 0 或 负数时， 持久存在 */
  duration?: number
}

/**
 * 显示 Toast
 * @param options Options
 * @returns toast destroy 函数
 */
export const showToast = (options: Options) => {
  const { title, duration = 3000, ...rest } = options

  const domContainer = document.createElement('div')
  document.body.appendChild(domContainer)

  const destroy = () => {
    ReactDOM.unmountComponentAtNode(domContainer)
    if (domContainer.parentNode) {
      domContainer.parentNode.removeChild(domContainer)
    }
  }

  ReactDOM.render(
    <Toast {...rest}>{title}</Toast>,
    domContainer
  )

  if (duration > 0) {
    setTimeout(destroy, Math.max(500, duration))
  }
  return destroy
}
export default Toast
