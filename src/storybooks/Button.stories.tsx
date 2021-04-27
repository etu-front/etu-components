import React from 'react'
// import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { ButtonProps } from '../components/ui/Button'
import View from '../components/View'

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
  const args = { ...props, disabled: props.loading || props.disabled }
  console.log(args)
  return (
    <View>
      <View row justify="space-between" width={550}>
        <Button >按钮</Button>
        <Button {...args} type="primary">按钮</Button>
        <Button {...args} type="success" >按钮</Button>
        <Button {...args} type="info" >按钮</Button>
        <Button {...args} type="danger" >按钮</Button>
        <Button {...args} type="outline" >按钮</Button>
        <Button {...args} type="link" >按钮</Button>
      </View>
    </View>
  )
}
export const Dashboard = DashboardTemplate.bind({})
Dashboard.args = {
  disabled: true
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

