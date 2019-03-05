import React from 'react'
import Tone from '../lib/tone'
import debounce from 'lodash/debounce'
import axios from 'axios'

import Auth from '../lib/Auth'
import MonoSynth from './instruments/MonoSynth'
import DrumMachine from './instruments/DrumMachine'
import MonoSynthInterface from './interface/MonoSynthInterface'
import DrumInterface from './interface/DrumInterface'
import noteRangeLookup from '../lib/noteRangeLookup'
import Cassette from './Cassette'
import Loading from './common/Loading'

import '../scss/components/Jam.scss'


class Jam extends React.Component {

  constructor(){
    super()

    this.state={
      playing: false,
      bouncing: false,
      currentPitch: '',
      currentVelocity: '',
      displaySynth: 0,
      transport: {
        beat: 0,
        time: 0
      }
      // poly: []

    }

    this.handleChange = this.handleChange.bind(this)
    this.bounce = this.bounce.bind(this)
    this.incTempo = this.incTempo.bind(this)
    this.decTempo = this.decTempo.bind(this)
    this.incSwing = this.incSwing.bind(this)
    this.decSwing = this.decSwing.bind(this)
    this.updateSynthSettings = this.updateSynthSettings.bind(this)
    this.handleLabel = this.handleLabel.bind(this)
    this.delayedCallback = debounce(this.saveChanges, 2000)
  }

  handleLabel(e){
    this.setState({ jam_name: e.target.value })
    this.delayedCallback()
  }


  componentDidMount(){
    const loggedIn = Auth.isAuthenticated()
    this.setState({...this.props, loggedIn})
    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      Tone.Transport.bpm.value = this.state.tempo
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')
  }

  incTempo(){
    let tempo = this.state.tempo
    tempo++
    Tone.Transport.bpm.value = parseInt(tempo)
    this.setState({tempo})
  }
  decTempo(){
    let tempo = this.state.tempo
    tempo--
    Tone.Transport.bpm.value = parseInt(tempo)
    this.setState({tempo})
  }
  incSwing(){
    let swing = this.state.swing
    swing++
    if(swing>100) swing=100
    Tone.Transport.swing = parseInt(swing)/100
    this.setState({swing})
  }
  decSwing(){
    let swing = this.state.swing
    swing--
    if(swing<0) swing=0
    Tone.Transport.swing = parseInt(swing)/100
    this.setState({swing})
  }
  clap(){
    let applause = this.state.applause
    applause++
    this.setState({applause})
    this.delayedCallback()
  }
  playSound(){
    console.log('play')
    //When played as a tape, tell the tape player we are playing
    this.props.tape && this.props.playTape()

    Tone.Transport.start()
    this.loop.start()
    this.setState({ playing: true })
  }

  stopSound(){
    //When played as a tape, tell the tape player we are not playing
    this.props.tape && this.props.stopTape()

    Tone.Transport.stop()
    this.loop.stop()
    this.setState({ playing: false })
  }

  handleMonoSynthChange(instId, beat, voice, type, value){
    const ownedSynths = [...this.state.owned_synths ]
    let changedValue, currentPitch, currentVelocity

    switch(type){
      case 'pitch':
        changedValue = noteRangeLookup[value]
        currentPitch = changedValue
        currentVelocity = this.state.currentVelocity
        break

      case 'velocity':
        changedValue = value
        currentVelocity = changedValue
        currentPitch = this.state.currentPitch
        break

    }

    ownedSynths[instId].beats[beat][type] = changedValue

    this.setState({
      owned_synths: ownedSynths,
      currentPitch,
      currentVelocity
    })
    this.delayedCallback()


  }
  handleDrumMachineChange(instId, beat, voice, type, value){
    console.log('instId',instId, 'beat', beat, 'type', 'voice', voice, 'type', type, 'value', value)

    // const synths = []
    // this.props.owned_synths.forEach((synth,i) =>{
    //   const poly = this.state.poly.map((step)=> step.map(()=> null))
    //   synths.push(poly)
    //   synth.beats.forEach((beat)=> {
    //     synths[i][beat.step][beat.poly_id] = beat
    //   })
    // })
    // this.setState({synths})
    //THIS NEEDS TO BE DEEP CLONED?
    const ownedDrums = [...this.state.owned_drums ]

    const toChange = ownedDrums[instId].beats[beat].poly_beats[voice]
    if(toChange[type]=== value){
      toChange[type] = '0'
    }else{
      toChange[type] = value
    }
    toChange['pitch'] = noteRangeLookup[voice]

    this.setState({
      owned_drums: ownedDrums
    })

  }
  handleChange(instType, instId, beat, voice, type, value){
    switch(instType){
      case 'DrumMachine':
        this.handleDrumMachineChange(instId, beat, voice, type, value)
        break

      case 'MonoSynth':
        this.handleMonoSynthChange(instId, beat, voice, type, value)
        break
    }
    this.delayedCallback()
  }

