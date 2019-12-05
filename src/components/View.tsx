import React, { FC, CSSProperties } from 'react'
import styled from 'styled-components'
import { BaseProps } from './types'


const Container = styled.div`
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
`

type Align = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'space-between' | 'space-around'

interface IProps extends BaseProps {
  flex?: number | string
  align?: Align
  justify?: Align
  row?: boolean
  column?: boolean
  wrap?: boolean
  radius?: number | string
  height?: number | string
  background?: string
  color?: string
  width?: number | string
}

type ViewComponent = FC<IProps>

const View: ViewComponent & { Center: ViewComponent } = props => {
  const {
    className = '',
    children,
    align,
    justify,
    column = false,
    wrap = false,
    row = false,
    radius,
    height,
    background,
    color,
    flex,
    width,
    style,
    ...rest
  } = props

  let customStyle: CSSProperties = {}

  if (row) {
    customStyle.flexDirection = 'row'
    customStyle.alignItems = 'flex-start'
  }

  if (column) {
    customStyle.flexDirection = 'column'
  }

  if (align) {
    customStyle.alignItems = align
  }

  if (justify) {
    customStyle.justifyContent = justify
  }

  if (wrap) {
    customStyle.flexWrap = 'wrap'
  }

  if (flex) {
    customStyle.flex = flex
  }

  if (typeof width !== 'undefined') {
    customStyle.width = width
  }

  if (typeof height !== 'undefined') {
    customStyle.height = height
  }

  if (background) {
    customStyle.background = background
  }

  if (typeof color !== 'undefined') {
    customStyle.color = color
  }

  if (typeof radius !== 'undefined') {
    customStyle.borderRadius = radius
  }

  if (style) {
    customStyle = { ...customStyle, ...style }
  }

  return (
    <Container className={className} style={Object.keys(customStyle).length ? customStyle : undefined} {...rest}>
      {children}
    </Container>
  )
}
View.displayName = 'View'

View.Center = ({ children, ...rest }) => <View {...rest} align="center" justify="center">{children}</View>
View.Center.displayName = 'View.Center'

export default View
