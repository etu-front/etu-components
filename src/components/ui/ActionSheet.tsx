import React, { FC, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import View from '../View'
import { createBrowserHistory } from 'history'
import { MouseHandler } from '../types'

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
    font-weight: 500;
    &:active {
      background: #eee;
    }
    &:last-child {
      border-top: none;
    }
  }
`

export interface IAction {
  onClick: Function
  text: string
}

interface IProps {
  visible?: boolean
  maskClosable?: boolean
  actions: IAction[]
  onCancel?: MouseHandler
  cancelText?: string
}
const ActionSheet: FC<IProps> = props => {
  const { actions, visible, onCancel, cancelText = '取消', maskClosable = true } = props
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
    <Container>
      <Mask onClick={maskClosable ? handleClose : () => false} />
      <Body className={up ? 'up' : ''}>
        {actions.map(act => <div className="item" key={act.text} onClick={() => act.onClick()}>{act.text}</div>)}
        {cancelText && <div className="item m-t-5" onClick={handleClose}>{cancelText}</div>}
      </Body>
    </Container>
  )
}
const history = createBrowserHistory()


export const showActionSheet = (options: Omit<IProps, 'visible'>) => {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  // eslint-disable-next-line prefer-const
  let unListen: Function
  const destroy = () => {
    if (typeof unListen === 'function') unListen()
    if (options.onCancel) {
      options.onCancel()
    }
    if (!dom) return
    ReactDOM.unmountComponentAtNode(dom)
    dom.remove()
  }
  unListen = history.listen(destroy)
  ReactDOM.render(<ActionSheet visible onCancel={destroy} {...options} />, dom)
  return destroy
}
export default ActionSheet
