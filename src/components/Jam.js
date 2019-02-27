import React from 'react'
import Tone from 'tone'


import MonoSynth from './MonoSynth'

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
  }

  componentDidMount(){
    console.log('props',this.props)
    this.setState({...this.props})
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
    const owned_synths = [...this.state.owned_synths]
    owned_synths[0].beats[i].pitch = `${value}3`

    this.setState({ owned_synths })
  }

  render(){
    console.log('Jam State',this.state.owned_synths[0].beats[0].pitch)
    console.log('Jam Beat',this.state.transport.beat)
    console.log(this.state.owned_synths[0].beats[this.state.transport.beat].pitch)
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
        {this.state.owned_synths[0].beats.map((note, i) =>
          {console.log('note',note.pitch.substring(0, note.pitch.length - 1))
          return <select
            key={i}
            id={`select-note-${i}`}
            value={note.pitch.substring(0, note.pitch.length - 1)}
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
          </select>}
        )}
      </div>
    )
  }
}

export default Jam
