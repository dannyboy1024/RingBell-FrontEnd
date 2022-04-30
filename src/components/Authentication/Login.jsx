import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Form from '../common_components/Form'
import './Login.css'

const Joi = require('joi')
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'

class Login extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  }

  storeLoginSession = async (token) => {
    await axios
      .get(loginURL, { params: { token: token } })
      .then((response) => {
        console.log('Get info successful!')
        const userInfo = response.data.data ? response.data.data : ''
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(window.sessionStorage.getItem('userInfo'))
        this.toHomePage()
      })
      .catch((error) => {
        alert('Login expired, please try again.')
      })
  }

  doSubmit = async () => {
    // call server
    await axios
      .post(loginURL, {
        email: this.state.data.email,
        password: this.state.data.password,
      })
      .then((response) => {
        alert('Login successful!')
        console.log(response.data.data)
        this.storeLoginSession(response.data.data)
      })
      .catch((error) => {
        const statusCode = error.response.status
        console.log(statusCode)
        switch (statusCode) {
          case 401:
            alert('Invalid password.')
            break
          case 404:
            alert('User not found.')
            break
          case 408:
            console.log("Timeout ignored.")
            break
          default:
            console.log(error)
        }
      })
  }

  toRegisterPage = () => {
    this.props.history.push('/Register')
  }

  toHomePage = () => {
    this.props.history.push('/')
    window.location.reload(false)
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="form" formType="login">
          <h1>Login</h1>
          {this.renderInput('email', 'Email', '', true)}
          {this.renderInput('password', 'Password')}
          {this.renderSubmitBtn('Login')}
          <button onClick={this.toRegisterPage} className="btn register-button">
            New User
          </button>
        </form>
      </div>
    )
  }
}

export default Login
