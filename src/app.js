import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
// import Tone from 'tone'
import Header from './components/common/Header'


import Jam from './components/Jam'

import './scss/style.scss'

class App extends React.Component {
  constructor(){
    super()

    this.state= {

    }
  }
  componentDidMount(){
    axios.get('/api/users/1')
      .then(res =>{
        console.log(res.data)
        this.setState({user: res.data})
      } )
  }

  render(){
    if(!this.state.user) return null
    const jams = this.state.user.created_jams
    const currentJam = jams[jams.length-1]
    return(
      <BrowserRouter>
        <main>
          {this.state.user && <Jam {...currentJam}/>}
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
