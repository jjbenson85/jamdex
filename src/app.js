import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { Redirect } from 'react-router'
import axios from 'axios'
import Auth from './lib/Auth'
// import Tone from '../../lib/tone'
import Header from './components/common/Header'
import Jamdex from './components/Jamdex'

import Tapes from './components/Tapes'
import Jam from './components/Jam'
import Loading from './components/common/Loading'

import './scss/style.scss'

class App extends React.Component {
  constructor(){
    super()

    this.state= {

    }
    this.updateUser = this.updateUser.bind(this)
  }
  updateUser(){
    console.log('update user', Auth.getPayload())
    const user = Auth.getPayload()
    if(user){
      axios.get(`/api/users/${user.sub}`)
        .then(res =>{
          console.log('App.js axios res',res.data)
          this.setState({user: res.data})
        } )
    }
  }
  componentDidMount(){
    this.updateUser()
    axios.get('/api/jams/top_jam')
      .then(res =>{
        console.log('top_jam',res.data)
        this.setState({top_jam: res.data})
      } )
  }

  render(){
    const loggedIn = Auth.getPayload().sub
    const loaded = !!this.state.user
    const loggedAndLoaded = loggedIn && loaded


    const TopJam = () => {
      console.log('topjam',this.state.top_jam)
      if(!this.state.top_jam) return <Loading />
      return (
        <Jam {...this.state.top_jam[0]} updateUser={this.updateUser} disableSave={true} topJam={true}/>
      )
    }

    // if(!this.state.user) return null
    // console.log('APPA',this.state, loggedIn, loaded, loggedAndLoaded)
    let JamWithProps
    let TapesWithProps
    if(loggedAndLoaded){
      // console.log('making jam with props')
      const jams = this.state.user.created_jams
      jams.sort((A,B)=> B.id - A.id)
      const tapes = jams.slice(1)
      const currentJam = jams[0]

      JamWithProps = () => {
        return (
          <Jam {...currentJam} updateUser={this.updateUser}/>
        )
      }
      TapesWithProps = () => {
        return (
          <Tapes tapes={tapes}/>
        )
      }
    }

    return(
      <BrowserRouter>
        <main>
          <Header updateUser={this.updateUser} />
          <Switch>
            <Route path="/jamdex" component={Jamdex} />
            {loggedIn &&
              <Route path="/jam" component={JamWithProps} />
            }
            {loggedIn &&
              <Route path="/tapes" component={TapesWithProps} />
            }
            <Route path="/" component={TopJam} />

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
