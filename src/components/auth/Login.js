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
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            name="password_confirmation"
            type="password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
          />
        </form>
      </main>
    )
  }
}

export default Register
