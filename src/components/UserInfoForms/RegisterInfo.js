import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import "./Userinfo.css";

const Joi = require('joi');
const registerURL = 'https://ringbell-api.herokuapp.com/api/v1/users'
const loginURL = 'https://ringbell-api.herokuapp.com/api/v1/users/login'


class RegisterInfo extends Component {
  state = {
    name: '',
    email: '',
    university: '',
    WID: '',
    gender: '',
    faculty: '',
    availability: '',
    password: '',
    errors: {}
  }


  storeLoginSession = async (token) => {
    await axios
      .get(loginURL, { params: { token: token } })
      .then((response) => {
        console.log('Get info successful!')
        const userInfo = response.data.data ? response.data.data : ''
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(window.sessionStorage.getItem('userInfo'))
      })
      .catch((error) => {
        console.log(error)
        alert('Login expired, please try again.')
      })
  }

  updateInputName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  updateInputUniversity = (e) => {
    this.setState({
      university: e.target.value
    });
  }

  updateInputEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  updateInputPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  updateInputWechat = (e) => {
    this.setState({
      WID: e.target.value
    });
  }

  updateInputGender = (e) => {
    this.setState({
      gender: e.target.value
    });
  }

  updateInputFaculty = (e) => {
    this.setState({
      faculty: e.target.value
    });
  }

  createUser = async () => {
    await axios
      .post(registerURL, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        info: {
          ...this.state
        }
      })
      .then((response) => {
        console.log('Registration successful!')
        this.storeLoginSession(response.data.data)
        this.props.history.push('/RegisterSuccess');
      })
      .catch((error) => {
        console.log(error)
        if(error.response){
          this.props.history.push('/RegisterFail');
        }
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser();    
  }

  render() {
    return (
      <div>
        <div class="left">
          <img class="left-logo" src="./logo.png" alt="EmpowerChange Logo"></img>
          <p class="left-text"> <b>LinkedIn: <a href="https://www.linkedin.com/company/listeners/">EmpowerChange</a></b></p>
          <p class="left-text"> <b>Instagram: <a href="https://www.instagram.com/empowerchange_uoft/?hl=en">empowerchange_uoft</a></b></p>
          <p class="left-text"> <b>Email: contact.listener@gmail.com</b></p>
        </div>



        <Form onSubmit={this.handleSubmit} className="userinfo-form" class="right">

          <h3 class="info-form_heading">New User Register</h3>
          <h3 class="info-form_heading text-danger">IMPORTANT INFORMATION</h3>

          <p class="font-weight-bold"> <b>All information is used only to help clients and listeners to better and faster match. EmpowerChange will not disclose any private information without the user's written consent. </b></p>
          <p class="text-danger">Note: This platform is not intended for use by students with suicidal tendencies/plans. </p>
          <p class="font-weight-bold"> <b>If you have suicidal tendencies or plans, please call the Good2Talk hotline <a href="tel:1-866-925-5454">+1-866-925-5454</a></b></p>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label><b>Name </b><span className="text-muted">(*Required)</span></Form.Label>
            <Form.Control required="true" type="text" value={this.state.name} onChange={this.updateInputName} />
            <Form.Text className="text-muted">
            (This information will be provided to the listener.)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>Your School</b></Form.Label>
            <Form.Control required="true" type="text" value={this.state.university} onChange={this.updateInputUniversity} />
            <Form.Text className="text-muted">
            (This information will be provided to the listener.)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Email</b><span className="text-muted">(*Required)</span></Form.Label>
            <Form.Control required="true" type="email" value={this.state.email} onChange={this.updateInputEmail} />
            <Form.Text className="text-muted">
            Please make sure the email is entered correctly as confirmation email will be sent to your email address.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>Password </b><span className="text-muted">(*Required)</span></Form.Label>
            <Form.Control required="true" type="text" value={this.state.password} onChange={this.updateInputPassword} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>Wechat ID</b></Form.Label>
            <Form.Control type="text" value={this.state.WID} onChange={this.updateInputWechat} />
            <Form.Text className="text-muted">
             (This information will be provided to the listener.)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>Gender</b></Form.Label>
            <Form.Select value={this.state.gender} onChange={this.updateInputGender}>

              <option value="Male">Male</option>
              <option value="Male">Female</option>
              <option value="Non-binary">Non-binary</option>

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>What is your major?</b></Form.Label> <br></br>
            <Form.Label>(*For Academic/Career session, Please fill out this field and the information will be used to assist in matching listeners.)</Form.Label>
            <Form.Control type="text" value={this.state.faculty} onChange={this.updateInputFaculty} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>How did you find out about the EmpowerCHANGE or the listening program?</b></Form.Label>
            {['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  WeChat tweets and Public
                  type={type}
                  id={`default-${type}`}
                  label={"WeChat tweets / Public"}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  Friend introduction
                  type={type}
                  label={"Friend's introduction"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  Offline event or seminar
                  type={type}
                  label={"Offline event or seminar"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  Google searching
                  type={type}
                  label={"Google searching"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  Others
                  type={type}
                  label={"Others"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />
              </div>
            ))}
          </Form.Group>

          <br></br>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }

}

export default RegisterInfo;


