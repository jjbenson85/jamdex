import React from 'react'

import Tapes from './Tapes'
import Loading from './common/Loading'

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
    if(!this.state) return <Loading />
    const jams = this.state.jams
    // console.log('JAM DEX jams',jams)
    jams.sort((A,B)=> B.applause - A.applause)
    // const tapes = jams.slice(1)
    return(
      <Tapes tapes={jams} disableSave={true}/>
    )
  }
}

export default Jamdex
