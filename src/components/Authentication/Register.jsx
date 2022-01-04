import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Form from '../common_components/Form'
import './Login.css'
import { dividerClasses } from '@mui/material'

const Joi = require('joi')
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'

class Register extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }

  RegisterSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  })

  // storeLoginSession = (token) => {
  //   axios
  //     .get(loginURL, { params: { token: token } })
  //     .then((response) => {
  //       alert('Get info successful!')
  //       const userInfo = response.data.data ? response.data.data : ''
  //       localStorage.setItem('userInfo', JSON.stringify(userInfo))
  //       console.log(localStorage.getItem('userInfo'))
  //     })
  //     .catch((error) => {
  //       alert('Login expried, tring again')
  //       this.storeLoginSession(token)
  //     })
  // }

  // doSubmit = async () => {
  //   // call server
  //   await axios
  //     .post(loginURL, {
  //       email: this.state.data.username,
  //       password: this.state.data.password,
  //     })
  //     .then((response) => {
  //       alert('Login successful!')
  //       console.log(response.data.data)
  //       this.storeLoginSession(response.data.data)
  //     })
  //     .catch((error) => {
  //       alert('Invalid username and/or password.')
  //     })
  // }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="form" formType="login">
          <h1>Register</h1>
          {this.renderInput('username', 'Username', '', true)}
          {this.renderInput('password', 'Password')}
          {this.renderSubmitBtn('Join')}
        </form>
      </div>
    )
  }

}

export default Register
