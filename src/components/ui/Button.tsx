import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Icon, { BaseIconType } from './Icon'
import { BaseProps } from '../types'
import classnames from 'classnames'

const Container = styled.button`
  border-radius: 4px;
  font-size: 14px;
  padding: 0 15px;
  height: 36px;
  line-height: 1.5;
  border: 1px solid #d9d9d9;
  font-weight: 400;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.12);

  &.btn-circle { border-radius: 50%; }
  &.btn-square { border-radius: 0; }
  &.btn-pill { border-radius: 500px; }

  &.btn-block {
    display: block;
    width: 100%;
  }

  &.btn-xsmall {
    height: 21px;
    padding: 0 5px;
    font-size: 12px;
  }
  &.btn-small {
    height: 24px;
    font-size: 14px;
    padding: 0 10px;
  }
  &.btn-large {
    height: 42px;
    padding: 0 20px;
    font-size: 16px;
  }
  &.btn-xlarge {
    height: 48px;
    padding: 0 24px;
    font-size: 18px;
  }

  &:focus, &:hover {
    filter: brightness(1.1);
  }
  &:disabled {
    filter: brightness(0.9);
    cursor: not-allowed;
    color: #bbb;
  }
  &, &.btn-default {
    color: #474747;
  }
  &.btn-default {
    background-color: white;
    border: 1px solid #d9d9d9;
  }
  &.btn-primary {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    &.outline {
      color: var(--warning-color);
      border-color: var(--warning-color);
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: var(--danger-color);
    border-color: var(--danger-color);
    &.outline {
      color: var(--danger-color);
      border-color: var(--danger-color);
    }
  }
  &.btn-success {
    color: #fff;
    background-color: var(--success-color);
    border-color: var(--success-color);
    &.outline {
      color: var(--success-color);
      border-color: var(--success-color);
    }
  }
  &.btn-info {
    color: #fff;
    background-color: var(--info-color);
    border-color: var(--info-color);
    &.outline {
      color: var(--info-color);
      border-color: var(--info-color);
    }
  }
  &.btn-warning {
    color: #fff;
    background-color: var(--warning-color);
    border-color: var(--warning-color);
    &.outline {
      color: var(--warning-color);
      border-color: var(--warning-color);
    }
  }
  &.btn-link {
    color: var(--primary-color);
    background-color: transparent;
    border-color: transparent;
  }

  > i.icon {
    display: inline-block;
    line-height: 1;
  }
  > i.icon + span {
    margin-left: 6px;
  }
  &.dashed {border-style: dashed;}
  &.outline { background-color: transparent;}
  &.btn-no-border { border-width: 0; }
`

export type ButtonSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
export type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'success' | 'link' | 'info'

export interface ButtonProps extends BaseProps {
  htmlType?: 'submit' | 'reset' | 'button'
  border?: boolean
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  block?: boolean
  dashed?: boolean
  outline?: boolean
  icon?: string | BaseIconType | ReactNode
  /** 加载状态 */
  loading?: boolean
  loadingText?: ReactNode
  shape?: 'round' | 'square' | 'circle' | 'pill'
}

const Button: FC<ButtonProps> = props => {
  const {
    children,
    block,
    dashed,
    outline,
    border = true,
    className = '',
    htmlType = 'button',
    type = 'default',
    size = 'default',
    shape = 'round',
    icon,
    loading,
    loadingText,
    ...rest
  } = props

  const classNames = classnames(className, [`btn-${type}`], {
    [`btn-${size}`]: size !== 'default',
    [`btn-${shape}`]: shape !== 'round',
    outline: outline || dashed,
    ['btn-block']: block,
    dashed,
    'btn-no-border': !border
  })

  const getIcon = () => {
    if (loading) return <Icon type="loading" spin className="t-muted" />
    if (!icon) return null
    if (typeof icon === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return <Icon type={icon} />
    }
    return <i className="icon">{icon}</i>
  }
  return (
    <Container className={classNames} type={htmlType} disabled={loading} {...rest}>
      {getIcon()}<span>{loading ? (loadingText || children) : children}</span>
    </Container>
  )
}

export default Button
