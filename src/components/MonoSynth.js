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


    this.handleControlChange = this.handleControlChange.bind(this)
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this)
  }

  componentDidUpdate(){
    const envelope = () => {
      const {attack, decay, sustain, release } = this.state.envelope
      const env = this.synth.envelope
      env.attack = attack
      env.decay = decay
      env.sustain = sustain
      env.release = release
    }

    const filterEnvelope= () => {
      const {attack, decay, sustain, release } = this.state.filterEnvelope
      const env = this.synth.envelope
      env.attack = attack
      env.decay = decay
      env.sustain = sustain
      env.release = release
    }

    envelope()
    filterEnvelope()

    this.synth.filterEnvelope.baseFrequency = this.state.filterEnvelope.baseFrequency

    this.synth.triggerAttackRelease(this.props.pitch, this.props.duration, this.props.time)
  }

  handleControlChange(val, mod){
    console.log('v', val, this.synth)
    mod = mod.split('.')
    // this.synth[mod[0]][mod[1]] = val

    let oscillator = {...this.state.oscillator}
    let envelope = {...this.state.envelope}
    let filterEnvelope = {...this.state.filterEnvelope}
    let filter = {...this.state.filter}

    // if(mod[0]==='oscillator'){
    //   oscillator = {...this.state.oscillator, [mod[1]]: val}
    // }else if(mod[0]==='envelope'){
    //   envelope = {...this.state.envelope, [mod[1]]: val}
    // }
    switch(mod[0]){
      case 'osicllator':
        oscillator = {...this.state.oscillator, [mod[1]]: val}
        break

      case 'envelope':
        envelope = {...this.state.envelope, [mod[1]]: val}
        break

      case 'filterEnvelope':
        filterEnvelope = {...this.state.filterEnvelope, [mod[1]]: val}
        break

      case 'filter':
        filter = {...this.state.filter, [mod[1]]: val}
        break
    }

    this.setState({oscillator, envelope, filterEnvelope, filter})
  }

  handleRadioButtonChange(val){
    console.log('v', val, this.synth)
    let str
    switch(val){
      case 0:
        str = 'sawtooth'
        break
      case 1:
        str = 'square'
        break
      case 2:
        str = 'pwm'
        break
      case 3:
        str = 'sine'
        break
    }
    console.log('str', str)

    this.synth.oscillator.type = str
  }
  componentDidMount(){
    this.synth = new Tone.MonoSynth({
      oscillator: this.state.oscillator,
      envelope: this.state.envelope,
      filterEnvelope: this.state.filterEnvelope
    }).toMaster()

    const obj = {...this.synth}

    console.log('obj', obj)

    // const oscillator = {...this.state.oscillator}
    // const envelope = {...this.state.envelope}

    // this.setState({oscillator, envelope})


    const defaultSlider = {
      'size': [20,120],
      'mode': 'relative',  // 'relative' or 'absolute'
      'min': 0.000000000000001,
      'max': 1,
      'step': 0,
      'value': 0
    }

    const filterFreqSlider = {
      'size': [20,120],
      'mode': 'relative',  // 'relative' or 'absolute'
      'min': 5,
      'max': 500,
      'step': 0,
      'value': 500
    }

    this.oscillatorType = new Nexus.RadioButton(`#oscillatorType${this.props.id}`,{
      'size': [120,25],
      'numberOfButtons': 4,
      'active': 0
    })

    this.oscillatorType.on('change', (val)=>this.handleRadioButtonChange(val, 'oscillator.type') )

    this.envelopeAttack = new Nexus.Slider(`#envelopeAttack${this.props.id}`,defaultSlider)
    this.envelopeAttack.value = this.state.envelope.attack
    this.envelopeAttack.on('change', (val)=>this.handleControlChange(val, 'envelope.attack') )

    this.envelopeDecay = new Nexus.Slider(`#envelopeDecay${this.props.id}`,defaultSlider)
    this.envelopeDecay.value = this.state.envelope.decay
    this.envelopeDecay.on('change', (val)=>this.handleControlChange(val, 'envelope.decay') )

    this.envelopeSustain = new Nexus.Slider(`#envelopeSustain${this.props.id}`,defaultSlider)
    this.envelopeSustain.value = this.state.envelope.sustain
    this.envelopeSustain.on('change', (val)=>this.handleControlChange(val, 'envelope.sustain') )

    this.envelopeRelease = new Nexus.Slider(`#envelopeRelease${this.props.id}`,defaultSlider)
    this.envelopeRelease.value = this.state.envelope.release
    this.envelopeRelease.on('change', (val)=>this.handleControlChange(val, 'envelope.release') )



    this.filterEnvelopeAttack = new Nexus.Slider(`#filterEnvelopeAttack${this.props.id}`,defaultSlider)
    this.filterEnvelopeAttack.value = this.state.filterEnvelope.attack
    this.filterEnvelopeAttack.on('change', (val)=>this.handleControlChange(val, 'filterEnvelope.attack') )

    this.filterEnvelopeDecay = new Nexus.Slider(`#filterEnvelopeDecay${this.props.id}`,defaultSlider)
    this.filterEnvelopeDecay.value = this.state.filterEnvelope.decay
    this.filterEnvelopeDecay.on('change', (val)=>this.handleControlChange(val, 'filterEnvelope.decay') )

    this.filterEnvelopeSustain = new Nexus.Slider(`#filterEnvelopeSustain${this.props.id}`,defaultSlider)
    this.filterEnvelopeSustain.value = this.state.filterEnvelope.sustain
    this.filterEnvelopeSustain.on('change', (val)=>this.handleControlChange(val, 'filterEnvelope.sustain') )

    this.filterEnvelopeRelease = new Nexus.Slider(`#filterEnvelopeRelease${this.props.id}`,defaultSlider)
    this.filterEnvelopeRelease.value = this.state.filterEnvelope.release
    this.filterEnvelopeRelease.on('change', (val)=>this.handleControlChange(val, 'filterEnvelope.release') )

    this.filterFrequency = new Nexus.Slider(`#filterfrequency${this.props.id}`,filterFreqSlider)
    this.filterFrequency.value = this.state.filterEnvelope.baseFrequency
    this.filterFrequency.on('change', (val)=>this.handleControlChange(val, 'filterEnvelope.baseFrequency') )

  }




  render(){
    return (
      <div className='monosynth'>
        <h1>Monosynth</h1>
        <div id="#target" ref={el => this.sequencerElement = el} ></div>

        <div id={`oscillatorType${this.props.id}`}></div>

        <div className="control-container">
          <div id={`envelopeAttack${this.props.id}`}></div>
          <div id={`envelopeDecay${this.props.id}`}></div>
          <div id={`envelopeSustain${this.props.id}`}></div>
          <div id={`envelopeRelease${this.props.id}`}></div>
        </div>
        <div className="control-container">
          <div id={`filterEnvelopeAttack${this.props.id}`}></div>
          <div id={`filterEnvelopeDecay${this.props.id}`}></div>
          <div id={`filterEnvelopeSustain${this.props.id}`}></div>
          <div id={`filterEnvelopeRelease${this.props.id}`}></div>
          <div id={`filterfrequency${this.props.id}`}></div>
        </div>
      </div>
    )
  }
}

export default MonoSynth
