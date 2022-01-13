import React, { FC, useState, useEffect, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import View from '../View'
import { createBrowserHistory } from 'history'
import { MouseHandler } from '../types'
import classNames from 'classnames'

const Container = styled(View)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 999;
`

const Mask = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0,0,0,0.3);
`
const Body = styled(View)`
  background: #ddd;
  z-index: 3;
  position: fixed;
  bottom: -200px;
  left: 0;
  right: 0;
  transition: bottom 200ms;
  &.up {
    bottom: 0;
  }
  .item {
    background: white;
    border-top: 1px solid #ccc;
    padding: 12px;
    text-align: center;
    font-size: 16px;
    min-height: 48px;
    line-height: 48px;
    font-weight: 500;
    &:active {
      background: #eee;
    }
    &:last-child {
      border-top: none;
    }
  }
`

interface IAction {
  onClick: MouseHandler
}
interface ITextAction extends IAction {
  text?: string
}
interface IChildAction extends IAction {
  child?: React.ReactNode
}

interface IProps {
  title?: React.ReactNode
  visible?: boolean
  mask?: boolean
  maskClosable?: boolean
  actions: (ITextAction | IChildAction)[]
  onCancel?: MouseHandler
  className?: string
  bodyClassName?: string
  itemClassName?: string
  itemStyle?: CSSProperties
  cancelText?: string
}
const DESTROY_POOL = {}
const ActionSheet: FC<IProps> = props => {
  const { title, actions, visible, onCancel, cancelText = '取消', mask = true, maskClosable = true } = props
  const [up, setUp] = useState(false)
  const handleClose = () => {
    setUp(false)
    if (onCancel) {
      setTimeout(onCancel, 100)
    }
  }
  useEffect(() => {
    if (visible) {
      setTimeout(() => setUp(true), 100)
    } else {
      setTimeout(() => setUp(false), 100)
    }
  }, [visible])
  if (!visible) return null
  return (
    <Container className={props.className}>
      {mask && <Mask onClick={maskClosable ? handleClose : () => false} />}
      <Body className={classNames({ up }, props.bodyClassName)}>
        {title}
        {actions.map((act, index) => (
          <div key={'action-' + index}
            className={`item ${props.itemClassName || ''}`}
            onClick={act.onClick}
            style={props.itemStyle}
          >
            {(act as IChildAction).child || (act as ITextAction).text}
          </div>
        ))}
        {cancelText &&
          <div
            className={`item ${props.itemClassName || ''}`} style={props.itemStyle}
            onClick={handleClose}
          >{cancelText}</div>
        }
      </Body>
    </Container>
  )
}

export const showActionSheet = (options: Omit<IProps, 'visible'>) => {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  // eslint-disable-next-line prefer-const
  let unListen: Function
  const key = Date.now() + '_' + Math.floor(Math.random() * 100000)
  const history = createBrowserHistory()
  const destroy = () => {
    if (typeof unListen === 'function') unListen()
    if (options.onCancel) {
      options.onCancel()
    }
    if (!dom) return
    ReactDOM.unmountComponentAtNode(dom)
    dom.remove()
  }
  DESTROY_POOL[key] = destroy
  unListen = history.listen(destroy)
  ReactDOM.render(<ActionSheet visible onCancel={destroy} {...options} />, dom)
  return destroy
}

export const hideActionSheet = () => {
  for (const k in DESTROY_POOL) {
    if (typeof DESTROY_POOL[k] === 'function') {
      DESTROY_POOL[k]()
    }
  }
}

export default ActionSheet
