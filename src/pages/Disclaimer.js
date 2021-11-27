import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/Disclaimer.css";

class Disclaimer extends Component {


  handleSubmit = (e) => {
    e.preventDefault();

    // console.log("after print state");
    // redirect to calender
    this.props.history.push('/Calendar');
  }



  render() {
   return (
     <div> 
     
    <Form onSubmit={this.handleSubmit} className="disclaimer-form">

    <p> <b>Information and privacy protection norms: </b> </p>
      <ol> 
        <i>
          <li>Record of the information and words of the clients' generated during the listening session, including but not limited to audio, video, photo, and chat records, will not be disclosed to any third party in any form. Notes taken during the listening session will be destroyed upon the conclusion of the listening session. </li>
          <li>The client must respect the listener's privacy and must not relay, disclose, or publicly release to any third party the listener's personal information, privacy, or personal experiences mentioned during the listening session.</li>
          <li>The client must respect the listener. If the client violates this Code during the listening session (e.g., display intention or conduct of malicious attacks or verbal abuse to the listener), the listener has the right to stop the session immediately.</li>
          <li>The Listener and all members of the Listener Platform will not disclose personally identifiable information about the client in any way or on any occasion.</li>
          <li>The Platform shall not relay, disclose, or publicly release to any third party, in whole or in part, the personal information, privacy, and personal experiences of the Platform users mentioned above.</li>
          <li>Exceptions to the confidentiality agreement: If the client disclose any intention or plan that may endanger self or other people, or otherwise involve illegal behavior during the listening session, the listener has the right to feedback the client's statement to the public security authorities.</li>
          
        </i>
      </ol>
      
      <p class="text-danger"> <b>Disclaimer</b></p>
      <p class="font-weight-bold">
         <i>
        <li>The platform is not responsible for the listener's behavior, speech, or any related extended areas of the listening process.</li>
        <li>After the end of the listening session, the relationship between the listener and the client will be terminated and the platform will not assume any responsibility or liability for any private or unilateral agreement between the listener and the client.</li>
        </i>
      </p>

      <Button variant="primary" type="submit">
        I have read and accept the terms and conditions, including user notice and disclaimer
      </Button>
    </Form>
    </div>
   ); 
  }

}

export default Disclaimer;


