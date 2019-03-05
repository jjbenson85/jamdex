/* global describe, it, before, after, beforeEach */
import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { MemoryRouter, Route} from 'react-router-dom'
import Jamdex from '../../src/components/Jamdex'
import JamdexData from './Jamdex-data'

// console.log(JamdexData)

describe('Jamdex tests', () => {
  let wrapper, response

  before(done => {
    response = Promise.resolve({
      data: JamdexData
      // data: null
    })

    sinon.stub(axios, 'get').returns(response)
    done()
  })

  after(done => {
    axios.get.restore()
    done()
  })

  beforeEach(done => {
    wrapper = mount(<Jamdex />
      // <MemoryRouter initialEntries={['/cheeses/1']}>
      //   <Route path="/jamdex" component={Jamdex} />
      // </MemoryRouter>
    )
    done()
  })

  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      // console.log(wrapper.find('div').length)
      expect(wrapper.find('section').length).to.eq(1)
      done()
      // expect(wrapper.find('.section .container h1.title').text()).to.eq('Cheddar')
      // expect(wrapper.find('.section .container h2.subtitle').text()).to.eq('England')
      //
      // // console.log(wrapper.find('figure.image img').debug())
      //
      // expect(wrapper.find('figure.image img').prop('src')).to.eq('cheddar.png')
      // // expect(wrapper.find('figure.image img').prop('src')).to.eq('cheddar.png')
      // expect(wrapper.find('div.column:last-child').contains(<p>Bland, very bland</p>)).to.be.true

    })
  })
})
