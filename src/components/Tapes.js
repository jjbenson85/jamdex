import React from 'react'

import Jam from '../components/Jam'
import Loading from './common/Loading'
// import Cassette from './Cassette'

import '../scss/components/Tapes.scss'


class Tapes extends React.Component{
  constructor(){
    super()
    this.state = {
      playing: false,
      tapeId: ''
    }
    this.playTape = this.playTape.bind(this)
    this.stopTape = this.stopTape.bind(this)
  }

  componentDidMount(){
    const disabled = this.props.tapes.map((tape, i)=> false)
    this.setState({disabled})
  }

  playTape(tapeId){
    const disabled = this.props.tapes.map(()=> true)
    disabled[tapeId] = false
    this.setState({disabled, tapeId, playing: true})
  }

  stopTape(){
    const disabled = this.props.tapes.map(()=> false)
    this.setState({disabled, tapeId: '', playing: false})
  }



  render(){
    if(!this.state.disabled) return <Loading />

    return(
      <section className='tapes'>
        <div className="tape-container">
          {this.props.tapes.map((tape, i)=>{
            return(
              <Jam
                key={i}
                {...tape}
                tape={true}
                disabled={this.state.disabled[i]}
                playTape={()=>this.playTape(i)}
                stopTape={this.stopTape}
                disableSave={this.props.disableSave}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

export default Tapes
