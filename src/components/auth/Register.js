import React from 'react'

const Register = ({
  data,
  form,
  errors,
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
        className={`${errors._schema ? 'error':''}`}
      />
      <input
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        placeholder={'Email'}
        className={`${errors._schema ? 'error':''}`}
      />
      <input
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        placeholder={'Password'}
        className={`${errors.password || errors.password_confirmation ? 'error':''}`}
      />
      <input
        name="password_confirmation"
        type="password"
        value={data.password_confirmation}
        onChange={handleChange}
        placeholder={'Password Confirmation'}
        className={`${errors.password || errors.password_confirmation ? 'error':''}`}
      />
      <button>Register</button>
    </form>
  )
}

export default Register
