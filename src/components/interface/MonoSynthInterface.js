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
    // console.log('interface changeSettings', this.props)

    const {name, value} = e.target
    const val = parseFloat(value)
    const settings = this.props.settings
    settings[name]= val || value
    settings.update = true
    // console.log('settings', settings)
    // console.log(name, val || value)

    this.props.updateSettings(settings)
    // this.setState({settings: {...settings}})

  }
  //
  // componentDidUpdate(){
  //   console.log('interface update', this.props)
  //   if(this.state.settings.update){
  //     const settings=this.state.settings
  //     this.setState({settings: {...settings, update: false}})
  //     this.props.updateSettings(this.state.settings)
  //   }
  // }


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
                      name="oscillator_type"
                      value='sawtooth'
                      id='sawtooth'
                      onChange={this.changeSettings}
                      checked={this.props.settings.oscillator_type==='sawtooth'}
                    />
                    <label htmlFor="sawtooth">◉
                    </label>
                    <div>sawtooth</div>
                  </div>

                  <div className='row'>
                    <input
                      type="radio"
                      name="oscillator_type"
                      value='square'
                      id='square'
                      onChange={this.changeSettings}
                      checked={this.props.settings.oscillator_type==='square'}
                    />
                    <label htmlFor="square">◉
                    </label>
                    <div>square</div>
                  </div>
                  <div className='row'>
                    {console.log('radio', this.props.settings.oscillator_type)}
                    <input
                      type="radio"
                      name="oscillator_type"
                      value="pwm"
                      id="pwm"
                      onChange={this.changeSettings}
                      checked={this.props.settings.oscillator_type==='pwm'}
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
                    name="envelope_attack"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.envelope_attack}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope_decay"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.envelope_decay}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope_sustain"
                    min={0}
                    max={1}
                    step="0.01"
                    value={this.props.settings.envelope_sustain}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="envelope_release"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.envelope_release}
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
                    name="filterEnvelope_attack"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.filterEnvelope_attack}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope_decay"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.filterEnvelope_decay}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope_sustain"
                    min={0}
                    max={1}
                    step="0.01"
                    value={this.props.settings.filterEnvelope_sustain}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filterEnvelope_release"
                    min={0.01}
                    max={5}
                    step="0.01"
                    value={this.props.settings.filterEnvelope_release}
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
                    name="filterEnvelope_baseFrequency"
                    min={0}
                    max={200}
                    step="1"
                    value={this.props.settings.filterEnvelope_baseFrequency}
                    onChange={this.changeSettings}
                  />
                  <input
                    type="range"
                    orient="vertical"
                    name="filter_Q"
                    min={0}
                    max={30}
                    step="0.1"
                    value={this.props.settings.filter_Q}
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
