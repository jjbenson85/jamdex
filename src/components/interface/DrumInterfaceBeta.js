import React from 'react'

import noteRangeLookup from '../../lib/noteRangeLookup'

import RangeInputs from './RangeInputs'

class DrumInterfaceBeta extends React.Component{
  constructor(){
    super()
    this.state={
      display: 'pitch'
    }
  }
  render(){
    const { id, currentBeat, currentPitch, currentVelocity, playing, handleChange, beats } = this.props
    const {display} = this.state
    // console.log(beats)
    return (
      <div className="interfaceBeta">
        <div className="column">
          <div className="pitch-display" onClick={()=>this.setState({display: 'pitch'})} >
            Pitch <span>{currentPitch}</span>
          </div>
          <div className="pitch-display" onClick={()=>this.setState({display: 'velocity'})} >
            Velocity <span>{currentVelocity}</span>
          </div>
        </div>
        {display==='pitch' && <RangeInputs
          currentBeat={currentBeat}
          playing={playing}
          handleChange={(e, i) => handleChange(e, i, id, 'pitch')}
          rangeMin="0"
          rangeMax="7"
          values={beats.map(note=> noteRangeLookup.indexOf(note.pitch))}
        />}
        {display==='velocity' && <RangeInputs
          currentBeat={currentBeat}
          playing={playing}
          handleChange={(e, i) => handleChange(e, i, id, 'velocity')}
          rangeMin="0"
          rangeMax="127"
          values={beats.map(note => note.velocity)}
        />}
      </div>
    )
  }
}

export default DrumInterfaceBeta
