import React from 'react'

class Register extends React.Component {
  constructor(){
    super()

    this.state = {

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: name, value }){
    if ((name === 'email' || name === 'username') && value.includes(' ')) return
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null}
    this.setState({ data, errors })
  }

  render(){
    return (
      <main>
        <form className="registration">
          <label>Username
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>Email
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label>Password Confirmation
            <input
              name="password_confirmation"
              type="password"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </main>
    )
  }
}

export default Register
