import React from 'react'

const Login = ({ data, form, handleChange, handleSubmit }) => {
  return (
    <form
      name="login"
      onSubmit={handleSubmit}
      className={`${form === 'login' ? 'displayed':''}`}
    >
      <input
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        placeholder={'Email'}
        style={{ width: '25rem' }}
      />
      <input
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        placeholder={'Password'}
        style={{ width: '25rem' }}
      />
      <button>Log In</button>
    </form>
  )
}

export default Login
