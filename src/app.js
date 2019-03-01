import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { Redirect } from 'react-router'
import axios from 'axios'
// import Tone from 'tone'
import Header from './components/common/Header'
import Home from './components/Home'

import Tapes from './components/Tapes'
import Jam from './components/Jam'

import './scss/style.scss'

class App extends React.Component {
  constructor(){
    super()

    this.state= {

    }
    this.updateUser = this.updateUser.bind(this)
  }
  updateUser(){
    console.log('update user')
    axios.get('/api/users/1')
      .then(res =>{
        console.log('App.js axios res',res.data)
        this.setState({user: res.data})
      } )
  }
  componentDidMount(){
    this.updateUser()
    // axios.get('/api/users/1')
    //   .then(res =>{
    //     console.log(res.data)
    //     this.setState({user: res.data})
    //   } )
  }

  render(){
    if(!this.state.user) return null
    const jams = this.state.user.created_jams
    const tapes = jams.slice(0,jams.length-1)
    const currentJam = jams[jams.length-1]

    const JamWithProps = () => {
      return (
        <Jam {...currentJam} updateUser={this.updateUser}/>
      )
    }
    const TapesWithProps = () => {
      return (
        <Tapes tapes={tapes}/>
      )
    }

    return(
      <BrowserRouter>
        <main>
          <Header />
          <Switch>
            <Route path="/jam" component={JamWithProps} />
            <Route path="/tapes" component={TapesWithProps} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
