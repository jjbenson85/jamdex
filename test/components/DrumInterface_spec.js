/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import DrumInterface from '../../src/components/interface/DrumInterface'

describe('Jamdex tests', () => {

  let wrapper

  beforeEach(done => {
    // const props = {
    //   _id: 1,
    //   name: 'Cheddar',
    //   image: 'cheddar.png',
    //   origin: 'England',
    //   user: {
    //     username: 'James'
    //   }
    // }
    const id = 0
    const handleChange = () => console.log('handleChange')
    const currentBeat= 0
    const playing = false

    const poly =[]
    for(let i=0;i<16; i++){
      const poly_beats = []
      for(let j=0;j<4; j++){
        const obj = {
          duration: '16n',
          id: 66,
          pitch: 'C3',
          poly: 17,
          step: i,
          velocity: '0',
          voice: j
        }
        poly_beats.push(obj)
      }
      poly.push({poly_beats, id: 0, step: i})
    }

    console.log('poly',poly)
    wrapper = shallow( <DrumInterface
      key={id}
      id={0}
      handleChange={handleChange}
      currentBeat={currentBeat}
      playing={playing}
      poly={poly}
    /> )
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.drum-interface').length).to.eq(1)
    // expect(wrapper.find('Link').length).to.eq(1)
    // expect(wrapper.find('.card-header').length).to.eq(1)
    // expect(wrapper.find('.card-image').length).to.eq(1)
    // expect(wrapper.find('.card-content').length).to.eq(1)
    done()
  })

  // it('should render the correct data', done => {
  //   expect(wrapper.find({ to: '/cheeses/1' }).length).to.eq(1)
  //   expect(wrapper.find('.card-header-title').text()).to.eq('Cheddar')
  //   expect(wrapper.find('figure').prop('style').backgroundImage).to.eq('url(cheddar.png)')
  //
  //   expect(wrapper.find('.card-content content').contains(<p><strong>Origin:</strong>England</p>))
  //   expect(wrapper.find('.card-content content').contains(<p><strong>Uploaded by:</strong>John</p>))
  //   // console.log(wrapper.find('.card-content content p:first-child').debug())
  //   done()
  // })
})
