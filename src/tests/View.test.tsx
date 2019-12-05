import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import View from '../components/View'

describe('View test', () => {
  it('View Component', () => {
    expect(View.displayName).toEqual('View')
    expect(View.Center.displayName).toEqual('View.Center')
  })

  it('View 基本', () => {
    const component = renderer.create(<View column>hello</View>)
    const tree = component.toJSON()
    expect(tree).not.toBeNull()
    if (!tree) return
    expect(tree).toHaveStyleRule('align-items', 'stretch')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
    expect(tree.props.style).toEqual({ "flexDirection": "column" })
    expect(tree.props.className).toContain(' ')
    expect(tree.children).toEqual(['hello'])
    expect(tree).toMatchSnapshot()
  })

  it('View 复杂样式', () => {
    const jsx = (
      <View
        row
        align={'flex-end'}
        flex={1}
        width={200}
        height={100}
        wrap
        justify={'stretch'}
        background={'red'}
        color={'white'}
        radius={5}
        style={{ lineHeight: '24px' }}
      >
        good
      </View>
    )
    const component = renderer.create(jsx)
    const tree = component.toJSON()
    expect(tree).not.toBeNull()
    if (!tree) return
    expect(tree.children).toEqual(['good'])
    const { style } = tree.props
    expect(style).toHaveProperty('flexDirection', 'row')
    expect(style).toHaveProperty('alignItems', 'flex-end')
    expect(style).toHaveProperty('flexWrap', 'wrap')
    expect(style).toHaveProperty('justifyContent', 'stretch')
    expect(style).toHaveProperty('flex', 1)
    expect(style).toHaveProperty('width', 200)
    expect(style).toHaveProperty('height', 100)
    expect(style).toHaveProperty('background', 'red')
    expect(style).toHaveProperty('color', 'white')
    expect(style).toHaveProperty('borderRadius', 5)
    expect(style).toHaveProperty('lineHeight', '24px')
    expect(tree).toMatchSnapshot()
  })

  it('View 样式', () => {
    const tree = renderer.create(
      <View wrap row style={{ margin: '0 -10px' }}>
        <View height={100} flex={1} background="red" />
        <View height={100} flex={1} background="green" />
        <View height={100} flex={1} background="blue" />
      </View>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    const { style } = tree!.props
    expect(style).toHaveProperty('flexWrap', 'wrap')
    expect(style).toHaveProperty('flexDirection', 'row')
    expect(style).toHaveProperty('margin', '0 -10px')
  })

  it('View.Center 居中', () => {
    const tree = renderer.create(<View.Center height={200}>Hello</View.Center>).toJSON()
    expect(tree).not.toBeNull()
    if (!tree) return

    expect(tree).toMatchSnapshot()
    const { style } = tree.props
    expect(style).toHaveProperty('alignItems', 'center')
    expect(style).toHaveProperty('height', 200)
    expect(style).toHaveProperty('justifyContent', 'center')
  })
})
