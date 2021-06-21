import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styled from 'styled-components'
import { createBrowserHistory } from 'history'
import Button, { ButtonProps } from './Button'
import { BaseProps } from '../types'

const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  color: #444444;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    transition: opacity 200ms;
    opacity: 0;
  }
`

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
  min-height: 60px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: all 200ms;
  margin-top: 60px;
  opacity: 0;
  &.show {
    margin-top: 0;
    opacity: 1;
  }
  &.shadow {
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  }
  .close {
    color: #aaa;
    position: absolute;
    right: -14px;
    top: -8px;
    font-size: 26px;
    line-height: 42px;
    font-weight: bold;
    width: 42px;
    height: 42px;
    /* background: rgba(255,0,0,0.2); */
    padding-left: 5px;
    z-index: 1;
  }
  .close:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

const ModalTitle = styled.h4`
  position: relative;
  font-size: 18px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-weight:normal;
  padding: 0 36px 10px 36px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ModalBody = styled.div`
  /* padding: 10px 20px; */
  flex: 1;
  font-size: 16px;
  max-height: calc(100vh - 44px - 44px);
  overflow: auto;
`
const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    background-color: #fff;
  }
  button:not(:first-child) {
    border-left: 1px solid #f0f0f0;
  }
  .ok, .cancel {
    flex: 1;
    padding: 0;
    border:none;
    border-top: 1px solid #f0f0f0;
    outline: none;
    border-radius: 0;
  }
  .cancel {
    color: #aaa;
  }
`

export interface ModalProps {
  title?: React.ReactNode
  width?: number | string
  visible?: boolean
  shadow?: boolean
  animation?: boolean
  mask?: boolean
  maskClosable?: boolean
  maskOpacity?: number
  zIndex?: number
  closable?: boolean
  style?: BaseProps['style']
  /** modal body 内边距 */
  padding?: number | string
  onOk?: Function
  onCancel?: Function
  onDestroy?: Function
  header?: ReactNode
  footer?: ReactNode
  okText?: ReactNode
  loadingText?: ReactNode
  showOkBtn?: boolean
  okBtnProps?: ButtonProps
  cancelText?: ReactNode
  showCancelBtn?: boolean
  cancelBtnProps?: ButtonProps
  className?: BaseProps['className']
  modalClassName?: string
  bodyClassName?: string
}

type ModalComponent = FC<ModalProps> & {
  show: (options: ModalOptions) => Function
  confirm: (options: ModalOptions) => Function
  info: (options: ModalOptions) => Function
  danger: (options: ModalOptions) => Function
}

const Modal: ModalComponent = props => {
  const {
    title = '',
    visible = false,
    onOk,
    onCancel,
    onDestroy,
    closable = true,
    mask = true,
    maskClosable = true,
    maskOpacity = 0.2,
    animation,
    showCancelBtn = !!props.cancelBtnProps,
    showOkBtn = !!props.okBtnProps,
    header,
    footer
  } = props
  const [loading, setLoading] = useState(false)
  const [up, setUp] = useState(!animation)
  useEffect(() => {
    if (!animation) return
    if (visible) {
      if (!up) setTimeout(() => setUp(true), 100)
    } else {
      if (up) setTimeout(() => setUp(false), 100)
    }
  }, [visible, animation])
  if (!visible) return null



  const handleOk = async () => {
    if (onOk) {
      setLoading(true)
      try {
        await onOk()
      } finally {
        setLoading(false)
      }
    }
    if (onCancel) onCancel()
    if (onDestroy) onDestroy()
  }
  const handleCancel = () => {
    if (onCancel) onCancel()
    if (onDestroy) onDestroy()
  }
  const renderTitle = () => {
    if (header) return header
    if (title) return <ModalTitle className={props.children ? '' : 'm-t-20'}>{title}</ModalTitle>
    return null
  }

  const renderFooter = () => {
    if (footer) return footer
    const buttons = []
    if (showCancelBtn) {
      buttons.push(
        <Button key="cancel" className="cancel" type="default" onClick={handleCancel} {...(props.cancelBtnProps || {})}>
          {props.cancelText || '取消'}
        </Button>
      )
    }
    if (showOkBtn) {
      buttons.push(
        <Button key="ok"
          type="primary"
          onClick={handleOk}
          {...props.okBtnProps}
          className={classnames("ok", props.okBtnProps?.className)}
          loading={loading}
          loadingText={props.loadingText}
        >
          {props.okText || '确定'}
        </Button>
      )
    }
    return buttons
  }

  const getPadding = () => {
    if (typeof props.padding !== 'undefined') return props.padding
    if (header || title) return '10px 20px 20px 20px'
    return '20px'
  }

  const clses = [
    props.modalClassName,
    up ? 'show' : '',
    props.shadow ? 'shadow' : ''
  ].filter(Boolean).join(' ')

  return (
    <Wrap className={props.className} style={{ zIndex: props.zIndex }}>
      {mask &&
        <div
          className="mask"
          style={{ opacity: up ? maskOpacity : 0 }}
          onClick={() => maskClosable && handleCancel()}
        />
      }
      <ModalContainer style={props.width ? { width: props.width, ...props.style } : props.style} className={clses}>
        {closable && <span className="close" onClick={handleCancel}>&times;</span>}
        {renderTitle()}
        {props.children &&
          <ModalBody className={props.bodyClassName} style={{ padding: getPadding() }}>
            {props.children}
          </ModalBody>
        }
        <ModalFooter>
          {renderFooter()}
        </ModalFooter>
      </ModalContainer>
    </Wrap>
  )
}


export interface ModalOptions extends Omit<ModalProps, 'onDestroy'> {
  message?: string | ReactElement
}

const showModal = (node: ReactElement) => {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  // eslint-disable-next-line prefer-const
  let unListen: Function
  const history = createBrowserHistory()
  const destroy = () => {
    if (typeof unListen === 'function') unListen()
    if (!dom) return
    ReactDOM.unmountComponentAtNode(dom)
    dom.remove()
  }
  unListen = history.listen(destroy)
  ReactDOM.render(React.cloneElement(node, { onDestroy: destroy }), dom)
  return destroy
}

const show = (options: ModalOptions) => showModal(<Modal {...options} visible>{options.message}</Modal>)

const confirm = (options: ModalOptions) => showModal(
  <Modal showOkBtn showCancelBtn closable={false} maskClosable={false} {...options} visible>
    {options.message}
  </Modal>
)

const info = (options: ModalOptions) => showModal(
  <Modal showOkBtn okText="知道了" maskClosable={false} closable={false} {...options} visible>
    {options.message}
  </Modal>
)
const danger = (options: ModalOptions) => showModal(
  <Modal
    showOkBtn
    maskClosable={false}
    closable={false}
    showCancelBtn
    {...options}
    okBtnProps={{
      type: 'danger',
      ...options.okBtnProps,
      className: classnames('bg-danger', options.okBtnProps?.className)
    }}
    visible
  >
    {options.message}
  </Modal>
)

Modal.show = show
Modal.confirm = confirm
Modal.info = info
Modal.danger = danger

export default Modal
