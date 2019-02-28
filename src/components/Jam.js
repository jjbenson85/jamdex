import React from 'react'
import Tone from 'tone'
import debounce from 'lodash/debounce'
import axios from 'axios'


import MonoSynth from './MonoSynth'
import InterfaceBeta from './interface/InterfaceBeta'
import noteRangeLookup from '../lib/noteRangeLookup'

import '../scss/components/InterfaceBeta.scss'

class Jam extends React.Component {

  constructor(){
    super()

    this.state={
      playing: false,
      currentPitch: '',
      transport: {
        beat: 0,
        time: 0
      },
      owned_synths: [
        {
          id: 0,
          beats: [
            {
              beat: 0,
              pitch: 'F3',
              duration: '32n'
            },
            {
              beat: 1,
              pitch: 'A4',
              duration: '32n'
            },
            {
              beat: 2,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 3,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 4,
              pitch: 'F3',
              duration: '32n'
            },
            {
              beat: 5,
              pitch: 'A4',
              duration: '32n'
            },
            {
              beat: 6,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 7,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 8,
              pitch: 'F3',
              duration: '32n'
            },
            {
              beat: 9,
              pitch: 'A4',
              duration: '32n'
            },
            {
              beat: 10,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 11,
              pitch: 'E4',
              duration: '32n'
            },
            {
              beat: 12,
              pitch: 'D4',
              duration: '32n'
            },
            {
              beat: 13,
              pitch: 'D4',
              duration: '32n'
            },
            {
              beat: 14,
              pitch: 'B4',
              duration: '32n'
            },
            {
              beat: 15,
              pitch: 'C4',
              duration: '32n'
            }
          ]
        }
      ]
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delayedCallback = debounce(this.saveChanges, 2000)
  }

  componentDidMount(){
    this.setState({...this.props})
    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')
  }

  playSound(){
    this.setState({ playing: true })
    Tone.Transport.start()
    this.loop.start()
  }

  stopSound(){
    this.setState({ playing: false })
    Tone.Transport.stop()
    this.loop.stop()
  }

  handleSelect({ target: { value } }, i){
    const owned_synths = [...this.state.owned_synths]
    const pitch = owned_synths[0].beats[i].pitch
    if (isNaN(value)) {
      owned_synths[0].beats[i].pitch = `${value}${pitch.substring(pitch.length-1)}`
    } else owned_synths[0].beats[i].pitch = `${pitch.substring(0, pitch.length-1)}${value}`
    this.setState({ owned_synths })
  }

  handleChange(e, i){
    const value = e.target.value
    const name = e.target.name
    const owned_synths = [...this.state.owned_synths]
    owned_synths[0].beats[i][name] = noteRangeLookup[value]
    this.setState({ owned_synths, currentPitch: noteRangeLookup[value] })
    this.delayedCallback()
  }

  saveChanges(){
    const state = {...this.state}
    console.log('About to save', state)
    //Created at and Updated at are provided to us pre-formatted but aren't accepted in this format, so we remove them
    delete state.created_at
    delete state.updated_at
    state.owned_synths = state.owned_synths.map((synth)=>{
      delete synth.created_at
      delete synth.updated_at
      return synth
    })
    console.log('state',state)
    axios.put('/api/jams/1',{...state})
      .then(res => console.log('Saved dat Jam\n', res))
      .catch(err => console.error(err.message))
  }

  render(){
    // console.log('Jam State',this.state.owned_synths[0].beats[0].pitch)
    // console.log('Jam Beat',this.state.transport.beat)
    // console.log(this.state.owned_synths[0].beats[this.state.transport.beat].pitch)
    const currentBeat = this.state.transport.beat
    const beats = this.state.owned_synths[0].beats
    beats.sort((A, B)=> B.step - A.step)
    const {pitch, duration} = beats[currentBeat]
    return(
      <div>
        <h1>JAM</h1>
        <button onClick={()=>this.playSound()}>PLAY</button>
        <button onClick={()=>this.stopSound()}>STOP</button>
        <MonoSynth
          id="1"
          time={this.state.transport.time}
          pitch={pitch}
          duration={duration}
        />
        <InterfaceBeta
          beats={this.state.owned_synths[0].beats}
          currentBeat={currentBeat}
          currentPitch={this.state.currentPitch}
          playing={this.state.playing}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Jam
