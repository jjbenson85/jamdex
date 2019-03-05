import React from 'react'

import Pad from '../controls/Pad'
import '../../scss/components/DrumInterface.scss'

class DrumInterface extends React.Component{
  constructor(){
    super()
    this.state={
      display: 'pitch',
      selectedVelocity: '100'
    }
    this.handleHard = this.handleHard.bind(this)
    this.handleMedium = this.handleMedium.bind(this)
    this.handleSoft = this.handleSoft.bind(this)
  }

  handleHard(){
    this.setState({selectedVelocity: '100'})
  }
  handleMedium(){
    this.setState({selectedVelocity: '70'})
  }
  handleSoft(){
    this.setState({selectedVelocity: '30'})
  }

  matrix(currentBeat, poly){
    poly.sort((A,B)=>A.step-B.step)
    poly.forEach((step)=>{
      step.poly_beats.sort((A,B)=>A.voice-B.voice)
    })
    const row = []
    const col = []
    for(let i=0; i<16; i++){
      row.push(i)
    }
    for(let i=0; i<4; i++){
      col.push(i)
    }

    return <div className='matrix'>
      {row.map((i)=>{
        const current = (i===currentBeat) && this.props.playing
        return <div
          key={i}
          // className={`col ${i===currentBeat?'current':''}`}
        >
          {col.map((j)=>{
            const velocity = poly[i].poly_beats[j].velocity
            const selected = velocity>0
            return <Pad
              key={j}
              selected={selected}
              current={current}
              velocity={velocity}
              onClick={()=>
                this.props.handleChange(
                  'DrumMachine',
                  this.props.id,
                  i,
                  j,
                  'velocity',
                  this.state.selectedVelocity
                )}
            />
          }
          )}
        </div>
      }
      )}
    </div>
  }
  render(){
    const {currentBeat, poly } = this.props
    return (
      <div className='drum-interface'>
        <div className='synth-case'>
          <div className='top-strip'>
            <div className='velocity-buttons'>
              <Pad current={this.state.selectedVelocity==='100'} velocity='100' onClick={this.handleHard}/>
              <Pad current={this.state.selectedVelocity==='70'} velocity='70' onClick={this.handleMedium}/>
              <Pad current={this.state.selectedVelocity==='30'} velocity='30' onClick={this.handleSoft}/>
            </div>
            <div className="drum-machine-logo">DrumMachine</div>
          </div>
          <div className='controller'>
            {this.matrix(currentBeat, poly)}
          </div>
        </div>
      </div>
    )
  }
}

export default DrumInterface
