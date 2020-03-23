import React, { FC } from 'react'
import classnames from 'classnames'
import { createGlobalStyle, CSSProperties } from 'styled-components'
import { BaseProps } from '../types'

const ICON_FONT_URL = '//at.alicdn.com/t/font_1546788_h7ko9ep4tde.js'

export type BaseIconType =
  "ellipsis" | "info" | "exclaimination" | "doubleright" | "doubleleft" | "down" | "up" | "left" | "right" |
  "up-circle" | "right-circle" | "play-circle" | "plus-circle" | "minus-circle" | "down-circle" | "left-circle" |
  "loading" | "warning-circle-fill" | "question-circle-fill" | "info-circle-fill" | "close-circle-fill" |
  "check-circle-fill" | "check" | "reload" | "sync" | "warning-circle" | "question-circle" | "info-circle" |
  "close-circle" | "check-circle" | string

const GloablStyle = createGlobalStyle`
  .icon {
    display: inline-block;
    font-size: inherit;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .icon svg, .icon img{
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon.spin {
    animation: rotate infinite 1000ms linear;
  }

  @keyframes rotate {
    0% { transform: rotate(0);}
    100% { transform: rotate(356.4deg);}
  }
`
interface IconProps extends BaseProps {
  prefix?: string
  /** 图片地址 */
  src?: string
  type?: string
  /** 尺寸 */
  size?: number
  /** 颜色 */
  color?: string
  /** 是否旋转 */
  spin?: boolean
}

const IconComponent: FC<IconProps> = ({
  className, type, prefix = 'icon', src,
  size, color, spin, children, ...rest
}) => {
  let main = null
  if (children) {
    main = children
  } else if (src) {
    main = <img src={src} alt="图标" />
  } else {
    main = (
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${prefix}-${type}`} />
      </svg>
    )
  }
  const style: CSSProperties = {
    ...rest.style
  }
  if (color) {
    style.color = color
  }
  if (size && size > 48) {
    style.fontSize = size
  }
  return (
    <React.Fragment>
      <GloablStyle />
      <i className={classnames('icon', className, { spin }, size && size <= 48 ? `f${size}` : 0)}
        {...rest} style={style}>
        {main}
      </i>
    </React.Fragment>
  )
}

const customCache = new Set<string>()

export interface CustomIconOptions {
  scriptUrl: string
  prefix: string
}

export function createFromIconfont<T = { type?: BaseIconType }>(options: CustomIconOptions) {
  const { scriptUrl, prefix } = options
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script')
    script.setAttribute('src', scriptUrl)
    script.setAttribute('data-namespace', scriptUrl)
    customCache.add(scriptUrl)
    document.body.appendChild(script)
  }

  const IconFont: FC<IconProps & T> = props => <IconComponent prefix={prefix} {...props} />
  IconFont.displayName = 'Iconfont'
  return IconFont
}

const Icon: FC<IconProps & { type?: BaseIconType }> =
  createFromIconfont({ scriptUrl: ICON_FONT_URL, prefix: 'icon' })
export default Icon
