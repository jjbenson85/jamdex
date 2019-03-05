import React from 'react'
import Tone from '../../lib/tone'

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

    // this.state = presets[0]
    this.updateSynth= this.updateSynth.bind(this)
    this.unpackPythonSettings = this.unpackPythonSettings.bind(this)
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
    if(this.props.settings && prevProps.settings){
      this.updateSynth()
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
    // const obj = this.props.settings
    // console.log(obj)
    const obj = this.unpackPythonSettings(this.props.settings)
    // console.log('obj', obj)
    for( const mod in obj){
      for (const set in obj[mod]){
        const settings = {
          [mod]: {
            [set]: obj[mod][set]
          }
        }
        // console.log(settings)
        this.synth.set(settings)
      }
    }


    // this.synth.set({
    //   oscillator: {
    //     type: obj.oscillator.type
    //   },
    //   envelope: {
    //     attack: obj.envelope.attack,
    //     decay: obj.envelope.decay,
    //     sustain: obj.envelope.sustain,
    //     release: obj.envelope.release
    //   },
    //   filterEnvelope: {
    //     attack: obj.filterEnvelope.attack,
    //     decay: obj.filterEnvelope.decay,
    //     sustain: obj.filterEnvelope.sustain,
    //     release: obj.filterEnvelope.release,
    //     baseFrequency: obj.filterEnvelope.baseFrequency,
    //     octaves: obj.filterEnvelope.octaves,
    //     exponent: obj.filterEnvelope.exponent
    //   },
    //   filter: {
    //     Q: obj.filter.Q,
    //     type: obj.filter.type,
    //     rolloff: obj.filter.rolloff
    //   }
    // })
  }
  unpackPythonSettings(settings){

    // console.log('settings',settings)
    const newSettings= {
      envelope: {},
      filterEnvelope: {},
      filter: {}

    }
    for (const python in settings){
      // if(python==='id') continue
      // console.log('python', python)
      const pyArr = python.split('_')
      const mod = pyArr[0]
      const cntrl = pyArr[1]
      if (pyArr[2]) break

      const val = settings[python]
      // console.log(mod, cntrl, val)
      const currentMod = {...newSettings[mod], [cntrl]: val}
      newSettings[mod] = {...currentMod}

    }

    return newSettings

  }
  componentDidMount(){
    const settings = this.props.settings
    const newSettings = this.unpackPythonSettings(settings)
    // console.log('newSettings',newSettings)
    this.synth = new Tone.MonoSynth(newSettings).toMaster()
    // this.synth = new Tone.MonoSynth({
    //   oscillator: this.props.oscillator,
    //   envelope: this.props.envelope,
    //   filterEnvelope: this.props.filterEnvelope
    // }).toMaster()
  }

  render(){
    return (
      null
    )
  }
}

export default MonoSynth
