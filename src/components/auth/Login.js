import React from 'react'

const Login = ({ data, form, errors, handleChange, handleSubmit }) => {
  return (
    <form
      name="login"
      onSubmit={handleSubmit}
      className={`${form === 'login' ? 'displayed':''}`}
    >
      <div>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder={'Email'}
          style={{ width: '25rem' }}
          className={`${errors.message ? 'error':''}`}
        />
        {errors.message && <p>{errors.message}</p>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder={'Password'}
          style={{ width: '25rem' }}
          className={`${errors.message ? 'error':''}`}
        />
        {errors.message && <p>{errors.message}</p>}
      </div>
      <div>
        <button>Log In</button>
      </div>
    </form>
  )
}

export default Login