  bounce(){
    if(this.props.disableSave) return
    const that = this
    const token = Auth.getToken()
    that.setState({bouncing: true})
    Tone.Transport.start()
    that.loop.start()
    axios({
      method: 'post',
      url: '/api/jams',
      data: this.state,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('RES', res)
      })
      .catch(err => console.error(err.message))
  }


  saveChanges(exported=false){
    if(this.props.disableSave) return
    const state = {...this.state, exported: exported}
    console.log('About to save')

    //Created at and Updated at are provided to us pre-formatted but aren't accepted in this format, so we remove them
    delete state.created_at
    delete state.updated_at
    state.owned_synths = state.owned_synths.map((instr)=>{
      delete instr.created_at
      delete instr.updated_at
      return instr
    })
    state.owned_drums = state.owned_drums.map((instr)=>{
      delete instr.created_at
      delete instr.updated_at
      return instr
    })
    axios.put(`/api/jams/${this.state.id}`,{...state})
      .then(res => console.log('Saved dat Jam\n', res))
      .catch(err => console.error(err.message))
  }

  updateSynthSettings(id, obj){
    const owned_synths = [...this.state.owned_synths]
    owned_synths[id].settings = {...obj}
    this.setState({owned_synths})
  }
  returnInterface(id, name, handleChange, updateSettings, beats, currentBeat, currentPitch, currentVelocity, playing, poly){

    let output
    switch(name){
      case 'MonoSynth':
        output =
        <MonoSynthInterface
          key={id}
          id={0}
          handleChange={handleChange}
          updateSettings={(obj)=>updateSettings(id, obj)}
          beats={beats}
          currentBeat={currentBeat}
          currentPitch={currentPitch}
          currentVelocity={currentVelocity}
          playing={playing}
        />
        break

      case 'DrumMachine':
        output =
        <DrumInterface
          key={id}
          id={0}
          handleChange={handleChange}
          // beats={beats}
          currentBeat={currentBeat}
          // currentPitch={currentPitch}
          // currentVelocity={currentVelocity}
          playing={playing}
          poly={poly}
        />
        break
    }
    return output
  }

  returnInstrument(name, id, noteInfo, time, settings){
    let output
    const poly = noteInfo
    switch(name){
      case 'MonoSynth':
        output = `${name}, ${id}, ${noteInfo}, ${time}, `
        output = <MonoSynth
          key={id}
          id={id}
          time={time}
          noteInfo={noteInfo}
          settings={settings}
        />
        break

      case 'DrumMachine':
        output =  <DrumMachine
          key={id}
          id={id}
          time={time}
          poly={poly.poly_beats}
        />
        break
    }
    return output
  }

