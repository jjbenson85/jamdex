import React from 'react'
import Tone from 'tone'

class DrumMachine extends React.Component {
  constructor(){
    super()
  }

  componentDidUpdate(prevProps){
    const level = (this.props.velocity/128)
    const db = Tone.gainToDb(level)
    this.drum.volume.value = db
    if(prevProps.beat === this.props.beat) return

    // console.log('DM', this.props)
    this.drum.get(this.props.pitch).start(this.props.time)
    // try{
    // }catch(err){
    //   // console.log(err)
    // }


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
      'C2': 'wav/sound-'+x+'-1.wav',
      'C#2': 'wav/sound-'+x+'-2.wav',
      'D2': 'wav/sound-'+x+'-3.wav',
      'D#2': 'wav/sound-'+x+'-4.wav',
      'E2': 'wav/sound-'+x+'-5.wav',
      'F2': 'wav/sound-'+x+'-6.wav',
      'F#2': 'wav/sound-'+x+'-7.wav',
      'G2': 'wav/sound-'+x+'-8.wav',
      'G#2': 'wav/sound-'+x+'-9.wav',
      'A2': 'wav/sound-'+x+'-10.wav',
      'A#2': 'wav/sound-'+x+'-11.wav',
      'C3': 'wav/sound-'+x+'-12.wav',
      'C#3': 'wav/sound-'+x+'-13.wav',
      'D3': 'wav/sound-'+x+'-14.wav',
      'D#3': 'wav/sound-'+x+'-15.wav',
      'E3': 'wav/sound-'+x+'-16.wav'
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