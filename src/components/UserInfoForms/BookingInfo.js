import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Userinfo.css";

class BookingInfo extends Component {
    state = {
        name: '',
        email: '',
        university: '',
        WID: '',
        gender: '',
        matchUni: '',
        topic: '',
        extra_topic: '',
        faculty: '',
        need: [],
        extra_need: '',
        condition: '',
        extra_condition: '',
        availability: '',
        source: [],
        last_match_info: '',
        other_info: ''
    }

    updateInputMatchUni = (e) => {
        this.setState({
            matchUni: e.target.value
        });
    }

    updateInputExtraTopic = (e) => {
        this.setState({
            extra_topic: e.target.value
        });
    }

    updateInputNeed = (e) => {
        var needList = this.state.need;
        needList.push(e.target.value);
        this.setState({
            need: needList
        });
    }

    updateInputCondition = (e) => {
        // CheckColors(this.value);
        this.setState({
            condition: e.target.value
        });
    }

    updateInputExtraCondition = (e) => {
        this.setState({
            extra_condition: e.target.value
        });
    }

    updateInputOtherInfo = (e) => {
        this.setState({
            other_info: e.target.value
        });
    }

    updateInputLastMatchInfo = (e) => {
        this.setState({
            last_match_info: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const userInfoFromLogin = JSON.parse(window.sessionStorage.getItem('userInfo'));

        // windows Session storage
        window.sessionStorage.setItem("bellringer_info",
            JSON.stringify({
                "email": userInfoFromLogin.email,
                "name": userInfoFromLogin.name,
                "matchUni": userInfoFromLogin.matchUni
            })
        );
        // redirect to calender
        this.props.history.push('/Disclaimer');
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
                <h3 class="info-form_heading text-danger">IMPORTANT INFORMATION</h3>

                <p class="font-weight-bold"> <b>All information is used only to help clients and listeners to better and faster match. EmpowerChange will not disclose any private information without the user's written consent. </b></p>
                <p class="text-danger">Note: This platform is not intended for use by students with suicidal tendencies/plans. </p>
                <p class="font-weight-bold"> <b>If you have suicidal tendencies or plans, please call the Good2Talk hotline <a href="tel:1-866-925-5454">+1-866-925-5454</a></b></p>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>Want to be matched with a listener from which school?</b></Form.Label>
                        <Form.Select required="true" value={this.state.matchUni} onChange={this.updateInputMatchUni}>

                            <option value="University of Toronto">University of Toronto</option>
                            <option value="Western University">Western University</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>Which topics you want to talk about?</b></Form.Label>
                        <p>(For each session, please select one topic you want to focus on. If necessary, you can check other topics in the next listening session. This information will be provided to the listener.)</p>
                        <Form.Select value={this.state.topic} onChange={this.updateInputTopic}>
                            <option value="Other">Other</option>
                            <option value="Family Relationship">Family Relationship</option>
                            <option value="Romantic Relationship">Romantic Relationship</option>
                            <option value="Friendship">Friendship </option>
                            <option value="Academic Planning">Academic Planning </option>
                            <option value="Career Planning">Career Planning</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>If you choose “Others” for the above question, please enter the topic here. </b></Form.Label>
                        <Form.Control type="text" value={this.state.extra_topic} onChange={this.updateInputExtraTopic} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>What is your main need for this listening session</b></Form.Label>
                        {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                            Want to be heard
                            type={type}
                            id={1}
                            label={"Want to be heard"}
                            value={this.state.need}
                            onChange={this.updateInputNeed}
                            />

                            <Form.Check
                            Want to work with the listener to find solutions to problems
                            type={type}
                            label={"Want to work with the listener to find solutions to problems"}
                            id={2}
                            value={this.state.need}
                            onChange={this.updateInputNeed}
                            />

                            <Form.Check
                            Others
                            type={type}
                            label={"Others"}
                            id={3}
                            value={this.state.need}
                            onChange={this.updateInputNeed}
                            />
                        </div>
                        ))}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><b>If you choose “Others” for the above question, please enter the topic here. </b></Form.Label>
                        <Form.Control type="text" value={this.state.extra_need} onChange={this.updateInputExtraTopic} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>What is your current mental state?</b></Form.Label>
            <p>(This information will be provided to the listener.)</p>

            <Form.Select value={this.state.condition} onChange={this.updateInputCondition}>
              <option value="1">Excellent, want to share happy mood</option>
              <option value="2">Everything is normal, but sometimes I am lazy and can't get motivated, a little confused and anxious</option>
              <option value="3">Not so good, just experienced some setbacks, emotional instability</option>
              <option value="4">In a state of extreme depression and anxiety, need to see a psychiatrist</option>
              <option value="5">Already saw a psychiatrist, trying to get better relief from symptoms</option>
              <option value="6">Have occasional suicidal tendencies</option>
              <option value="7">Others</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>If you choose “Others” for the above question, please enter your mental state here.</b></Form.Label>
            <Form.Control type="text" value={this.state.extra_condition} onChange={this.updateInputExtraCondition} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><b>If you want to leave any messages for listeners, please fill it here.</b></Form.Label>
            <p>(A brief description of the situation will better help the listener understand the your current situation so that they can better prepare for the listening, so we suggest filling it out.)</p>
            <Form.Control as="textarea" rows={3} value={this.state.other_info} onChange={this.updateInputOtherInfo} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>If this is not your first time coming, please fill in the date of your last session and the name of the listener (format: date - listener's name)</b></Form.Label> <br></br>
            <Form.Control type="text" value={this.state.last_match_info} onChange={this.updateInputLastMatchInfo} />
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
          <p class="font-weight-bold text-danger">
            <b>
              Dear Bel ringer, the system will send you a confirmation email in 15 mintues through empowerchange.peerlistener@gmail.com
              to confirm your personal information and schedule details.
              The listener will send you messages and group chat QR code 10 minutes ahead of the meeting.
              Please check your email 10 minutes before the scheduled meeting time.
            </b>
          </p>

                    {/* <p>线上倾听将会在微信中进行。</p> */}


                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}

export default BookingInfo;