  render(){

    if(!this.state.owned_synths) return <Loading />

    const currentBeat = this.state.transport.beat
    const synths = this.props.owned_synths
    const drums = this.props.owned_drums
    const instruments = [...synths,...drums]
    const time = this.state.transport.time

    const isTape = !!this.props.tape
    const isJam = !this.props.tape
    const type = isTape ? 'tape': 'jam'
    const {bouncing} = this.state
    if(bouncing && currentBeat===15){
      Tone.Transport.stop()
      this.loop.stop()
      this.props.updateUser()
    }
    const loggedIn = this.state.loggedIn
    return(
      <div className={`${type} ${bouncing?'bouncing':''}`}>
        {isJam &&
        <div className='jam-inner'>
          {instruments.map((inst, id) =>{
            const beats = inst.beats.sort((A, B)=> A.step - B.step)
            const noteInfo = beats[currentBeat]

            return this.returnInstrument(
              inst.synth_name,
              id,
              noteInfo,
              time,
              inst.settings
            )
          }
          )}
          <div className='interface-holder'>
            {instruments.map((inst, id) => {
              if(id!==this.state.displaySynth) return null
              return this.returnInterface(
                id,
                inst.synth_name,
                this.handleChange,
                this.updateSynthSettings,
                instruments[id].beats,
                currentBeat,
                this.state.currentPitch,
                this.state.currentVelocity,
                this.state.playing,
                inst.beats
              )
            })}
          </div>
          <div className="transport">
            <div className='tabs'>
              {instruments.map((inst, id) =>
                <div
                  key={id}
                  className={`tab ${this.state.displaySynth === id ? 'selected':''}`}
                  onClick={()=>this.setState({displaySynth: id})}
                >
                  {inst.synth_name}
                </div>
              )}
            </div>
            <div className="left">
              <div className="">
                {this.state.jam_name}
              </div>
            </div>
            <div className="center">
              <button
                className={`item ${this.state.playing ? 'playing':''}`}
                onClick={()=>this.playSound()}
              >
                <img src="/assets/img/play.png" style={{ marginLeft: '4px' }} />
              </button>
              <button
                className="item"
                onClick={()=>this.stopSound()}
              >
                <img src="/assets/img/stop.png" />
              </button>
              <div className="item number-control">
                <button onClick={()=>this.decTempo()}>-</button>
                <div className="display">{`${this.state.tempo} BPM`}</div>
                <button onClick={()=>this.incTempo()}>+</button>
              </div>
              <div className="number-control">
                <button onClick={()=>this.decSwing()}>-</button>
                <div className="display">{`${this.state.swing} swing`}</div>
                <button onClick={()=>this.incSwing()}>+</button>
              </div>
            </div>
            <div className="right">
              {loggedIn && !this.state.playing && <button className="item bounce" onClick={this.bounce}>
                <img src="/assets/img/rec.png" style={{ width: '100%' }} />
              </button>}
              {this.state.playing && <button disabled className="item bounce">
                <img src="/assets/img/rec.png" style={{ width: '100%' }} />
              </button>}
              {!loggedIn && <div>Login To Save!</div>}
            </div>
          </div>
        </div>}
        {isTape &&
        <div className='tape-inner'>
          <Cassette
            label={this.state.jam_name}
            onChange={this.handleLabel}
            playing={this.state.playing}
            disableSave={this.props.disableSave}
          />
          {instruments.map((inst, id) =>{
            const beats = inst.beats.sort((A, B)=> A.step - B.step)
            const noteInfo = beats[currentBeat]

            return this.returnInstrument(
              inst.synth_name,
              id,
              noteInfo,
              time
            )
          }
          )}
          {!this.props.disabled &&
            <div className="tape-controls">
              <button
                onClick={()=>this.playSound()}
                className={`${this.state.playing ? 'playing':''}`}
              >
                <img src="/assets/img/play.png" />
              </button>
              <button onClick={()=>this.stopSound()}>
                <img src="/assets/img/stop.png" />
              </button>
              <div className="applause">{this.state.applause === 0 ? '-':this.state.applause}</div>
              <button onClick={()=>this.clap()}>
                <span>👏</span>
              </button>
            </div>
          }
          {this.props.disabled &&
            <div className="tape-controls disabled">
              <button disabled>
                <img src="/assets/img/play.png" />
              </button>
              <button disabled>
                <img src="/assets/img/stop.png" />
              </button>
              <div className="applause">{this.state.applause === 0 ? '-':this.state.applause}</div>
              <button disabled>
                <span>👏</span>
              </button>
            </div>
          }
        </div>}
      </div>
    )
  }
}

export default Jam
