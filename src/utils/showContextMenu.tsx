import React from 'react'
import ReactDOM from 'react-dom'

const showContextMenu = (options: {
  target: HTMLElement
  x: number
  y: number
  component: React.ReactNode
  className?: string
  offset?: number
}) => {
  const { target, className = '', offset = 1 } = options

  const dom = document.createElement('div')
  dom.style.position = 'fixed'
  dom.className = className
  dom.style.visibility = 'hidden'
  dom.style['z-index'] = 999
  document.body.append(dom)
  ReactDOM.render(<span>{options.component}</span>, dom)

  let x = options.x + offset
  let y = options.y + offset

  const rect = target.getBoundingClientRect()

  if (options.x + offset + dom.offsetWidth > rect.left + rect.width) {
    x = Math.max(0, options.x - dom.offsetWidth - offset)
  }
  if (options.y + offset + dom.offsetHeight > rect.top + rect.height) {
    y = Math.max(0, options.y - dom.offsetHeight - offset)
  }

  dom.style.left = `${x}px`
  dom.style.top = `${y}px`
  dom.style.visibility = 'visible'

  let timer = 0

  const clearTimer = () => window.clearTimeout(timer)

  const destory = () => {
    clearTimeout(timer)
    dom.removeEventListener('mouseenter', clearTimer)
    dom.removeEventListener('mouseleave', destory)
    ReactDOM.unmountComponentAtNode(dom)
    dom.remove()
  }

  const startTimer = () => window.setTimeout(destory, 1000)

  timer = startTimer()
  dom.addEventListener('mouseenter', clearTimer)
  dom.addEventListener('mouseleave', destory)

  return destory
}

export default showContextMenu
