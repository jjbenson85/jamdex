import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Tone from 'tone'

import './scss/style.scss'


class App extends React.Component {

  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }))

    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')

  }

  render(){
    if (!this.state) return <h1>Calm, the jams are coming...</h1>
    return(
      <div>
        <h1>The Index of Jams</h1>
        <h2>Lovingly brought to you by...</h2>
        {this.state.users.map(user =>
          <h3 key={user.id}>{user.username}</h3>
        )}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
