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
      <div>
        <input
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder={'Username'}
          className={`${errors.username ? 'error':''}`}
        />
        {errors.username && errors.username.map((error, i) =>
          <p key={i}>{error}</p>
        )}
      </div>
      <div>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder={'Email'}
          className={`${errors.email ? 'error':''}`}
        />
        {errors.email && errors.email.map((error, i) =>
          <p key={i}>{error}</p>
        )}
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder={'Password'}
          className={`${errors.password ? 'error':''}`}
        />
        {errors.password && errors.password.map((error, i) =>
          <p key={i}>{error}</p>
        )}
      </div>
      <div>
        <input
          name="password_confirmation"
          type="password"
          value={data.password_confirmation}
          onChange={handleChange}
          placeholder={'Password Confirmation'}
          className={`${errors.password_confirmation ? 'error':''}`}
        />
        {errors.password_confirmation && errors.password_confirmation.map((error, i) =>
          <p key={i}>{error}</p>
        )}
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  )
}

export default Register
