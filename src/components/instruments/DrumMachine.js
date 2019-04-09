import React from 'react'
import Tone from '../../lib/tone'

class DrumMachine extends React.Component {
  constructor(){
    super()

  }

  componentDidUpdate(prevProps){
    // console.log('DRUM UPDATE', this.props, prevProps, this.props===prevProps)
    if(this.props.time === prevProps.time) return
    if(this.props.sync) this.rightPan.pan.value = 1
    else this.rightPan.pan.value = 0
    this.rightPan.pan.value = 1
    const level = this.meter.getLevel()
    this.props.level(level)
    this.props.poly.forEach((beat)=>{
      // if(!beat) return
      const level = (beat.velocity/127)
      this.sampler.triggerAttack(beat.pitch, this.props.time, level )
      // try{
      // }catch(err){
      //   null
      // }
    })
    // const level = (this.props.velocity/128)
    // const db = Tone.gainToDb(level)
    // this.drum.volume.value = db
    // if(prevProps.beat === this.props.beat) return
    //
    // // console.log('DM', this.props)
    // this.drum.get(this.props.pitch).start(this.props.time)
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
    // this.drum = new Tone.Players({
    //
    //   'C2': 'assets/wav/sound-'+x+'-1.wav',
    //   'C#2': 'assets/wav/sound-'+x+'-2.wav',
    //   'D2': 'assets/wav/sound-'+x+'-3.wav',
    //   'D#2': 'assets/wav/sound-'+x+'-4.wav'
    //   // 'E2': 'assets/wav/sound-'+x+'-5.wav',
    //   // 'F2': 'assets/wav/sound-'+x+'-6.wav',
    //   // 'F#2': 'assets/wav/sound-'+x+'-7.wav',
    //   // 'G2': 'assets/wav/sound-'+x+'-8.wav',
    //   // 'G#2': 'assets/wav/sound-'+x+'-9.wav',
    //   // 'A2': 'assets/wav/sound-'+x+'-10.wav',
    //   // 'A#2': 'assets/wav/sound-'+x+'-11.wav',
    //   // 'C3': 'assets/wav/sound-'+x+'-12.wav',
    //   // 'C#3': 'assets/wav/sound-'+x+'-13.wav',
    //   // 'D3': 'assets/wav/sound-'+x+'-14.wav',
    //   // 'D#3': 'assets/wav/sound-'+x+'-15.wav',
    //   // 'E3': 'assets/wav/sound-'+x+'-16.wav'
    //
    // }).toMaster()
    this.rightPan = new Tone.Panner(1)
    // this.rightPan.pan.value = 1
    this.sampler = new Tone.Sampler({
      'C2': 'assets/wav/sound-'+x+'-1.wav',
      'C#2': 'assets/wav/sound-'+x+'-2.wav',
      'D2': 'assets/wav/sound-'+x+'-3.wav',
      'D#2': 'assets/wav/sound-'+x+'-4.wav'
    }).chain(this.rightPan, Tone.Master)

    this.meter = new Tone.Meter()
    this.sampler.connect(this.meter)


  }
  render(){
    return (
      null
    )
  }
}

export default DrumMachine
