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
      loggedIn: false
    }
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
          <a className="nav-item">Register</a>
          <a className="nav-item">Login</a>
        </div>
        }
        {this.state.loggedIn &&
        <div className="right">
          <div className="nav-item">Log Out</div>
        </div>
        }
        <Register />
        <Login />

      </header>
    )
  }
}

export default withRouter(Header)
