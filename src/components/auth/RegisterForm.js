import React from 'react'

const RegisterForm  = ({ data, handleChange, handleSubmit, changeState, errors }) =>  {
  const{email, username, password, password_confirmation} = data
  return(
    <form onSubmit={handleSubmit} name="register">
      <div className="field">
        <label className="label is-skew">User Name</label>
        <div className="control">
          <input
            className="input is-skew"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={username || ''}/>
        </div>
        {errors.username && <small className="help is-danger">{errors.username}</small>}
      </div>

      <div className="field">
        <label className="label is-skew">Email</label>
        <div className="control">
          <input
            className="input is-skew"
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={email || ''}/>
        </div>
        {errors.email && <small className="help is-danger">{errors.email}</small>}
      </div>

      <div className="field">
        <label className="label is-skew">Password</label>
        <div className="control">
          <input
            className="input is-skew"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password || ''}/>
        </div>
        {errors.password && <small className="help is-danger">{errors.password  || ''}</small>}
      </div>

      <div className="field">
        <label className="label is-skew">Password Confirmation</label>
        <div className="control">
          <input
            className="input is-skew"
            type="password"
            placeholder="Password Confirmation"
            name="password_confirmation"
            onChange={handleChange}
            value={password_confirmation || ''}/>
        </div>
        {errors.password_confirmation && <small className="help is-danger">{errors.password_confirmation || ''}</small>}
      </div>

      <div className="field">
        <button className="button is-primary home-button is-skew" >Register</button>
      </div>
      <div>
        <p>Already have an account? <a  onClick={changeState}><span className="button is-small is-skew is-info">Sign in</span></a>.</p>
      </div>
    </form>
  )

}

export default RegisterForm
