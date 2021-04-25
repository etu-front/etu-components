import React from 'react'
// import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { ButtonProps } from '../components/ui/Button'

const actions = { onClick: action('onClick Button') }

export default {
  title: 'Button',
  component: Button,
  loading: {
    description: '加载状态'
  }
}

const Template = (args: any) => <Button {...args} />

type Component = typeof Template & { args?: ButtonProps }

export const Default: Component = Template.bind({})
Default.args = {
  type: 'default',
  children: '按钮文字',
  onClick: actions.onClick
}

// storiesOf('Button', module)
//   .add('default', () => <Button type="default" {...actions}>Button</Button>)
//   .add('primary large', () => <Button type="primary" size="large" {...actions}>Button</Button>)
//   .add('success', () => <Button type="success" loading {...actions}>Button</Button>)
//   .add('danger small', () => <Button type="danger" size="small" {...actions}>Button</Button>)
//   .add('info disabled', () => <Button type="info" loading disabled {...actions}>Button</Button>)
//   .add('link', () => <Button type="link" loading {...actions}>Button</Button>)
//   .add('warning', () => <Button type="info" {...actions}>Button</Button>)
