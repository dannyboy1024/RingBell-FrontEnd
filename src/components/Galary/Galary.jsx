import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import ListenerCard from "./ListenerCard";
// import { listenerData } from "./_listenerData";

var ListenerData = require("./_listenerData.json");


const Galary = () => {
  return (
    <div className="row -row-cols-3 g-3 home-p-container" id="galary-container">
      {ListenerData.map((listener) => (
        <div className="col-sm-12 col-lg-4" key={listener.name} >
          <ListenerCard
            listenerInfo={listener}
          />
        </div>
      ))}
    </div>
  );
};

export default Galary;
