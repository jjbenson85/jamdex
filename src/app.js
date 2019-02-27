import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Tone from 'tone'
import Header from './components/common/Header'


import './scss/style.scss'


class App extends React.Component {

  constructor(){
    super()

    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    axios.get('/api/users/1')
      .then(res => this.setState({ user: res.data }))
      .catch(err=> console.error(err.message))

    const that = this
    this.loop = new Tone.Sequence((time, beat) => {
      that.setState({transport: {beat, time}})
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')

  }

  render(){
    console.log(this.state)
    // if (!this.state) return <h1>Calm, the jams are coming...</h1>
    return(
      <div>
        <Header />
        <h1>The Index of Jams!</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
