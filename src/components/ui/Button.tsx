import React, { FC, ReactNode } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import Icon, { BaseIconType } from './Icon'
import { lighten } from '../../utils/color'
import { BaseProps } from '../types'

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
  color: ${THEME.primaryColor};
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
  &.btn-outline, &:focus, &:hover {
    color: ${THEME.primaryColor};
    background-color: #fff;
    border-color: ${THEME.primaryColor};
  }

  &:disabled {
    cursor: not-allowed;
    color: #ffffffcc !important;
    background-color: #f9f9f9 !important;
    border-color: #f9f9f9 !important;
    &.btn-link {
      color: #bbbbbb !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
  }

  &.btn-primary {
    color: #fff;
    background-color: ${THEME.primaryColor};
    border-color: ${THEME.primaryColor};
    &:hover {
      background-color: ${lighten(THEME.primaryColor, 0.1)};
      border-color: ${lighten(THEME.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: ${lighten(THEME.primaryColor, 0.2)} !important;
      border-color: ${lighten(THEME.primaryColor, 0.2)} !important;
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: ${THEME.dangerColor};
    border-color: ${THEME.dangerColor};
    &:hover {
      background-color: ${lighten(THEME.dangerColor, 0.1)};
      border-color: ${lighten(THEME.dangerColor, 0.1)};
    }
    &:disabled {
      color: #fff;
      background-color: ${lighten(THEME.dangerColor, 0.2)} !important;
      border-color: ${lighten(THEME.dangerColor, 0.2)} !important;
    }
  }
  &.btn-success {
    color: #fff;
    background-color: ${THEME.successColor};
    border-color: ${THEME.successColor};
    &:hover {
      background-color: ${lighten(THEME.successColor, 0.1)};
      border-color: ${lighten(THEME.successColor, 0.1)};
    }
  }
  &.btn-info {
    color: #fff;
    background-color: ${THEME.infoColor};
    border-color: ${THEME.infoColor};
    &:hover {
      background-color: ${lighten(THEME.infoColor, 0.1)};
      border-color: ${lighten(THEME.infoColor, 0.1)};
    }
  }
  &.btn-link {
    color: ${THEME.primaryColor};
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: ${lighten(THEME.primaryColor, 0.1)};
    }
  }
  > i.icon {
    display: inline-block;
    line-height: 1;
  }
  > i.icon + span {
    margin-left: 6px;
  }
`
export type ButtonSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
export type ButtonType = 'primary' | 'default' | 'danger' | 'success' | 'link' | 'info'

export interface ButtonProps extends BaseProps {
  htmlType?: 'submit' | 'reset' | 'button'
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  block?: boolean
  icon?: string | BaseIconType | ReactNode
  loading?: boolean
  loadingText?: ReactNode
  shape?: 'round' | 'square' | 'circle'
}

const Button: FC<ButtonProps> = props => {
  const {
    children,
    block,
    className = '',
    htmlType = 'button',
    type = 'default',
    size = 'default',
    icon,
    loading,
    loadingText,
    shape,
    ...rest
  } = props

  const getClassName = classnames(className, {
    [`btn-${type}`]: type !== 'default',
    [`btn-${size}`]: size !== 'default',
    'btn-block': block,
    'round-circle': shape === 'circle',
    'round-0': shape === 'square'
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
    <Container className={getClassName} type={htmlType} disabled={loading} {...rest}>
      {getIcon()}<span>{loading ? (loadingText || children) : children}</span>
    </Container>
  )
}

export default Button
