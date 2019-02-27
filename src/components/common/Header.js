import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import '../../scss/header.scss'


const Header = (props) => {
  return(
    <header>
      <div className="left">
        <Link to="/" className="nav-item">JamDex</Link>
        <Link to="/jam" className="nav-item">My Jam</Link>
      </div>



      {!props.loggedIn &&
          <div className="right">
            <Link to="/register" className="nav-item">Register</Link>
            <Link to="/login" className="nav-item">Login</Link>
          </div>
      }
      {props.loggedIn &&
        <div className="right">
          <div className="nav-item">Log Out</div>
        </div>
      }
    </header>
  )
}

export default withRouter(Header)
