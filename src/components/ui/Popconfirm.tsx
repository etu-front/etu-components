import React from 'react'
import Button from './Button'
import Modal, { ModalOptions } from './Modal'
import View from '../View'

type Position = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'
interface IProps extends Omit<ModalOptions, 'showOkBtn' | 'showCancelBtn'> {
  position?: Position
  offset?: number
  onOk: () => void
  children: JSX.Element
}

const getPosition = (rect: DOMRect, container: HTMLElement, position: Position = 'topLeft', offset = 5) => {
  console.log(rect)
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

const Popconfirm = React.memo<IProps>(props => {
  const { children, position, offset, message, okBtnProps, cancelBtnProps, ...rest } = props
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.children[0].getBoundingClientRect()
    const destory = Modal.show({
      bodyClassName: 'p-a-15',
      message: (
        <View>
          {message || '确认？'}
          <View row justify="flex-end">
            {!rest.maskClosable &&
              <Button size="small" type="default" onClick={() => destory()} className="m-r-15" {...cancelBtnProps}>
                取消
              </Button>
            }
            <Button size="small" type="primary" onClick={() => { rest.onOk(); destory() }} {...okBtnProps}>
              确定
            </Button>
          </View>
        </View>
      ),
      closable: false,
      maskClosable: false,
      onShow: container => {
        const pos = getPosition(rect, container, position, offset)
        // eslint-disable-next-line no-param-reassign
        container.style.left = `${pos.left}px`
        // eslint-disable-next-line no-param-reassign
        container.style.top = `${pos.top}px`
        // eslint-disable-next-line no-param-reassign
        container.style.opacity = '1'
      },
      ...rest,
      animation: false,
      showOkBtn: false,
      showCancelBtn: false,
      style: { ...rest.style, opacity: 0, transition: 'opacity 200ms', transform: 'none' }
    })
  }

  return (
    <span onClick={handleClick}>{children}</span>
  )
})

Popconfirm.displayName = 'Popconfirm'

export default Popconfirm
