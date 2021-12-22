import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Icon } from '.'
import { BaseProps } from '../types'
import { BaseIconType } from './Icon'

const Background = styled.div`
  &.mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    top: 0;
    left: 0;
  }
`

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

type ToastIcon = 'warning' | 'info' | 'check' | 'close' | 'loading'

interface ToastProps extends BaseProps {
  /** 字符串 或 ReactNode */
  title?: string | ReactNode
  /** 图标类型 */
  icon?: ToastIcon
  /** 位置 */
  position?: Position
  /** 遮罩 默认为true */
  mask?: boolean
}
/** showToast 选项 */
interface Options extends ToastProps {
  /** 显示毫秒数，默认 3000 毫秒，当为 0 或 负数时， 持久存在 */
  duration?: number
}
type ToastFunction = (title: string, opts?: Options) => void

type ToastComponent = FC<ToastProps> & {
  show: ToastFunction
  hide: () => void
  loading: ToastFunction
  fail: ToastFunction
  info: ToastFunction
  success: ToastFunction
}

const Toast: ToastComponent = ({ icon, position, mask = true, style, children }) => {
  let iconElement
  if (icon) {
    if (icon === 'loading') {
      iconElement = <Icon type="loading" spin size={36} className="toastIcon" />
    } else if (typeof icon === 'string') {
      iconElement = <Icon type={`${icon}-circle-fill` as BaseIconType} size={36} className="toastIcon" />
    }
  }
  return (
    <Background className={mask ? 'mask' : ''}>
      <Container className={typeof position === 'string' ? `toast-${position}` : ''}
        style={typeof position === 'number' ? { transform: 'translate(-50%, 0)', top: position, ...style } : style}
      >
        {iconElement || icon}
        {children}
      </Container>
    </Background>
  )
}

const DESTROY_POOL = {}
/**
 * 显示 Toast
 * @param options Options
 * @returns toast destroy 函数
 */
export const showToast = (options: Options) => {
  const { title, duration = 3000, ...rest } = options

  const domContainer = document.createElement('div')
  document.body.appendChild(domContainer)

  const key = Date.now() + '_' + Math.floor(Math.random() * 100000)

  const destroy = () => {
    delete DESTROY_POOL[key]
    ReactDOM.unmountComponentAtNode(domContainer)
    if (domContainer.parentNode) {
      domContainer.parentNode.removeChild(domContainer)
    }
  }
  DESTROY_POOL[key] = destroy

  ReactDOM.render(
    <Toast {...rest}>{title}</Toast>,
    domContainer
  )

  if (duration > 0) {
    setTimeout(destroy, Math.max(500, duration))
  }
  return destroy
}

export const hideToast = () => {
  for (const k in DESTROY_POOL) {
    if (typeof DESTROY_POOL[k] === 'function') {
      DESTROY_POOL[k]()
    }
  }
}

// Toast Helper functions
Toast.show = (title: string, opts?: ToastProps) => showToast({ title, ...opts })
Toast.hide = hideToast
Toast.loading = (title: string, opts?: ToastProps) =>
  showToast({ title, icon: 'loading', duration: 0, mask: true, ...opts })
Toast.fail = (title: string, opts?: ToastProps) =>
  showToast({ title, icon: 'close', mask: false, ...opts })
Toast.info = (title: string, opts?: ToastProps) =>
  showToast({ title, icon: 'info', mask: false, ...opts })
Toast.info = (title: string, opts?: ToastProps) =>
  showToast({ title, icon: 'info', mask: false, ...opts })
Toast.success = (title: string, opts?: ToastProps) =>
  showToast({ title, icon: 'check', mask: false, ...opts })
export default Toast
