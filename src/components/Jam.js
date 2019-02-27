import React from 'react'
import Tone from 'tone'

import MonoSynth from './MonoSynth'
import noteRangeLookup from '../lib/noteRangeLookup'

import '../scss/components/InterfaceBeta.scss'

class Jam extends React.Component {

  constructor(){
    super()

    this.state={
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
  }

  componentDidMount(){
    this.setState({...this.props})
    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')
  }

  playSound(){
    Tone.Transport.start()
    this.loop.start()
  }

  stopSound(){
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
    console.log('handle hange',value, name)
    const owned_synths = [...this.state.owned_synths]
    owned_synths[0].beats[i][name] = noteRangeLookup[value]
    this.setState({ owned_synths })
  }

  render(){
    return(
      <div>
        <h1>JAM</h1>
        <button onClick={()=>this.playSound()}>PLAY</button>
        <button onClick={()=>this.stopSound()}>STOP</button>
        <MonoSynth
          id="1"
          time={this.state.transport.time}
          pitch={this.state.owned_synths[0].beats[this.state.transport.beat].pitch}
          duration={this.state.owned_synths[0].beats[this.state.transport.beat].duration}
        />
        <div className="interfaceBeta">
          {this.state.owned_synths[0].beats.map((note, i) =>
            <div key={i}>
              <input
                type="range"
                name="pitch"
                min="0"
                max="35"
                value={noteRangeLookup.indexOf(note.pitch)}
                onChange={(e) => {
                  console.log(e.target.value)
                  this.handleChange(e, i)
                }
                }
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Jam
