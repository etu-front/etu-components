import React, { FC, ReactNode } from 'react'
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
  color: ${props => props.theme.primaryColor};
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
    color: ${props => props.theme.primaryColor};
    background-color: #fff;
    border-color: ${props => props.theme.primaryColor};
  }

  &:disabled {
    cursor: not-allowed;
    color: #bbb;
    &.btn-link {
      color: #bbbbbb !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
  }
  &.btn-outline {
    &:hover {
        color: ${props => lighten(props.theme.primaryColor, 0.1)};
        background-color: #fff;
        border-color: ${props => lighten(props.theme.primaryColor, 0.1)};
      }
    &:disabled {
      color: #bbb;
      border-color: #bbb;
    }
  }

  &.btn-primary {
    color: #fff;
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
    &:hover {
      background-color: ${props => lighten(props.theme.primaryColor, 0.1)};
      border-color: ${props => lighten(props.theme.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => lighten(props.theme.primaryColor, 0.2)} !important;
      border-color: ${props => lighten(props.theme.primaryColor, 0.2)} !important;
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: ${props => props.theme.dangerColor};
    border-color: ${props => props.theme.dangerColor};
    &:hover {
      background-color: ${props => lighten(props.theme.dangerColor, 0.1)};
      border-color: ${props => lighten(props.theme.dangerColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => lighten(props.theme.dangerColor, 0.2)} !important;
      border-color: ${props => lighten(props.theme.dangerColor, 0.2)} !important;
    }
  }
  &.btn-success {
    color: #fff;
    background-color: ${props => props.theme.successColor};
    border-color: ${props => props.theme.successColor};
    &:hover {
      background-color: ${props => lighten(props.theme.successColor, 0.1)};
      border-color: ${props => lighten(props.theme.successColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => lighten(props.theme.successColor, 0.2)} !important;
      border-color: ${props => lighten(props.theme.successColor, 0.2)} !important;
    }
  }
  &.btn-info {
    color: #fff;
    background-color: ${props => props.theme.infoColor};
    border-color: ${props => props.theme.infoColor};
    &:hover {
      background-color: ${props => lighten(props.theme.infoColor, 0.1)};
      border-color: ${props => lighten(props.theme.infoColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => lighten(props.theme.infoColor, 0.2)} !important;
      border-color: ${props => lighten(props.theme.infoColor, 0.2)} !important;
    }
  }
  &.btn-link {
    color: ${props => props.theme.primaryColor};
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: ${props => lighten(props.theme.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: transparent;
      border-color: transparent;
    }
  }
  > i.icon {
    display: inline-block;
    line-height: 1;
  }
  > i.icon + span {
    margin-left: 6px;
  }
  &.btn-no-border { border-color: transparent !important; }
`
export type ButtonSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
export type ButtonType = 'primary' | 'default' | 'danger' | 'success' | 'link' | 'info' | 'outline'

export interface ButtonProps extends BaseProps {
  htmlType?: 'submit' | 'reset' | 'button'
  border?: boolean
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  block?: boolean
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
    border = true,
    className = '',
    htmlType = 'button',
    type = 'default',
    size = 'default',
    icon,
    loading,
    loadingText,
    shape = 'round',
    ...rest
  } = props

  const classNames = [
    className,
    type !== 'default' ? `btn-${type}` : '',
    size !== 'default' ? `btn-${size}` : '',
    shape !== 'round' ? `btn-${shape}` : '',
    block ? 'btn-block' : '',
    !border ? 'btn-no-border' : ''
  ].filter(Boolean).join(' ')

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
