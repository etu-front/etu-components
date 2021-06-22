import { BaseProps } from '../components/types'
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Modal, { ModalProps } from '../components/ui/Modal'
import { Button } from '../components/ui'


export default {
  title: 'Modal',
  component: Modal
}

const Template = (args: any) => <Modal {...args} />

type Component = typeof Template & { args?: ModalProps & BaseProps }


export const Default: Component = Template.bind({})
Default.args = {
  title: 'Title',
  children: 'sss',
  mask: true,
  maskClosable: true,
  closable: true,
  visible: true,
  showOkBtn: true,
  showCancelBtn: true,
  maskOpacity: 0.2,
  modalClassName: 'shadow-lg',
  style: { width: 300 }
}

storiesOf('Modal', module).add('m', () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Modal visible={visible}
        onCancel={() => setVisible(false)}
        header="title"
        closable maskClosable
        okBtnProps={{ type: 'success' }}
        showCancelBtn
        shadow
      >
        <Button type="primary">ss</Button>
        朱撒东东阿东
      </Modal>
      <Button onClick={() => setVisible(true)}>show</Button>
      <Button type="info" onClick={() => Modal.show({
        title: 'title', animation: true, message: <Button type="primary">ss</Button>
      })}>show</Button>
      <Button type="danger" onClick={() => Modal.danger({ title: 'ok' })}>show</Button>
    </>
  )
})

// storiesOf('Button', module)
//   .add('default', () => <Button type="default" {...actions}>Button</Button>)
//   .add('primary large', () => <Button type="primary" size="large" {...actions}>Button</Button>)
//   .add('success', () => <Button type="success" loading {...actions}>Button</Button>)
//   .add('danger small', () => <Button type="danger" size="small" {...actions}>Button</Button>)
//   .add('info disabled', () => <Button type="info" loading disabled {...actions}>Button</Button>)
//   .add('link', () => <Button type="link" loading {...actions}>Button</Button>)
//   .add('warning', () => <Button type="info" {...actions}>Button</Button>)
