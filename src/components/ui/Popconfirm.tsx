import React from 'react'
import Button, { ButtonProps } from './Button'
import Modal, { ModalOptions } from './Modal'
import View from '../View'

type Position = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'
interface IProps extends Omit<ModalOptions, 'showOkBtn' | 'closable'> {
  btnProps?: ButtonProps
  position?: Position
  offset?: number
  onOk: () => void
  children: JSX.Element
}

const getPosition = (rect: DOMRect, container: HTMLElement, position: Position = 'topLeft', offset = 5) => {
  const pos = { left: rect.x, top: rect.y }
  if (position === 'topLeft' || position === 'topRight') {
    pos.top = Math.max(0, rect.y - container.offsetHeight - offset)
  }
  if (position === 'bottomLeft' || position === 'bottomRight') {
    pos.top = Math.max(0, rect.bottom + offset)
  }

  if (position === 'bottomRight' || position === 'topRight') {
    pos.left = Math.max(0, rect.x + rect.width - container.offsetWidth)
  }

  if (position === 'topLeft' || position === 'bottomLeft') {
    pos.left = Math.max(0, rect.x)
  }

  return pos
}

const Message: React.FC<IProps> = props => {
  const {
    message,
    btnProps,
    cancelBtnProps, cancelText = '取消', okBtnProps, okText = '确定',
    onOk, showCancelBtn = true,
    onCancel
  } = props
  const [loading, setLoading] = React.useState(false)
  const handelOk = async () => {
    setLoading(true)
    try {
      await onOk()
    } finally {
      setLoading(false)
    }
    onCancel && onCancel()
  }
  return (
    <View>
      {message || '确认？'}
      <View row justify="flex-end" className="m-t-10">
        {showCancelBtn && (
          <Button size="small" type="default" onClick={() => onCancel && onCancel()} className="m-r-15"
            {...btnProps} {...cancelBtnProps}
          >
            {cancelText}
          </Button>
        )}
        <Button size="small" type="primary" loading={loading} onClick={handelOk} {...btnProps} {...okBtnProps}>
          {okText}
        </Button>
      </View>
    </View>
  )
}
const Popconfirm = React.memo<IProps>(props => {
  const { children, position, offset, animation = true, ...rest } = props

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.children[0].getBoundingClientRect()
    const destory = Modal.show({
      modalClassName: 'shadow-xl',
      bodyClassName: 'p-a-15',
      maskClosable: false,
      ...rest,
      onShow: container => {
        const pos = getPosition(rect, container, position, offset)
        // eslint-disable-next-line no-param-reassign
        container.style.left = `${pos.left}px`
        // eslint-disable-next-line no-param-reassign
        container.style.top = `${pos.top}px`
        // eslint-disable-next-line no-param-reassign
        container.style.opacity = '1'
      },
      closable: false,
      showCancelBtn: false,
      showOkBtn: false,
      animation: false,
      message: <Message {...props} onCancel={() => destory()} />,
      style: { ...rest.style, opacity: 0, transition: animation ? 'opacity 200ms' : 'none', transform: 'none' }
    })
  }

  return (
    <span onClick={handleClick}>{children}</span>
  )
})

Popconfirm.displayName = 'Popconfirm'

export default Popconfirm
