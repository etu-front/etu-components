import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { DocumentTitle } from '../../utils/useTitle'
import { BaseProps } from '../types'

const Container = styled.div`
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
`
interface PageProps extends BaseProps {
  title?: string
  backgroundColor?: string
  paddingBottom?: number
  resetScroll?: boolean
}
const Page: FC<PageProps> = ({
  backgroundColor = 'white', paddingBottom, resetScroll, style, className, children, title
}) => {
  useEffect(() => {
    if (!resetScroll) return
    window.scrollTo(0, 0)
  })
  return (
    <Container style={{ ...style, backgroundColor, paddingBottom }} className={className}>
      {typeof title !== 'undefined' && <DocumentTitle title={title} />}
      {children}
    </Container>
  )
}

export default Page
