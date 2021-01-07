import React, { FC, ReactElement, ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { createBrowserHistory } from 'history'
import Button from './Button'
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
    background: rgba(0, 0, 0, 0.2);
  }
`

const ModalContainer = styled.div<{ width?: number | string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${props => props.width || '300px'};
  min-height: 150px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
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
  line-height: 50px;
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
  button:not(:first-child) {
    border-left: 1px solid #f0f0f0;
  }
  .ok, .cancel {
    flex: 1;
    height: 44px;
    line-height: 42px;
    font-size: 16px;
    padding: 0;
    border:none;
    border-top: 1px solid #f0f0f0;
    outline: none;
    border-radius: 0;
  }
  .ok {
    color: ${props => props.theme.primaryColor};
    background-color: #fff;
    &:hover, &:active {
      background-color: #f3f3f3;
      color: ${props => props.theme.primaryColor};
    }
  }
  .cancel {
    background-color: #fff;
    color: #aaaaaa;
    &:hover, &:active {
      background-color: #f3f3f3;
      color: #999;
    }
  }
`

interface ModalProps {
  title?: string
  width?: number | string
  visible?: boolean
  mask?: boolean
  maskClosable?: boolean
  zIndex?: number
  closable?: boolean
  className?: BaseProps['className']
  style?: BaseProps['style']
  /** modal body 内边距 */
  padding?: number | string
  onOk?: Function
  onCancel?: Function
  onDestroy?: Function
  onClose?: Function
  header?: ReactNode
  footer?: ReactNode
  okText?: ReactNode
  loadingText?: ReactNode
  showOkBtn?: boolean
  okBtnProps?: any
  cancelText?: ReactNode
  showCancelBtn?: boolean
  cancelBtnProps?: any
  bodyClassName?: string
}

type ModalComponent = FC<ModalProps> & {
  show: (options: ModalOptions) => Function
  confirm: (options: ModalOptions) => Function
  info: (options: ModalOptions) => Function
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
    showCancelBtn,
    showOkBtn,
    header,
    footer
  } = props
  const [loading, setLoading] = useState(false)
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
    if (onCancel) {
      onCancel()
    }
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
        <Button key="cancel" className="cancel" onClick={handleCancel} {...(props.cancelBtnProps || {})}>
          {props.cancelText || '取消'}
        </Button>
      )
    }
    if (showOkBtn) {
      buttons.push(
        <Button key="ok" className="ok" onClick={handleOk} {...(props.okBtnProps || {})}
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
  return (
    <Wrap className={props.className} style={{ zIndex: props.zIndex }}>
      {mask && <div className="mask" onClick={() => maskClosable && handleCancel()} />}
      <ModalContainer width={props.width} style={props.style}>
        {closable && <span className="close" onClick={handleCancel}>&times;</span>}
        {renderTitle()}
        <ModalBody className={props.bodyClassName} style={{ padding: getPadding() }}>
          {props.children}
        </ModalBody>
        <ModalFooter>
          {renderFooter()}
        </ModalFooter>
      </ModalContainer>
    </Wrap>
  )
}


interface ModalOptions extends ModalProps {
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

Modal.show = show
Modal.confirm = confirm
Modal.info = info

export default Modal
