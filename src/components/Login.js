import React from 'react'

import axios from 'axios'
import LoginForm from './auth/LoginForm'

class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      loginData: {
        email: '',
        password: ''
      },
      register: true,
      error: {}
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.changeState = this.changeState.bind(this)
    this.loginFunction = this.loginFunction.bind(this)

  }

  handleChange({target: {name, value}}){
    const loginData = {...this.state.loginData, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ loginData, errors })
  }

  loginFunction(e){
    e.preventDefault()
    console.log('loginFunction', this.state.loginData)
    axios
      .post('api/login', this.state.loginData)
      .then(res => {
        console.log(res)
        // Flash.setMessage('success', res.data.message)
        this.setState({...this.state,  loginData: {}, register: false})
        this.props.history.push('/jam')
      })
      .catch(err =>this.setState({...this.state, error: err.response.data }))
  }

  changeState(){
    this.setState({...this.state, register: !this.state.register })
  }

  // handleSubmit(e){
  //   e.preventDefault(e)
  //   console.log(e)
  //   const command = e.target.name
  //   if(command === 'register' ) this.loginFunction()
  //   else this.loginFunction()
  // }

  render(){
    console.log(this.state)
    return(
      <section>
        <h1>Register</h1>
        <LoginForm
          handleSubmit={this.loginFunction}
          handleChange={this.handleChange}
          data={this.state.loginData}
          changeState={this.changeState}
          errors={this.state.error}
        />
      </section>
    )
  }
}

export default Register
