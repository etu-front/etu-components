import React, { FC } from 'react'
import classnames from 'classnames'
import { createGlobalStyle, CSSProperties } from 'styled-components'
import { BaseProps } from '../types'

// iconfont project url: https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1546788
/**
parse icon code from the page
剪贴下边代码到 iconfont 页面 控制台， 可复制出 BaseIconType 类型定义

var icons = []
document.querySelectorAll('.block-icon-list .icon-code-show').forEach(v => icons.push(v))
copy(icons.map(v => JSON.stringify(v.innerText.slice(5))).join(" | "))

*/
const ICON_FONT_URL = '//at.alicdn.com/t/font_1546788_m5cma3v1qh.js'

export type BaseIconType =
  "appstore" | "rocket" | "heart" | "star" | "unorderedlist" | "pause" | "heart-fill" | "lock-fill" | "star-fill" |
  "caret-down" | "backward" | "caret-up" | "caret-right" | "caret-left" | "forward" | "step-backward" | "step-forward" |
  "plus" | "setting" | "user" | "team" | "setting-fill" | "appstoreadd" | "search" | "close" | "wechat" | "alipay" |
  "left-circle" | "down-circle" | "minus-circle" | "plus-circle" | "play-circle" | "right-circle" | "up-circle" |
  "right" | "left" | "up" | "down" | "doubleleft" | "doubleright" | "exclaimination" | "info" | "ellipsis" |
  "check-circle" | "close-circle" | "info-circle" | "question-circle" | "warning-circle" | "sync" | "reload" |
  "check" | "check-circle-fill" | "close-circle-fill" | "info-circle-fill" | "question-circle-fill" |
  "warning-circle-fill" | "loading"

const GloablStyle = createGlobalStyle`
  .icon {
    display: inline-block;
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
  type?: BaseIconType | string
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
