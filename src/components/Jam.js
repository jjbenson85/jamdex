import React from 'react'
import Tone from 'tone'
import debounce from 'lodash/debounce'
import axios from 'axios'


import MonoSynth from './instruments/MonoSynth'
import DrumMachine from './instruments/DrumMachine'

import InterfaceBeta from './interface/InterfaceBeta'
import DrumInterfaceBeta from './interface/DrumInterfaceBeta'
import noteRangeLookup from '../lib/noteRangeLookup'

import '../scss/components/InterfaceBeta.scss'
import '../scss/components/Jam.scss'

class Jam extends React.Component {

  constructor(){
    super()

    this.state={
      playing: false,
      currentPitch: '',
      currentVelocity: '',
      transport: {
        beat: 0,
        time: 0
      }
      // owned_synths: [
      //   {
      //     id: 0,
      //     beats: [
      //       {
      //         beat: 0,
      //         pitch: 'F3',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 1,
      //         pitch: 'A4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 2,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 3,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 4,
      //         pitch: 'F3',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 5,
      //         pitch: 'A4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 6,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 7,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 8,
      //         pitch: 'F3',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 9,
      //         pitch: 'A4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 10,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 11,
      //         pitch: 'E4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 12,
      //         pitch: 'D4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 13,
      //         pitch: 'D4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 14,
      //         pitch: 'B4',
      //         duration: '32n'
      //       },
      //       {
      //         beat: 15,
      //         pitch: 'C4',
      //         duration: '32n'
      //       }
      //     ]
      //   }
      // ]
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.bounce = this.bounce.bind(this)
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
    console.log('play')
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
    const ownedSynths = [...this.state.owned_synths]
    const pitch = ownedSynths[0].beats[i].pitch
    if (isNaN(value)) {
      ownedSynths[0].beats[i].pitch = `${value}${pitch.substring(pitch.length-1)}`
    } else ownedSynths[0].beats[i].pitch = `${pitch.substring(0, pitch.length-1)}${value}`
    this.setState({ owned_synths: ownedSynths })
  }

  handleChange(e, i, id, type){
    function handlePitch(){
      const value = e.target.value
      // const name = e.target.name
      // console.log('name',name)

      // const synthToChange = {...this.state.owned_synths[id]}
      const ownedSynths = [...this.state.owned_synths ]
      ownedSynths[id].beats[i][type] = noteRangeLookup[value]
      this.setState({
        owned_synths: ownedSynths,
        currentPitch: noteRangeLookup[value]
      })
    }
    handlePitch = handlePitch.bind(this)

    function handleVelocity(){
      console.log('handling velocity')
      const value = e.target.value
      // const name = e.target.name
      // console.log('name',name)
      // const synthToChange = {...this.state.owned_synths[id]}
      const ownedSynths = [...this.state.owned_synths ]
      ownedSynths[id].beats[i][type] = value
      this.setState({
        owned_synths: ownedSynths,
        currentVelocity: value
      })
    }
    handleVelocity = handleVelocity.bind(this)

    switch(type){
      case 'pitch':
        handlePitch()
        break

      case 'velocity':
        handleVelocity()
        break
    }
    this.delayedCallback()
  }
  bounce(){
    // this.setState({exported: true})
    // console.log('bouncing!', this.state)
    this.saveChanges(true)

    // const state = {...this.state}
    // delete state.created_at
    // delete state.updated_at
    // delete state.id
    // state.exported = false
    // state.jam_name = 'New Jam'
    // state.owned_synths = state.owned_synths.map((synth)=>{
    //   delete synth.created_at
    //   delete synth.updated_at
    //   delete synth.id
    //   return synth
    // })
    // console.log('bounce',state)

    axios({
      method: 'post',
      url: 'api/jams',
      data: this.state,
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTE1Mjc0NDEsImlhdCI6MTU1MTQ0MTA0MSwic3ViIjoxfQ.Y-nCqkWASqJDdpbHnfwZGUHsjT2AonwcKcFEnOYlDX0'
      }
    })
      .then(res => {
        console.log('RES', res)
        this.props.updateUser()
      })
      .catch(err => console.error(err.message))


    // this.props.updateUser()
  }


