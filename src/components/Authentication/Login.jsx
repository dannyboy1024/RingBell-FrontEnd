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
        alert('Get info successful!')
        const userInfo = response.data.data ? response.data.data : ''
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(localStorage.getItem('userInfo'))
        this.toHomePage();
      })
      .catch((error) => {
        alert('Login expried, tring again')
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
        alert('Invalid email and/or password.')
      })
  }

  toRegisterPage = () => {
    this.props.history.push('/Register')
  }

  toHomePage = () => {
    this.props.history.push('/')
    window.location.reload(false);
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
