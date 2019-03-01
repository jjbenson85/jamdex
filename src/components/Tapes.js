import React from 'react'

import Jam from '../components/Jam'

class Tapes extends React.Component{
  render(){
    console.log('tapes', this.props)
    return(
      <section>
        <h1>Tapes</h1>
        {this.props.tapes.map((tape, i)=>{
          return <Jam key={i} {...tape} tape={true}/>
        })}
      </section>
    )
  }
}

export default Tapes
