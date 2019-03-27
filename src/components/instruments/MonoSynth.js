import React from 'react'
import Tone from '../../lib/tone'

class MonoSynth extends React.Component {
  constructor(){
    super()
    this.updateSynth= this.updateSynth.bind(this)
    this.unpackPythonSettings = this.unpackPythonSettings.bind(this)
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

    const obj = this.unpackPythonSettings(this.props.settings)
    for( const mod in obj){
      for (const set in obj[mod]){
        const settings = {
          [mod]: {
            [set]: obj[mod][set]
          }
        }
        this.synth.set(settings)
      }
    }

  }
  unpackPythonSettings(settings){
    const newSettings= {
      envelope: {},
      filterEnvelope: {},
      filter: {}

    }
    for (const python in settings){
      const pyArr = python.split('_')
      const mod = pyArr[0]
      const cntrl = pyArr[1]
      if (pyArr[2]) {
        delete settings[python]
        continue
      }
      console.log(settings)

      const val = settings[python]
      const currentMod = {...newSettings[mod], [cntrl]: val}
      newSettings[mod] = {...currentMod}

    }

    return newSettings

  }

  componentDidMount(){
    const settings = this.props.settings
    const newSettings = this.unpackPythonSettings(settings)
    this.synth = new Tone.MonoSynth(newSettings).toMaster()
  }

  render(){
    return (
      null
    )
  }
}

export default MonoSynth
