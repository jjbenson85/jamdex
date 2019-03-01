import React from 'react'

const Login = ({ email, password, handleChange, display }) => {
  return (
    <form className={`login ${display ? 'displayed' : ''}`}>
      <label>Email
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label>Password
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </label>
    </form>
  )
}

export default Login
