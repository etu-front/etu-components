import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import NProgress, { useNProgress } from '../components/NProgress'
import testHook from './testHook'

test('NProgress Component', () => {
  expect(NProgress.displayName).toEqual('NProgress')
  const value = testHook(() => useNProgress('https://bing.com', false, 'red'), false)
  expect(value).toMatchSnapshot()
  expect(value.props).toHaveProperty('primaryColor', 'red')
})


test('NProgress 基本', () => {
  const component = renderer.create(<NProgress loading={false} url="https://bing.com" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toBeNull()
  if (!tree) return
})

test('NProgress 基本2', () => {
  const component = renderer.create(<NProgress loading url="https://bing.com" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toBeNull()
  if (!tree) return
})
