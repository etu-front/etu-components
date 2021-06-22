import React from 'react'
// import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { ButtonProps } from '../components/ui/Button'
import View from '../components/View'
import './theme.css'

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

const DashboardTemplate = (props: ButtonProps) => {
  const args = { ...props, disabled: props.loading || props.disabled, loadingText: '加载中' }
  return (
    <View>
      <View row justify="space-between" wrap>
        <Button  {...args}>按钮</Button>
        <Button  {...args} type="default">default</Button>
        <Button {...args} type="primary">primary</Button>
        <Button {...args} type="success" >success</Button>
        <Button {...args} type="info" >info</Button>
        <Button {...args} type="warning" >warning</Button>
        <Button {...args} type="danger" >danger</Button>
        <Button {...args} type="link" >link</Button>
      </View>
    </View>
  )
}
export const Dashboard = DashboardTemplate.bind({})
Dashboard.args = {
  disabled: false
}
// storiesOf('Button', module)
//   .add('empty', () => <Button>Button</Button>)
//   .add('default', () => <Button type="default" {...actions}>Button</Button>)
//   .add('primary large', () => <Button type="primary" size="large" {...actions}>Button</Button>)
//   .add('success', () => <Button type="success" {...actions}>Button</Button>)
//   .add('danger small', () => <Button type="danger" size="small" {...actions}>Button</Button>)
//   .add('info disabled', () => <Button type="info" loading disabled {...actions}>Button</Button>)
//   .add('link', () => <Button type="link" loading {...actions}>Button</Button>)
//   .add('outline', () => <Button type="outline" {...actions}>Button</Button>)

