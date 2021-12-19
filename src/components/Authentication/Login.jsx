import React, { Component,Fragment } from "react";
import axios from "axios";

import Form from "../common_components/Form";
import "./Login.css";

const Joi = require('joi');

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = () => {
    // call server
    alert("Login successful!");
  };

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="form">
          <h1>Login</h1>
          {this.renderInput("username", "Username", "", true)}
          {this.renderInput("password", "Password")}
          {this.renderSubmitBtn("Login")}
        </form>
      </div>
    );
  }
}

export default Login;