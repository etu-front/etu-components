import React, { ReactNode } from 'react'
import View from './View'
import { Icon, Button } from './ui'
import { BaseProps } from './types'
import { BaseIconType } from './ui/Icon'

interface Props extends BaseProps {
  /** 自定义Icon 当使用时，会忽略其他 Icon属性 */
  icon?: ReactNode
  iconType?: BaseIconType
  iconSize?: number
  iconClassName?: string
  iconColor?: string
  title?: ReactNode
  message?: ReactNode
  /** 显示刷新按钮或刷新按钮文字 */
  hasRefresh?: boolean | string
  /** 显示后退按钮或后退按钮文字 */
  hasBack?: boolean | string
  backHandler?: Function
}

const handleReload = () => window.location.reload()


const Result: React.FC<Props> = props => {
  const {
    title, message, children,
    icon, iconType = 'warning-circle-fill', iconSize = 48, iconColor, iconClassName,
    className, hasRefresh, hasBack, backHandler
  } = props

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else if (backHandler) {
      backHandler()
    }
  }
  return (
    <View.Center className={className || 'p-t-50'}>
      {icon}
      {iconType && !icon &&
        <Icon type={iconType} size={iconSize} color={iconColor}
          className={`block m-b-10 ${iconClassName || (!iconColor ? 't-gray' : '')}`}
        />
      }
      {title && <h2 className="t-gray f20">{title}</h2>}
      <span className="f18 t-gray">{children || message}</span>
      <View row>
        {
          hasBack &&
          <Button type="link" className="m-t-20" onClick={handleBack} icon="doubleleft">
            {typeof hasBack === 'string' ? hasBack : '后退'}
          </Button>
        }
        {
          hasRefresh &&
          <Button type="link" className="m-t-20" onClick={handleReload} icon="sync">
            {typeof hasRefresh === 'string' ? hasRefresh : '刷新'}
          </Button>
        }
      </View>
    </View.Center>
  )
}
export default Result
