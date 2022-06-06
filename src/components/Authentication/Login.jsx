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

    console.log('token = ', token)
    // await fetch(loginURL + '?' + new URLSearchParams({
    //   token: token
    // }))
    // .then(response => {
    //   console.log(response)
    //   if (response.status===200) {
    //     return response.json()
    //   }
    //   return null;
    // })
    // .then((data) => {
    //   if (data===null) {
    //     this.setState({
    //       processing: false,
    //       fail: true,
    //       message: 'Login has expired. Please try again.'
    //     })
    //     return
    //   }
    //   console.log('Get info successful!')
    //   const userInfo = data.data ? data.data : ''
    //   window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    //   console.log(window.sessionStorage.getItem('userInfo'))
    //   this.setState({
    //     processing: false,
    //     success: true,
    //     message: 'Login Success! Taking you to the home page...'
    //   })
    //   this.toHomePage()
    // })
    // .catch((error) => {
    //   this.setState({
    //     processing: false,
    //     fail: true,
    //     message: 'Login has expired. Please try again.'
    //   })
    // })

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
          message: 'Login has expired. Please try again.'
        })
      })
  }

  doSubmit = async (e) => {
    e.preventDefault()

    // call server
    // await fetch(loginURL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:  JSON.stringify({
    //     email: this.state.data.email,
    //     password: this.state.data.password
    //   })
    // })
    // .then((response) => {
    //   const statusCode = response.status
    //   console.log(statusCode)
    //   switch (statusCode) {
    //     case 401:
    //       console.log('Invalid password.')
    //       this.setState({
    //         processing: false,
    //         fail: true,
    //         message: 'Invalid password. Please try again.'
    //       })
    //       return null
    //     case 404:
    //       console.log('User not found.')
    //       this.setState({
    //         processing: false,
    //         fail: true,
    //         message: 'User not found. Please Register first.'
    //       })
    //       return null
    //     case 408:
    //       console.log("Timeout ignored.")
    //       this.setState({
    //         processing: false,
    //         fail: true,
    //         message: 'Timeout ignored. Please try again.'
    //       })
    //       return null
    //     default:
    //       if (statusCode != 200) {
    //         this.setState({
    //           processing: false,
    //           fail: true,
    //           message: 'Unknown Error. Please try again.'
    //         })
    //         return null
    //       } else {
    //         return response.json()
    //       }
    //   }
    // })
    // .then((data) => {
    //     if (data !== null) {
    //       console.log('Success: ', data.data)
    //       this.storeLoginSession(data.data)
    //     }
    // })
    // .catch(error => console.error('Error: ', error))

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
            this.setState({
              message: 'Unknown Error. Please try again.'
            })
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
