import { Component } from 'react'
import FormInput from './FormInput'
import PasswordInput from './PasswordInput'
import './LoginRegisterForm.css'
import LoginDialog from '../LoginDialog'

const Joi = require('joi');

class LoginRegisterForm extends Component {
  state = {
    before: true,
    processing: false,
    success: false,
    fail: false,
    message: '',
    paragraph: '',
    data: { email: '', password: '' },
    errors: {},
  }

  LoginSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  })

  RegisterSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  })

  Schema = (this.props.formType==="login" ? this.LoginSchema : this.RegisterSchema);


  validate = () => {
    const { error } = this.Schema.validate(this.state.data);
    let errors = {}
    if (error) error.details.map((e) => (errors[e.path] = e.message))
    return errors
  }

  validateChange = (targetName, targetValue) => {
    const errors = { ...this.state.errors }
    const { error } = this.Schema.validate({ [targetName]: targetValue })
    error
      ? (errors[targetName] = error.details[0].message)
      : delete errors[targetName]
    return errors
  }

  handleSubmit = (e) => {
    const errs = this.validate()
    this.setState({ 
      errors : errs,
      before : false,
      processing: true,
      message: 'Please wait ...'
    })
    if (Object.keys(errs).length) return
    this.doSubmit(e)
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data })
    this.setState({ errors: this.validateChange(input.name, input.value) })
  }

  renderInput(name, label, placeholder, isAutoFocus = false, type = 'text') {
    const data = { ...this.state.data }
    const errors = { ...this.state.errors}
    return (
      <FormInput
        type={type}
        isAutoFocus={isAutoFocus}
        label={label}
        value={data[name]}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    )
  }

  renderPassword(name, label, placeholder, isAutoFocus = false, type = 'text') {
    const data = { ...this.state.data }
    const errors = { ...this.state.errors}
    return (
      <PasswordInput
        type={type}
        isAutoFocus={isAutoFocus}
        label={label}
        value={data[name]}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    )
  }

  renderSubmitBtn(label) {
    return (
      <LoginDialog
          buttonDisabled={Object.keys(this.validate()).length !== 0}
          buttonName={label} 
          processing={this.state.processing} 
          success={this.state.success}
          fail={this.state.fail}
          message={this.state.message}
          paragraph={this.state.paragraph}
          handleSubmit={this.handleSubmit}
      /> 
    )
  }

}

export default LoginRegisterForm
