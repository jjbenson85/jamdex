import React from 'react'
import Tone from 'tone'

const presets = [
  {
    'oscillator': {
      'type': 'sawtooth'
    },
    'envelope': {
      'attack': 0.01,
      'decay': 1,
      'sustain': 0.5,
      'release': 1
    },
    'filterEnvelope': {
      'attack': 0.01 ,
      'decay': 0.1 ,
      'sustain': 0.5 ,
      'release': 1 ,
      'baseFrequency': 100 ,
      'octaves': 7 ,
      'exponent': 1
    },
    'filter': {
      'Q': 1,
      'type': 'lowpass',
      'rolloff': -12
    }
  },
  {
    'oscillator': {
      'type': 'square'
    },
    'envelope': {
      'attack': 0.01,
      'decay': 0.01,
      'sustain': 1,
      'release': 20
    },
    'filterEnvelope': {
      'attack': 0.01 ,
      'decay': 0.01 ,
      'sustain': 1 ,
      'release': 20 ,
      'baseFrequency': 500 ,
      'octaves': 7 ,
      'exponent': 1
    },
    'filter': {
      'Q': 1.2,
      'type': 'lowpass',
      'rolloff': -24
    }
  },
  {
    'oscillator': {
      'type': 'pwm'
    },
    'envelope': {
      'attack': 0.01,
      'decay': 0.01,
      'sustain': 1,
      'release': 20
    },
    'filterEnvelope': {
      'attack': 0.01 ,
      'decay': 1 ,
      'sustain': 0.5 ,
      'release': 20 ,
      'baseFrequency': 50 ,
      'octaves': 4 ,
      'exponent': 1
    },
    'filter': {
      'Q': 5,
      'type': 'lowpass',
      'rolloff': -24
    }
  }
]
class MonoSynth extends React.Component {
  constructor(){
    super()

    this.state = presets[0]
    this.updateSynth= this.updateSynth.bind(this)

    // this.state={
    //   'oscillator': {
    //     'type': 'sawtooth'
    //   },
    //   'envelope': {
    //     'attack': 0.001,
    //     'decay': 0.1,
    //     'sustain': 0.2,
    //     'release': 0.1
    //   },
    //   'filterEnvelope': {
    //     'attack': 0.001 ,
    //     'decay': 0.1 ,
    //     'sustain': 0.2 ,
    //     'release': 0.1 ,
    //     'baseFrequency': 200 ,
    //     'octaves': 7 ,
    //     'exponent': 1.1
    //   },
    //   'filter': {
    //     'Q': 2,
    //     'type': 'lowpass',
    //     'rolloff': -12
    //   }
    // }
  }

  componentDidUpdate(prevProps){
    // console.log('MS', this.props, prevProps)
    // if(prevProps.id === this.props.id) return

    if(this.props.settings && prevProps.settings){
      // console.log('here')
      this.updateSynth()
      // if(this.props.settings.preset !== prevProps.settings.preset){
      //   console.log('change settings', this.props.settings.preset)
      //   const obj = presets[this.props.settings.preset]
      //   console.log(obj)
      //   this.setState({...obj})
      // }
    }
    if(this.props.time === prevProps.time) return
    const {pitch, duration, velocity} = this.props.noteInfo
    if(velocity==='0') {
      return
    }
    const vel = velocity/127

    this.synth.triggerAttackRelease(
      pitch,
      duration,
      this.props.time,
      vel
    )

  }

  updateSynth(){
    // console.log('update synth')
    // console.log(this.synth)
    // console.log(this.props)
    // console.log('OSC',this.state.oscillator.type)


    let preset = this.props.settings.preset
    if(preset>presets.length-1) preset = presets.length-1
    if(preset<0) preset = 0

    const obj = presets[preset]
    // console.log(obj, presets, preset )

    // if(this.state.oscillator){
    this.synth.set({
      oscillator: {
        type: obj.oscillator.type
      },
      envelope: {
        attack: obj.envelope.attack,
        decay: obj.envelope.decay,
        sustain: obj.envelope.sustain,
        release: obj.envelope.release
      },
      filterEnvelope: {
        attack: obj.filterEnvelope.attack,
        decay: obj.filterEnvelope.decay,
        sustain: obj.filterEnvelope.sustain,
        release: obj.filterEnvelope.release,
        baseFrequency: obj.filterEnvelope.baseFrequency,
        octaves: obj.filterEnvelope.octaves,
        exponent: obj.filterEnvelope.exponent
      },
      filter: {
        Q: obj.filter.Q,
        type: obj.filter.type,
        rolloff: obj.filter.rolloff
      }
    })
    // }
    // this.synth.dispose()
    // this.synth = new Tone.MonoSynth({
    //   oscillator: this.state.oscillator,
    //   envelope: this.state.envelope,
    //   filterEnvelope: this.state.filterEnvelope
    // }).toMaster()

  }
  componentDidMount(){

    // this.updateSynth()
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
