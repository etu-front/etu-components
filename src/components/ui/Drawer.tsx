import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { createBrowserHistory } from 'history'
import styled from 'styled-components'

import { BaseProps } from '../types'
import Icon from './Icon'
import View from '../View'

const Main = styled.div`
  z-index: 1;
  position: relative;
`

const Mask = styled.div<{ opacity?: number }>`
  position: fixed;
  background: #00000073;
  transition: opacity 200ms;
  transition-timing-function: cubic-bezier(.7,.3,.1,1);
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  &.opened {
    opacity: ${props => props.opacity || 0.3};
  }
`

const Container = styled(View)`
  --boxshaow-color: rgb(0 0 0 / 15%);
  max-width: 100vw;
  position: fixed;
  background-color: white;
  color: #474747;
  transition-timing-function: cubic-bezier(.7,.3,.1,1);
  transition-duration: 200ms;
  &.left, &.right {
    top: 0;
    bottom: 0;
  }
  &.top, &.bottom {
    left: 0;
    right: 0;
  }
  &.right {
    transition-property: right;
    right: -100%;
    box-shadow: -2px 0 8px var(--boxshaow-color);
    &.opened {right: 0;}
  }
  &.left {
    transition-property: left;
    left: -100%;
    box-shadow: 2px 0 8px var(--boxshaow-color);
    &.opened {left: 0;}
  }
  &.top {
    transition-property: top;
    top: -100%;
    box-shadow: 0 2px 8px var(--boxshaow-color);
    &.opened {top: 0;}
  }
  &.bottom {
    transition-property: bottom;
    bottom: -100%;
    box-shadow: 0 -2px 8px var(--boxshaow-color);
    &.opened {bottom: 0;}
  }
  .drawer-title {
    padding: 8px 16px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  .drawer-close {
    position: absolute;
    right: 12px;
    top: 10px;
    color: #666;
    font-size: 18px;
    cursor: pointer;
    z-index: 1;
  }
  &.left {
    .drawer-title {
      flex-direction: row-reverse !important;
    }
    .drawer-close {
      left: 12px;
      right: auto;
    }
  }
  .drawer-body {
    padding: 10px 16px;
    flex: 1;
    overflow: auto;
  }
  @media (prefers-color-scheme: dark) {
    --boxshaow-color: #000d;
    .drawer-title {
      color: white;
      border-bottom: 1px solid #555;
    }
    .drawer-body {
      color: white;
    }
    .drawer-close {color: white;}
  }
`

const _DESTROY_POOL = {}

interface IProps extends BaseProps {
  title?: JSX.Element | string
  extra?: JSX.Element | string
  mask?: boolean
  maskClosable?: boolean
  closable?: boolean
  maskOpacity?: number
  drawerClassName?: string
  closeClassName?: string
  animation?: boolean
  visible?: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  width?: number | string
  height?: number | string
  onClose?: () => void
  onDestroy?: Function
}

interface DrawerOption extends Omit<IProps, 'onDestroy' | 'visible'> {
  body: string | React.ReactElement
  /** 关闭其他 drawer 仅打开自身*/
  singleton?: boolean
}

type DrawerComponent = React.FC<IProps> & {
  /** 函数方式显示组件 */
  show: (options: DrawerOption) => () => void
  /** 关闭所有 drawer */
  destory: () => void
  /** iframe 内嵌方式打开 url */
  openUrl: (url: string, options?: Omit<DrawerOption, 'body'>) => () => void
}

const Drawer: DrawerComponent = props => {
  const {
    visible,
    mask = true,
    closable = true,
    maskClosable = true,
    maskOpacity,
    onClose,
    onDestroy,
    animation = true,
    width = 375,
    height = 400,
    position = 'right',
    children
  } = props

  const [opened, setOpened] = React.useState(!animation)

  const handleClose = () => setOpened(false)

  const unmount = () => {
    if (opened) return
    if (onDestroy) {
      onDestroy()
    } else if (onClose) {
      onClose()
    }
  }

  React.useEffect(() => {
    if (!animation) return
    if (visible) {
      if (!opened) setTimeout(() => setOpened(true), 100)
    } else if (opened) setTimeout(() => setOpened(false), 100)
  }, [visible, animation])

  if (!visible) return null

  const size: { width?: number | string, height?: number | string } = { width, height }
  if (position === 'left' || position === 'right') delete size.height
  if (position === 'top' || position === 'bottom') delete size.width

  return (
    <Main onTransitionEnd={unmount} className="Magnet-Drawer">
      {mask &&
        <Mask opacity={maskOpacity} className={classNames({ opened })}
          onClick={maskClosable ? handleClose : undefined}
        />
      }
      <Container
        className={classNames(props.drawerClassName, position, 'bg-lightest', { opened })}
        style={props.style} {...size}
      >
        {props.title &&
          <View className={classNames('drawer-title', { 'p-r-35': closable && position !== 'left' })}
            row align="center" justify={props.extra ? 'space-between' : 'flex-start'}
          >{props.title}{props.extra}</View>
        }
        {closable &&
          <Icon type="close" className={classNames("drawer-close", props.closeClassName)} onClick={handleClose} />
        }
        <View className={classNames('drawer-body', props.className)}>{children}</View>
      </Container>
    </Main>
  )
}

Drawer.show = options => {
  const { body, singleton, ...rest } = options
  if (singleton) Drawer.destory()
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  // eslint-disable-next-line prefer-const
  let unListen: Function
  const history = createBrowserHistory()
  const key = Date.now() + '_' + Math.floor(Math.random() * 1000000)
  const destroy = () => {
    delete _DESTROY_POOL[key]
    if (typeof unListen === 'function') unListen()
    if (!dom) return
    if (rest.onClose) rest.onClose()
    ReactDOM.unmountComponentAtNode(dom)
    dom.remove()
  }
  _DESTROY_POOL[key] = destroy
  unListen = history.listen(destroy)
  // const node = <
  ReactDOM.render(<Drawer {...rest} visible onDestroy={destroy}>{body}</Drawer>, dom)
  return destroy
}

Drawer.destory = () => {
  for (const k in _DESTROY_POOL) {
    if (typeof _DESTROY_POOL[k] === 'function') {
      _DESTROY_POOL[k]()
    }
  }
}

Drawer.openUrl = (url: string, options) =>
  Drawer.show({
    width: 375,
    className: 'p-a-0',
    ...options,
    body: (
      <iframe
        title={typeof options?.title === 'string' ? options.title : 'iframe'}
        src={url}
        height="100%"
        width="100%"
        frameBorder="none"
        scrolling="auto"
      />
    )
  })

Drawer.displayName = 'Drawer'
export default Drawer
