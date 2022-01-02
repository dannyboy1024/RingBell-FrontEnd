import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Form from '../common_components/Form'
import './Login.css'

const Joi = require('joi')
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'

class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  }

  doSubmit = () => {
    // call server
    axios
      .post(loginURL, {
        email: this.state.data.username,
        password: this.state.data.password,
      })
      .then((response) => {
        if(response.statusText === "OK"){
          alert('Login successful!')
        }else{
          alert('Invalid username or password.')
        }
        console.log(response)
      })
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="form">
          <h1>Login</h1>
          {this.renderInput('username', 'Username', '', true)}
          {this.renderInput('password', 'Password')}
          {this.renderSubmitBtn('Login')}
        </form>
      </div>
    )
  }
}

export default Login
