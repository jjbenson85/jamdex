import React from 'react'


const LoginForm  = ({ data, handleChange, handleSubmit, changeState, errors }) =>  {
  console.log('LoginForm',errors)
  const{email, password} = data
  return(
    <form onSubmit={handleSubmit} name="login" >

      <div className="field" >
        <label className="label is-skew">Email</label>
        <div className="control">
          <input className="input is-skew" type="text" placeholder="Email" name="email" onChange={handleChange} value={email || ''}/>
        </div>
        {errors.email && <small className="help is-danger">{errors.email}</small>}
      </div>
      <div className="field">
        <label className="label is-skew">Password</label>
        <div className="control">
          <input className="input is-skew" type="password" placeholder="Password" name="password" onChange={handleChange} value={password || ''}/>
        </div>
        {errors.password && <small className="help is-danger">{errors.password}</small>}
      </div>
      <div className="field">
        <button className="button is-primary home-button is-skew" >Submit</button>
        <button className="button is-primary home-button is-skew" onClick={changeState}>Register</button>

      </div>
    </form>
  )

}

export default LoginForm
