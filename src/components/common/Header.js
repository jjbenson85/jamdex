import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Auth from '../../lib/Auth'

import '../../scss/components/header.scss'


class Header extends React.Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false,
      forms: {
        register: false,
        login: false
      },
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
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
  }

  handleSubmit(e, form){
    e.preventDefault()
    const data = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    axios.post(`/api/${form}`, this.state.data)
      .then(res => {
        if (form === 'login'){
          Auth.setToken(res.data.token)
          const forms = { login: false, register: false }
          this.setState({ loggedIn: true, forms })
          this.props.updateUser()
        } else console.log(res.data)
      })
      .then(() => {
        if (form === 'register'){
          this.handleClick('login')
        }
      })
      .then(() => {
        this.setState({ data })
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  handleChange(e){
    const {name, value} = e.target
    if ((name === 'email' || name === 'username') && value.includes(' ')) return
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleClick(name){
    let forms = {...this.state.forms}
    if (name === 'login') {
      forms = {
        register: false,
        login: !this.state.forms.login
      }
    } else if (name === 'register'){
      forms = {
        register: !this.state.forms.register,
        login: false
      }
    }
    this.setState({ forms })
  }

  componentDidMount(){
    if (Auth.isAuthenticated()) {
      this.setState({ loggedIn: true })
    }
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
              onClick={() => this.handleClick('register')}
            >Register</a>
            <a
              className="nav-item"
              onClick={() => this.handleClick('login')}
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
          display={this.state.forms.register}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          password_confirmation={this.state.password_confirmation}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Login
          display={this.state.forms.login}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

      </header>
    )
  }
}

export default withRouter(Header)