  saveChanges(exported=false){
    const state = {...this.state, exported: exported}
    console.log('About to save')

    //Created at and Updated at are provided to us pre-formatted but aren't accepted in this format, so we remove them
    delete state.created_at
    delete state.updated_at
    state.owned_synths = state.owned_synths.map((synth)=>{
      delete synth.created_at
      delete synth.updated_at
      return synth
    })
    axios.put(`/api/jams/${this.state.id}`,{...state})
      .then(res => console.log('Saved dat Jam\n', res))
      .catch(err => console.error(err.message))
  }

  returnInterface(id, name, handleChange, beats, currentBeat, currentPitch, currentVelocity, playing){
    let output
    switch(name){
      case 'MonoSynth':
        output =
        <InterfaceBeta
          key={id}
          id={id}
          handleChange={handleChange}
          beats={beats}
          currentBeat={currentBeat}
          currentPitch={currentPitch}
          currentVelocity={currentVelocity}
          playing={playing}
        />
        break
      case 'DrumMachine':
        output =
        <DrumInterfaceBeta
          key={id}
          id={id}
          handleChange={handleChange}
          beats={beats}
          currentBeat={currentBeat}
          currentPitch={currentPitch}
          currentVelocity={currentVelocity}
          playing={playing}
        />
        break

    }
    return output
  }
  returnInstrument(name, id, time, pitch, velocity, duration, beat){
    let output
    switch(name){
      case 'MonoSynth':
        output = <MonoSynth
          key={id}
          id={id}
          time={time}
          pitch={pitch}
          velocity={velocity}
          duration={duration}
          beat={beat}
        />
        break

      case 'DrumMachine':
        output =  <DrumMachine
          key={id}
          id={id}
          time={time}
          pitch={pitch}
          velocity={velocity}
          duration={duration}
          beat={beat}
        />
        break

    }
    return output
  }

  render(){
    if(!this.state.owned_synths) return <h1>Loading...</h1>
    // console.log('this.state',this.state)
    const currentBeat = this.state.transport.beat
    const synths = this.props.owned_synths
    const time = this.state.transport.time

    const type = this.props.tape ? 'tape': 'jam'
    // console.log('JAM',this.props.id, synths)
    return(
      <div className={type}>
        {!this.props.tape &&
        <div className='jam-inner'>
          {synths.map((inst, id) =>{
            const beats = inst.beats.sort((A, B)=> B.step - A.step)
            const {pitch, duration, velocity} = beats[currentBeat]
            return this.returnInstrument(
              inst.synth_name,
              id,
              time,
              pitch,
              velocity,
              duration,
              currentBeat
            )
          }
          )}
          {synths.map((inst, id) => {
            return this.returnInterface(
              id,
              inst.synth_name,
              this.handleChange,
              this.state.owned_synths[id].beats,
              currentBeat,
              this.state.currentPitch,
              this.state.currentVelocity,
              this.state.playing)
          })}
          <div className="transport">
            <div className="left">
              <div className="">
                {this.state.jam_name}
              </div>
            </div>
            <div className="center">
              <button onClick={()=>this.playSound()}>PLAY</button>
              <button onClick={()=>this.stopSound()}>STOP</button>
            </div>
            <div className="right">
              <button className="Bounce" onClick={this.bounce}>
                Bounce
              </button>
            </div>
          </div>
        </div>}
        {this.props.tape &&
        <div className='tape-inner'>
          Tape
          {synths.map((inst, id) =>{
            const beats = inst.beats.sort((A, B)=> B.step - A.step)
            const {pitch, duration, velocity} = beats[currentBeat]
            return this.returnInstrument(
              inst.synth_name,
              id,
              time,
              pitch,
              velocity,
              duration,
              currentBeat
            )
          }
          )}
          <button onClick={()=>this.playSound()}>PLAY</button>
          <button onClick={()=>this.stopSound()}>STOP</button>
        </div>}
      </div>
    )
  }
}

export default Jam
