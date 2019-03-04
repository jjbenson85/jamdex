import React from 'react'

import noteRangeLookup from '../../lib/noteRangeLookup'
import '../../scss/components/InterfaceBeta.scss'


import RangeInputs from './RangeInputs'

class InterfaceBeta extends React.Component{
  constructor(){
    super()
    this.state={
      display: 'pitch',
      settings: {
        preset: 0
      }
    }
    this.incPreset = this.incPreset.bind(this)
    this.decPreset = this.decPreset.bind(this)
  }
  incPreset(){
    let preset=this.state.settings.preset
    preset++
    console.log('inc', preset )
    this.setState({settings: {preset,update: true } })

    // this.setState({settings: {preset}, update: true})
  }
  decPreset(){
    console.log('dec')
    let preset=this.state.settings.preset
    preset--
    this.setState({settings: {preset,update: true } })

  }
  componentDidUpdate(){
    if(this.state.settings.update){
      const preset=this.state.settings.preset
      this.setState({settings: {preset, update: false}})
      this.props.updateSettings(this.state.settings)
    }

  }
  render(){
    const { id, currentBeat, currentPitch, currentVelocity, playing, handleChange, beats } = this.props
    const {display} = this.state
    return (
      <div className="interfaceBeta">
        <div className="synth-case">
          <div className="synth-preset">
            <h3>PRESET</h3>
            <div className="synthSkin">
              <button onClick={this.incPreset}><span>{'>'}</span></button>
              <div>{this.state.settings.preset}</div>
              <button onClick={this.decPreset}><span>{'<'}</span></button>
            </div>
          </div>
          <div className="controller">
            <div className="column">
              <div
                className={`pitch-display ${this.state.display === 'pitch' ? 'selected':''}`}
                onClick={()=>this.setState({display: 'pitch'})}
              >
                <h3>Pitch</h3> <span>{currentPitch}</span>
              </div>
              <div
                className={`pitch-display ${this.state.display === 'velocity' ? 'selected':''}`}
                onClick={()=>this.setState({display: 'velocity'})}
              >
                <h3>Velocity</h3> <span>{currentVelocity}</span>
              </div>
            </div>
            {display==='pitch' && <RangeInputs
              currentBeat={currentBeat}
              playing={playing}
              // handleChange={(e, i) => handleChange(e, i, id, 'pitch')}
              handleChange={(e, i) =>
                handleChange('MonoSynth', id, i, 0, 'pitch', e.target.value)}
              rangeMin="0"
              rangeMax="35"
              values={beats.map(note=> noteRangeLookup.indexOf(note.pitch))}
            />}
            {display==='velocity' && <RangeInputs
              currentBeat={currentBeat}
              playing={playing}
              handleChange={(e, i) =>
                handleChange('MonoSynth', id, i, 0, 'velocity', e.target.value)}
              rangeMin="0"
              rangeMax="127"
              values={beats.map(note => note.velocity)}
            />}
          </div>
        </div>
      </div>
    )
  }
}

export default InterfaceBeta
