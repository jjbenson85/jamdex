import React from 'react'

const Login = ({ email, password, handleChange, display, handleSubmit }) => {
  return (
    <form
      className={`login ${display ? 'displayed' : ''}`}
      onSubmit={(e) => handleSubmit(e, 'login')}
    >
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
      <button>Log In</button>
    </form>
  )
}

export default Login
