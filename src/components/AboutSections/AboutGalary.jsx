import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import TeamCard from "./TeamCard";
// import { listenerData } from "./_listenerData";

var TeamData = require("./_teamData.json");


const Galary = () => {
  return (
    <div className="row -row-cols-3 g-3 home-p-container" id="galary-container">
      {TeamData.map((member) => (
        <div className="col-sm-12 col-lg-4" key={member.name} >
          <TeamCard
            teamInfo={member}
          />
        </div>
      ))}
    </div>
  );
};

export default Galary;
