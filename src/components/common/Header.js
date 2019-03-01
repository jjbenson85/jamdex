import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'

import '../../scss/header.scss'


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
  }

  handleChange({ target: name, value }){
    if ((name === 'email' || name === 'username') && value.includes(' ')) return
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null}
    this.setState({ data, errors })
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

  render(){
    return(
      <header>
        <div className="left">
          <Link to="/" className="nav-item">JamDex</Link>
          <Link to="/jam" className="nav-item">My Jam</Link>
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
          <div className="nav-item">Log Out</div>
        </div>
        }
        <Register
          display={this.state.forms.register}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          password_confirmation={this.state.password_confirmation}
          handleChange={this.handleChange}
        />
        <Login
          display={this.state.forms.login}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
        />

      </header>
    )
  }
}

export default withRouter(Header)
