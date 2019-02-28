import React from 'react'
import Tone from 'tone'

class DrumMachine extends React.Component {
  constructor(){
    super()
  }

  componentDidUpdate(prevProps){
    if(prevProps.beat === this.props.beat) return

    // console.log('DM', this.props)
    try{
      this.drum.get(this.props.pitch).start(this.props.time)
    }catch(err){
      // console.log(err)
    }


    // this.drum.get(this.props.pitch).start(this.props.time, 0, this.props.duration)
    // this.drum.triggerAttackRelease(
    //   this.props.pitch,
    //   this.props.duration,
    //   this.props.time
    // )
  }
  componentDidMount(){
    const x = 9
    this.drum = new Tone.Players({
      'G#4': 'assets/wav/sound-'+x+'-1.wav',
      'A4': 'assets/wav/sound-'+x+'-2.wav',
      'B4': 'assets/wav/sound-'+x+'-3.wav',
      'C5': 'assets/wav/sound-'+x+'-4.wav',
      'C#4': 'assets/wav/sound-'+x+'-5.wav',
      'D#4': 'assets/wav/sound-'+x+'-6.wav',
      'E4': 'assets/wav/sound-'+x+'-7.wav',
      'F#4': 'assets/wav/sound-'+x+'-8.wav',
      'G#3': 'assets/wav/sound-'+x+'-9.wav',
      'A3': 'assets/wav/sound-'+x+'-10.wav',
      'B3': 'assets/wav/sound-'+x+'-11.wav',
      'C4': 'assets/wav/sound-'+x+'-12.wav',
      'C#3': 'assets/wav/sound-'+x+'-13.wav',
      'D#3': 'assets/wav/sound-'+x+'-14.wav',
      'E3': 'assets/wav/sound-'+x+'-15.wav',
      'F#3': 'assets/wav/sound-'+x+'-16.wav'
    }).toMaster()
  }
  render(){
    return (
      <div className='drummachine'>
        <h1>DrumMachine</h1>

      </div>
    )
  }
}

export default DrumMachine
