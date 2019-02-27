import React from 'react'


const Login  = ({ data, handleChange, handleSubmit, changeState, errors }) =>  {

  const{email, password} = data
  return(
    <form onSubmit={handleSubmit} name="login" >

      <div className="field" >
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" placeholder="Email" name="email" onChange={handleChange} value={email || ''}/>
        </div>
        {errors.email && <small className="help is-danger">{errors.email}</small>}
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password" name="password" onChange={handleChange} value={password || ''}/>
        </div>
        {errors.password && <small className="help is-danger">{errors.password}</small>}
      </div>
      <div className="field">
        <button className="button is-primary home-button" >Submit</button>
        <button className="button is-primary home-button" onClick={changeState}>Register</button>

      </div>
    </form>
  )

}

export default Login
