import React from 'react'
import '../scss/header.scss'


const Header = (props) => {
  return(
    <header>
      <div className="left">
        <div className="nav-item">JamDex</div>
        <div className="nav-item">Home</div>
      </div>

      

      {!props.loggedIn &&
          <div className="right">
            <div className="nav-item">Register</div>
            <div className="nav-item">Login</div>
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

export default Header
