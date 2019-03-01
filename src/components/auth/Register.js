import React from 'react'

const Register = ({
  display,
  username,
  email,
  password,
  password_confirmation,
  handleChange,
  handleSubmit
}) => {
  return (
    <form
      className={`registration ${display ? 'displayed' : ''}`}
      onSubmit={(e) => handleSubmit(e, 'register')}
    >
      <label>Username
        <input
          name="username"
          value={username}
          onChange={handleChange}
        />
      </label>
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
      <label>Password Confirmation
        <input
          name="password_confirmation"
          type="password"
          value={password_confirmation}
          onChange={handleChange}
        />
      </label>
      <button>Register</button>
    </form>
  )
}

export default Register
