/* global describe, it, before, after, beforeEach */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Cassette from '../../src/components/Cassette'


describe('Cassette tests', () => {
  let wrapper

  beforeEach(done => {
    wrapper = mount(<Cassette />
    )
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.cassette-wrap').length).to.eq(1)
    done()
  })
})
