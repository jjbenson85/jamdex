import React from 'react'

import Tapes from './Tapes'
import Loading from './common/Loading'

import Auth from '../lib/Auth'

import axios from 'axios'

class MyTapes extends React.Component{
  componentDidMount(){
    console.log('mounted', Auth.getPayload().sub)
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res =>{
        console.log('res',res.data)
        this.setState({jams: res.data.created_jams})
      } )
  }
  render(){
    if(!this.state) return <Loading />

    const jams = this.state.jams
    // console.log('JAM DEX jams',jams)
    jams.sort((A,B)=> B.id - A.id)
    // const tapes = jams.slice(1)
    return(
      <Tapes tapes={jams} disableSave={false}/>
    )
  }
}

export default MyTapes
