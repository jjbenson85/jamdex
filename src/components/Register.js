import React from 'react'

import axios from 'axios'
import RegisterForm from './auth/RegisterForm'

class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      registerData: {},
      register: true,
      error: {}
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.changeState = this.changeState.bind(this)
    this.registerFunction = this.registerFunction.bind(this)

  }

  handleChange({target: {name, value}}){
    const registerData = {...this.state.registerData, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ registerData, errors })
  }

  registerFunction(e){
    e.preventDefault()
    console.log('registerFunction', this.state.registerData)
    axios
      .post('api/register', this.state.registerData)
      .then(res => {
        console.log(res)
        // Flash.setMessage('success', res.data.message)
        this.setState({...this.state,  registerData: {}, register: false})
        this.props.history.push('/')
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
  //   if(command === 'register' ) this.registerFunction()
  //   else this.loginFunction()
  // }

  render(){
    console.log(this.state)
    return(
      <section>
        <h1>Register</h1>
        <RegisterForm
          handleSubmit={this.registerFunction}
          handleChange={this.handleChange}
          data={this.state.registerData}
          errors={this.state.error}
          changeState={this.changeState}
        />
      </section>
    )
  }
}

export default Register
