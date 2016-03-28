import React from 'react'
import {createRenderer} from 'react-addons-test-utils'
import expect from 'expect'

import ClockBackground from '../ClockBackground'
import ClockMarks from '../ClockMarks'

describe('ClockBackground', () => {

  it('should render in a <g> element', () => {
    let renderer = createRenderer();
    let clockRadius = 10;
    renderer.render(<ClockBackground clockRadius={clockRadius} />)
    let result = renderer.getRenderOutput()

    expect(result.type).toBe('g');
  })

})
