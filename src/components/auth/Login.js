import React from 'react'

const Login = ({ email, password, handleChange, display }) => {
  return (
    <main>
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
    </main>
  )
}

export default Login
