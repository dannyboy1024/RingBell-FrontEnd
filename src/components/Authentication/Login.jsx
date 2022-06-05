import { React, useState, useEffect } from 'react'
import axios from 'axios'
import './Login.css'
import LoginRegisterForm from '../common_components/LoginRegisterForm'

const Joi = require('joi')
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'

class Login extends LoginRegisterForm {
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
        this.setState({
          processing: false,
          success: true,
          message: 'Login Success! Taking you to the home page...'
        })
        this.toHomePage()
      })
      .catch((error) => {
        this.setState({
          processing: false,
          fail: true,
          message: 'Login expired. Please try again.'
        })
      })
  }

  doSubmit = async (e) => {
    e.preventDefault()
    // call server
    await axios
      .post(loginURL, {
          email: this.state.data.email,
          password: this.state.data.password,
      })
      .then((response) => {
        console.log(response.data.data)
        this.storeLoginSession(response.data.data)
      })
      .catch((error) => {
      const statusCode = error.response.status
        console.log(statusCode)
        this.setState({
          processing: false,
          fail: true
        })
        switch (statusCode) {
          case 401:
            console.log('Invalid password.')
            this.setState({
              message: 'Invalid password. Please try again.'
            })
            break
          case 404:
            console.log('User not found.')
            this.setState({
              message: 'User not found. Please Register first.'
            })
            break
          case 408:
            console.log("Timeout ignored.")
            this.setState({
              message: 'Timeout ignored. Please try again.'
            })
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
    // this.props.history.push('/')
    // window.location.reload(false)
    window.location.href = "/"
  }

  render() {
    return (
      <div className="login-container">
        <form className="form" formType="login">
          <h1>Login</h1>
          {this.renderInput('email', 'Email', '', true)}
          {this.renderPassword('password', 'Password')}
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
