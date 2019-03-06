import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Auth from '../../lib/Auth'
// import Tone from '../../lib/tone'

import '../../scss/components/header.scss'


class Header extends React.Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false,
      form: null,
      data: this.getInitialData()
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout(){
    Auth.removeToken()
    this.setState({ loggedIn: false })
    this.props.updateUser()
    this.props.history.push('/')
  }

  getInitialData() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const sendData = this.state.data
    // for (const key in sendData){
    //   if (!sendData[key]) delete sendData[key]
    // }
    console.log('sendData',sendData)
    axios.post(`/api/${this.state.form}`, sendData)
      .then(res => {
        if(this.state.form === 'register') {
          return this.setState({ form: 'login', data: this.getInitialData() })
        }
        Auth.setToken(res.data.token)
        this.setState({ loggedIn: true, form: '', data: this.getInitialData() })
        this.props.updateUser()
      })
      .then(()=>this.props.history.push('/jam'))
      .catch(err => {
        console.error(err.response.data)
      })
  }

  handleChange(e){
    const {name, value} = e.target
    if (['email', 'username'].includes(name) && value.includes(' ')) return false
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleClick({ target: { name } }){
    name = this.state.form === name ? '':name
    this.setState({ form: name })
  }

  componentDidMount(){
    if (Auth.isAuthenticated()) this.setState({ loggedIn: true })
  }

  render(){
    console.table(this.state.data)
    return(
      <header>
        <div className="left">
          <Link to="/jamdex" className="nav-item"><h1>JamDex</h1></Link>
          {this.state.loggedIn &&<Link to="/jam" className="nav-item">My Jam</Link>}
          {this.state.loggedIn &&<Link to="/tapes" className="nav-item">My Tapes</Link>}
          {!this.state.loggedIn &&<Link to="/" className="nav-item">Demo Jam</Link>}
        </div>

        {!this.state.loggedIn &&
          <div className="right">
            <a
              className="nav-item"
              name="register"
              onClick={this.handleClick}
            >Register</a>
            <a
              className="nav-item"
              name="login"
              onClick={this.handleClick}
            >Login</a>
          </div>
        }
        {this.state.loggedIn &&
          <div className="right">
            <a
              className="nav-item"
              onClick={this.logout}
            >Log Out</a>
          </div>
        }
        <Register
          form={this.state.form}
          data={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Login
          form={this.state.form}
          data={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </header>
    )
  }
}

export default withRouter(Header)
