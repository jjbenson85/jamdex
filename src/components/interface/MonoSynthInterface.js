import React from 'react'

import noteRangeLookup from '../../lib/noteRangeLookup'
import '../../scss/components/MonoSynthInterface.scss'


import RangeInputs from './RangeInputs'

class MonoSynthInterface extends React.Component{
  constructor(){
    super()
    this.state={
      display: 'pitch',
      settings: {
        update: false,
        oscillator: {
          type: 'sawtooth'
        },
        envelope: {
          attack: 0.01,
          decay: 1,
          sustain: 0.5,
          release: 1
        },
        filterEnvelope: {
          attack: 0.01 ,
          decay: 0.1 ,
          sustain: 0.5 ,
          release: 1 ,
          baseFrequency: 100 ,
          octaves: 7 ,
          exponent: 1
        },
        filter: {
          Q: 1,
          type: 'lowpass',
          rolloff: -12
        }
      }
    }
    this.changeSettings = this.changeSettings.bind(this)
  }

  changeSettings(e){
    const {name, value} = e.target
    const settings = this.state.settings
    const splitName = name.split('.')
    const mod = splitName[0]
    const cntrl = splitName[1]
    settings[mod][cntrl] = value
    settings.update = true
    this.setState({settings: {...settings}})

  }

  componentDidUpdate(){
    if(this.state.settings.update){
      const settings=this.state.settings
      this.setState({settings: {...settings, update: false}})
      this.props.updateSettings(this.state.settings)
    }
  }

  render(){
    const { id, currentBeat, currentPitch, currentVelocity, playing, handleChange, beats } = this.props
    const {display} = this.state
    return (
      <div className="MonoSynthInterface">
        <div className="synth-case">
          <div className="panels">
            <div className="top-strip">
              <div className="mono-synth-logo">MonoSynth</div>
              <div className="synth-controls oscillators">
                <div className='labels'>
                  Oscillator
                </div>
                <div className='radios'>
                  <div className='row'>
                    <input
                      type="radio"
                      name="oscillator.type"
                      value='sawtooth'
                      id='sawtooth'
                      onChange={this.changeSettings}
                    />
                    <label htmlFor="sawtooth">◉
                    </label>
                    <div>sawtooth</div>
                  </div>

                  <div className='row'>
                    <input
                      type="radio"
                      name="oscillator.type"
                      value='square'
                      id='square'
                      onChange={this.changeSettings}
                    />
                    <label htmlFor="square">◉
                    </label>
                    <div>square</div>
                  </div>
                  <div className='row'>
                    <input
                      type="radio"
                      name="oscillator.type"
                      value="pwm"
                      id="pwm"
                      onChange={this.changeSettings}
                    />
                    <label htmlFor="pwm">◉
                    </label>
                    <div>pwm</div>
                  </div>
                </div>
              </div>
              <div className="synth-controls amp-envelope">
                <div className='labels'>
                  Amp Envelope
                </div>
                <div className='inputs'>
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope.attack"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.state.settings.envelope.attack}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope.decay"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.state.settings.envelope.decay}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope.sustain"
                    min={0}
                    max={1}
                    step="0.01"
                    value={this.state.settings.envelope.sustain}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope.release"
                    min={0.01}
                    max={20}
                    step="0.0.2"
                    value={this.state.settings.envelope.release}
                    onChange={this.changeSettings}
                  />
                </div>
              </div>
              <div className="synth-controls filter-envelope">
                <div className='labels'>
                  Filter Envelope
                </div>
                <div className='inputs'>
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope.attack"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.state.settings.filterEnvelope.attack}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope.decay"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.state.settings.filterEnvelope.decy}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope.sustain"
                    min={0}
                    max={1}
                    step="0.01"
                    value={this.state.settings.filterEnvelope.sustain}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope.release"
                    min={0.01}
                    max={20}
                    step="0.0.2"
                    value={this.state.settings.filterEnvelope.release}
                    onChange={this.changeSettings}
                  />
                </div>
              </div>
              <div className="synth-controls filter">
                <div className='labels'>
                  Filter
                </div>
                <div className='inputs'>
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope.baseFrequency"
                    min={0}
                    max={250}
                    step="1"
                    value={this.state.settings.filterEnvelope.baseFrequency}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filter.Q"
                    min={1}
                    max={100}
                    step="0.1"
                    value={this.state.settings.filter.Q}
                    onChange={this.changeSettings}
                  />

                </div>
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
      </div>
    )
  }
}

export default MonoSynthInterface
