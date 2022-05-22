import React, { Component, Fragment } from 'react'
import axios from 'axios'

import LoginRegisterForm from '../common_components/LoginRegisterForm'
import './Login.css'


class RegisterFail extends LoginRegisterForm {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }

  render() {
    return (
      <div className="login-container">
        <div className="form">
          <h3 className="form-mov">Registration Failed！ Check if your email has already been used.</h3>
          {/* <p className="form-mov text-muted">Confirmation has been sent to your email.</p> */}
        </div>
      </div>
    )
  }
}

export default RegisterFail
