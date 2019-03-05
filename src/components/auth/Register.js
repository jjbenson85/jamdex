import React from 'react'

const Register = ({
  data,
  form,
  handleChange,
  handleSubmit
}) => {
  return (
    <form
      name="register"
      onSubmit={handleSubmit}
      className={`${form === 'register' ? 'displayed':''}`}
    >
      <input
        name="username"
        value={data.username}
        onChange={handleChange}
        placeholder={'Username'}
      />
      <input
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        placeholder={'Email'}
      />
      <input
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        placeholder={'Password'}
      />
      <input
        name="password_confirmation"
        type="password"
        value={data.password_confirmation}
        onChange={handleChange}
        placeholder={'Password Confirmation'}
      />
      <button>Register</button>
    </form>
  )
}

export default Register
