import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { BaseProps } from './types'
import _ from 'lodash'

export const Container = styled.div`
  h1 { font-size: 1.5em; }
  h2 { font-size: 1.3em; }
  h3 { font-size: 1.2em; }
  h4, h5 { font-size: 1.1em; }
  h1, h2, h3, h4 {
    line-height: 150%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    line-height: 200%;
    text-align: justify;
  }
  p:empty {
    height: 1em;
  }
  p > img + br:last-child {
    display: none;
  }
  p > img:only-child {
    margin: 0.5em 0;
    display: block;
  }
  p > img {
    margin: 0.5em 0;
  }
  img {
    max-width: 100%;
  }
  table.table-bordered {
    border-collapse: collapse;
    padding: 8px;
    width: 100%;
  }
  table.table.table-bordered th,
  table.table.table-bordered td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  ul, ol {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
    list-style-position: inside;
    padding-left: 0.5em;
  }
  ul {
    list-style-type: disc;
    ul {
      list-style-type: circle;
    }
    ul, ol {
      padding-left: 1.5em;
    }
  }
  ol {
    list-style-type: decimal;
    ul, ol {
      padding-left: 1.5em;
    }
  }
  li {
    line-height: 200%;
  }
`

interface IProps extends BaseProps {
  html?: string
  scriptClassName?: string
  /** 图片点击预览 */
  imagePreview?: boolean
  /** 是否执行script */
  evalScript?: boolean
  /** 是否执行style */
  useStyle?: boolean
}
const HtmlContent: FC<IProps> = props => {
  const {
    className,
    style,
    html = '',
    useStyle = true,
    evalScript = true,
    scriptClassName = 'MagnetScript',
    imagePreview = true
  } = props
  const contentRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!html) return

    // 执行脚本
    if (evalScript) {
      const doms = document.querySelectorAll(`.${scriptClassName}`)
      if (doms.length > 0) {
        doms.forEach(dom => {
          const script = dom.innerHTML
          if (!script) return
          try {
            // eslint-disable-next-line no-eval
            window.eval(script)
          } catch {
            //
          }
        })
      }
    }

    if (!imagePreview) return
    // 绑定图片点击事件
    const imageTags = contentRef.current?.getElementsByTagName('img')
    if (!imageTags?.length) return
    _.filter(imageTags, image => {
      if (!image.src || image.src.endsWith('.svg')) return false
      if (_.get(image.parentNode, 'tagName') === 'A') return false
      if (_.get(image.parentNode, 'parentNode.tagName') === 'A') return false
      return true
    }).map((image, index) => {
      image.setAttribute('data-index', index.toString())
      image.classList.add('has-preview')
      return { url: image.src, image }
    })
  }, [])
  const Comp = useStyle ? Container : 'div'
  return <Comp ref={contentRef} className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
}
export default HtmlContent
