import React from 'react'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer'
import 'jest-styled-components'
import { configure, mount } from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'

configure({ adapter: new Adapter() })

import ClampText from '../components/ClampText'

test('ClampText Renders and Click', () => {
  const mMock = jest.fn().mockImplementationOnce(() => 'first').mockImplementationOnce(() => 'two')

  const w = mount(<ClampText max={2} onClick={mMock} />)
  expect(w.find('div')).not.toBeNull()
  w.simulate('click')
  expect(mMock.mock.calls[0][0]).toBeTruthy()
  expect(mMock.mock.calls[0][0].target.tagName).toBe('DIV')
  expect(mMock()).toBe('two')
})

test('ClampText Component', () => {
  expect(ClampText.displayName).toEqual('ClampText')
})

test('ClampText 基本', () => {
  const component = renderer.create(<ClampText>hello</ClampText>)
  const tree = component.toJSON() as ReactTestRendererJSON
  expect(tree).not.toBeNull()
  expect(tree).toMatchSnapshot()
  if (!tree) return
  const { props } = tree
  expect(props).toHaveProperty('max', 1)
  expect(props.style).toBeUndefined()
  expect(props.title).toBeUndefined()
  expect(tree.children).toEqual(['hello'])
})

test('ClampText 复杂', () => {
  const component = renderer.create(
    <ClampText max={2} text="title" className="cls" style={{ lineHeight: 2 }}>hello</ClampText>
  )
  const tree = component.toJSON() as ReactTestRendererJSON
  expect(tree).not.toBeNull()
  expect(tree).toMatchSnapshot()
  if (!tree) return
  const { props } = tree
  expect(props).toHaveProperty('max', 2)
  expect(tree).toHaveStyleRule('line-clamp', '2')
  expect(props).toHaveProperty('title', 'title')
  expect(props.className).toContain('cls')
  expect(props.style).toHaveProperty('lineHeight', 2)
  expect(tree.children).toEqual(['hello'])
})

test('ClampText 标题', () => {
  const component = renderer.create(<ClampText max={3} text="title and children text" />)
  const tree = component.toJSON() as ReactTestRendererJSON
  expect(tree).not.toBeNull()
  expect(tree).toMatchSnapshot()
  if (!tree) return
  const { props } = tree
  expect(tree).toHaveStyleRule('line-clamp', '3')
  expect(props).toHaveProperty('max', 3)
  expect(props).toHaveProperty('title', 'title and children text')
  expect(tree.children).toEqual(['title and children text'])
})


