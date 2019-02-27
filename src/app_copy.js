import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import Tone from 'tone'
import Header from './components/Header'


import MonoSynth from './components/MonoSynth'

import './scss/style.scss'

class App extends React.Component {

  constructor(){
    super()

    this.state={
      transport: {
        beat: 0,
        time: 0
      },
      instrument: [
        {
          id: 0,
          sequence: [
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
  }

  componentDidMount(){
    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')
  }

  playSound(){
    Tone.Transport.start()
    this.loop.start()
    console.log('clicked start')
  }

  stopSound(){
    Tone.Transport.stop()
    this.loop.stop()
    console.log('clicked stop')
  }

  handleSelect({ target: { value } }, i){
    const instrument = [...this.state.instrument]
    instrument[0].sequence[i].pitch = `${value}3`

    this.setState({ instrument })
  }

  render(){

    console.log(this.state.instrument[0].sequence[this.state.transport.beat].pitch)
    return(
      <div>
        <h1>The Index of Jams</h1>
        <button onClick={()=>this.playSound()}>PLAY</button>
        <button onClick={()=>this.stopSound()}>STOP</button>
        <MonoSynth
          id="1"
          time={this.state.transport.time}
          pitch={this.state.instrument[0].sequence[this.state.transport.beat].pitch}
          duration={this.state.instrument[0].sequence[this.state.transport.beat].duration}
        />
        {this.state.instrument[0].sequence.map((note, i) =>
          <select
            key={i}
            id={`select-note-${i}`}
            defaultValue={note.pitch.substring(0, note.pitch.length - 1)}
            onChange={(e) => {
              this.handleSelect(e, i)
            }}
          >
            <option value='A'>A</option>
            <option value='A#'>A#</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='C#'>C#</option>
            <option value='D'>D</option>
            <option value='D#'>D#</option>
            <option value='E'>E</option>
            <option value='F'>F</option>
            <option value='F#'>F#</option>
            <option value='G'>G</option>
            <option value='G#'>G#</option>
          </select>
        )}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
