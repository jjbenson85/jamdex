import React from 'react'

import noteRangeLookup from '../../lib/noteRangeLookup'
import '../../scss/components/DrumInterface.scss'



// import RangeInputs from './RangeInputs'

class DrumInterface extends React.Component{
  constructor(){
    super()
    this.state={
      display: 'pitch'
    }
  }

  matrix(currentBeat, poly){
    const row = []
    const col = []
    for(let i=0; i<16; i++){
      row.push(i)
    }
    for(let i=0; i<4; i++){
      col.push(i)
    }

    return <div className='matrix'>
      {row.map((i)=>
        <div
          key={i}
          className={`col ${i===currentBeat?'current':''}`}
        >
          {col.map((j)=>
            <div
              key={j}
              className={`pad ${poly[i][j].velocity?'selected':''}`}
              onClick={(e)=> this.props.handleChange(e, 'DrumMachine', j, i, j, '100')}
            >
            </div>)}
        </div>)}
    </div>
  }
  render(){
    const { id, currentBeat, currentPitch, currentVelocity, playing, handleChange, beats, poly } = this.props
    // console.log(poly)
    const {display} = this.state
    return (
      <div className='drum-interface'>
        <div className="synthSkin">
        </div>
        <div className="controller">
          {this.matrix(currentBeat, poly)}

        </div>
      </div>
    )
  }
}

export default DrumInterface
