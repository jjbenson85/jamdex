import React from 'react'
import Tone from 'tone'

class MonoSynth extends React.Component {
  constructor(){
    super()

    this.state={
      'oscillator': {
        'type': 'sawtooth'
      },
      'envelope': {
        'attack': 0.001,
        'decay': 0.1,
        'sustain': 0.2,
        'release': 0.1
      },
      'filterEnvelope': {
        'attack': 0.001 ,
        'decay': 0.1 ,
        'sustain': 0.2 ,
        'release': 0.1 ,
        'baseFrequency': 200 ,
        'octaves': 7 ,
        'exponent': 1.1
      },
      'filter': {
        'Q': 2,
        'type': 'lowpass',
        'rolloff': -12
      }
    }
  }

  componentDidUpdate(){
    // console.log('MS', this.props)
    // if(prevProps.id === this.props.id) return
    const {pitch, duration, velocity} = this.props.noteInfo
    const vel = velocity/127
    this.synth.triggerAttackRelease(
      pitch,
      duration,
      this.props.time,
      vel
    )

  }

  componentDidMount(){
    this.synth = new Tone.MonoSynth({
      oscillator: this.state.oscillator,
      envelope: this.state.envelope,
      filterEnvelope: this.state.filterEnvelope
    }).toMaster()
    // console.log('synth settings', this.synth)
  }




  render(){
    return (
      null
    )
  }
}

export default MonoSynth
