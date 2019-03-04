import React from 'react'

import Tapes from './Tapes'

import axios from 'axios'

class Jamdex extends React.Component{
  componentDidMount(){
    console.log('mounted')
    axios.get('/api/jams')
      .then(res =>{
        // console.log('res',res.data)
        this.setState({jams: res.data})
      } )
  }
  render(){
    if(!this.state) return null
    const jams = this.state.jams
    // console.log('JAM DEX jams',jams)
    jams.sort((A,B)=> B.id - A.id)
    // const tapes = jams.slice(1)
    return(
      <Tapes tapes={jams} disableSave={true}/>
    )
  }
}

export default Jamdex
