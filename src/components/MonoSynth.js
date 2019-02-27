import React from 'react'
import Tone from 'tone'

class MonoSynth extends React.Component {
  constructor(){
    super()

    this.state={
      'oscillator': {
        'type': 'pwm',
        'modulationFrequency': 0.2
      },
      'envelope': {
        'attack': 0.52,
        'decay': 0.1,
        'sustain': 0.2,
        'release': 0.9
      },
      'filterEnvelope': {
        'attack': 0.06 ,
        'decay': 0.2 ,
        'sustain': 0.5 ,
        'release': 2 ,
        'baseFrequency': 200 ,
        'octaves': 7 ,
        'exponent': 2
      },
      'filter': {
        'Q': 6,
        'type': 'lowpass',
        'rolloff': -24
      }
    }
  }

  componentDidUpdate(){
    this.synth.triggerAttackRelease(
      this.props.pitch,
      this.props.duration,
      this.props.time
    )
  }

  componentDidMount(){
    this.synth = new Tone.MonoSynth({
      oscillator: this.state.oscillator,
      envelope: this.state.envelope,
      filterEnvelope: this.state.filterEnvelope
    }).toMaster()
  }




  render(){
    return (
      <div className='monosynth'>
        <h1>Monosynth</h1>
        
      </div>
    )
  }
}

export default MonoSynth
