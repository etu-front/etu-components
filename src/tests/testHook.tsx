/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { shallow, mount } from 'enzyme'

export default function testHook(runHook: Function, flushEffects = true) {
  const HookWrapper = () => {
    const output = runHook()
    // @ts-ignore
    return <span output={output} />
  }

  const wrapper = flushEffects ? mount(<HookWrapper />) : shallow(<HookWrapper />)

  // @ts-ignore
  return wrapper.find('span').props().output
}
