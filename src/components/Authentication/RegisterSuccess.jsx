import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Form from '../common_components/Form'
import './Login.css'

const Joi = require('joi')
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'

class RegisterSuccess extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }

  render() {
    return (
      <div className="login-container">
        <div className="form">
          <h3 className="form-mov">Registration success！</h3>
          {/* <p className="form-mov text-muted">Confirmation has been sent to your email.</p> */}
        </div>
      </div>
    )
  }
}

export default RegisterSuccess
