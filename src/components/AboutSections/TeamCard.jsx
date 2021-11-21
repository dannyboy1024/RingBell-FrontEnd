import React, { useState } from "react";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";


// import "../../styles/ListenerCard.css";
// import "../../styles/ListenerInfoPopup.css";

const TeamCard = (props) => {
  const { name, intro, photo, details } = props.teamInfo;
  const [popup, setPopup] = useState(false);

  const cardClickHandler = (name) => {
    setPopup(true);
  };

  const popupCloseHandler = () => {
    setPopup(false);
  };

  return (
    <div className="galary-card-container">
      <div className="card galary-card" onClick={() => cardClickHandler(name)}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{intro}</p>
        </div>
        <img src={photo} className="card-img-top" alt="team_member_photo" />
      </div>

      <Modal
        show={popup}
        onHide={popupCloseHandler}
        className="listenerInfoPopup-modal"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="listenerInfoPopup-body">
          <Row>
            <Col xs={6} md={5}>
            <img src={photo} className="card-img-top" alt="photo" />
            </Col>
            <Col xs={12} md={7}>
              {details.map((detail) => {
                return (
                  <div>
                    <h6>{detail.heading}</h6>

                    {detail.contents.map((content) => {
                      return <p>{content}</p>;
                    })}
                  </div>
                );
              })}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamCard;
