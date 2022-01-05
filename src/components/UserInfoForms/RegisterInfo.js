import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import "./Userinfo.css";

const Joi = require('joi');
const registerURL = 'https://ringbell-api.herokuapp.com/api/v1/users'


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

  updateInputName = (e) => {
    // console.log(e);
    this.setState({
      name: e.target.value
    });
  }

  updateInputUniversity = (e) => {
    // console.log(e);
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
        alert('Registration successful!')
        console.log(response)
        this.storeLoginSession(response.data.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser();

    this.props.history.push('/RegisterSuccess');
  }

  render() {
    return (
      <div>
        <div class="left">
          <img class="left-logo" src="./logo.png" alt="EmpowerChange Logo"></img>
          <p class="left-text"> <b>Linkedin:EmpowerChange</b></p>
          <p class="left-text"> <b>Instagram: empowerchange_uoft</b></p>
          <p class="left-text"> <b>Email: contact.listener@gmail.com</b></p>
        </div>



        <Form onSubmit={this.handleSubmit} className="userinfo-form" class="right">

          <h3 class="info-form_heading">新用户注册</h3>
          <p class="font-weight-bold"> <b>所有信息只用于帮助摇铃人和倾听者更好更快捷地对接，解聆人平台不会在没有用户书面同意的情况下泄露任何私人信息 </b></p>

          <p class="text-danger">注：本平台暂时不适用于有自杀倾向/计划的学生使用。</p>
          <p class="font-weight-bold"> <b>如果你有自杀倾向或者计划，请拨打Good2Talk热线 <a href="tel:1-866-925-5454">+1-866-925-5454</a>，之后可以向接线员要求和Mandarin Speakers 接线。</b></p>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label><b>姓名 </b><span className="text-muted">(必填)</span></Form.Label>
            <Form.Control required="true" type="text" value={this.state.name} onChange={this.updateInputName} />
            <Form.Text className="text-muted">
              此信息将提供给倾听者
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>在读学校</b></Form.Label>
            <Form.Control type="text" value={this.state.university} onChange={this.updateInputUniversity} />
            <Form.Text className="text-muted">
              此信息将提供给倾听者
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>邮箱 </b><span className="text-muted">(必填)</span></Form.Label>
            <Form.Control required="true" type="email" value={this.state.email} onChange={this.updateInputEmail} />
            <Form.Text className="text-muted">
              请确保邮箱信息正确。系统将会通过邮箱向您发送倾听匹配信息
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>密码 </b><span className="text-muted">(必填)</span></Form.Label>
            <Form.Control required="true" type="text" value={this.state.password} onChange={this.updateInputPassword} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>微信号</b></Form.Label>
            <Form.Control type="text" value={this.state.WID} onChange={this.updateInputWechat} />
            <Form.Text className="text-muted">
              此信息将提供给倾听者
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>性别</b></Form.Label>
            <Form.Select value={this.state.gender} onChange={this.updateInputGender}>

              <option value="其他">其他</option>
              <option value="男">男</option>
              <option value="女">女</option>

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>您本科就读的专业是？</b></Form.Label> <br></br>
            <Form.Label>*学业/事业类摇铃请填写此栏，信息将用于协助匹配倾听者。</Form.Label>
            <Form.Control type="text" value={this.state.faculty} onChange={this.updateInputFaculty} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label><b>您是通过什么方式了解到解聆人团队或者倾听者项目的呢？</b></Form.Label>
            {['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  微信推文
                  type={type}
                  id={`default-${type}`}
                  label={"微信推文／公众号"}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  朋友介绍
                  type={type}
                  label={"朋友介绍"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  解聆人线下活动或讲座
                  type={type}
                  label={"解聆人线下活动或讲座"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />

                <Form.Check
                  其他
                  type={type}
                  label={"其他"}
                  id={`default-${type}`}
                  value={this.state.source}
                  onChange={this.updateInputSource}
                />
              </div>
            ))}
          </Form.Group>

          <br></br>

          <Button variant="primary" type="submit">
            注册
          </Button>
        </Form>
      </div>
    );
  }

}

export default RegisterInfo;


