import React, { useState, useEffect } from "react";
import { Link, NavLink, HashRouter } from "react-router-dom";
import { Button, Badge, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let _organizationIntroData = require("./_introData.json");
const IntroData = _organizationIntroData[0];

export const HomeSection_1 = () => {
  return (
      <div>
        {" "}
        <h1 className="home-head-1">{IntroData.website_heading}</h1>
        <h1 className="home-subhead-1">{IntroData.website_subheading}</h1>
        <Badge
          as={Link}
          to="/UserInfo"
          style={{ textDecoration: 'none' }}
          pill
          className="home-button-1"
          variant="outline-primary"
        >
          START
        </Badge>
        {" "}
      </div>
  );
};

export const HomeSection_1_5 = () => {
  return (
    <div>
      <h1 className="home-head-1-5">Proudly Sponsored By</h1>
      <a href="https://www.tdinsurance.com/affinity/utorontoalumni?campaignid=affinitywebsite" target="_blank" rel="noopener noreferrer">
        <img className="home-head-1-5 home-subhead-1-5" src="sponsor1.png" alt="sponsor1"></img>
      </a>
    </div>
  );
};

export const Sponsorship = () => {
  return (
    <div className="homeblock homeblock-1-5">
        <HomeSection_1_5 />
    </div>
  );
}

export const HomeSection_2 = () => {
  return (
    <div>
      <h1 className="home-head-2">WHO ARE WE?</h1>
      <h1 className="home-subhead-2">Our story</h1>
      <div className="home-p-container">
        <p className="home-p-1">{IntroData.our_story_p1}</p>
        <p className="home-p-1">{IntroData.our_story_p2}</p>
        <p className="home-p-1">{IntroData.our_story_p3}</p>
        <p className="home-p-1">{IntroData.our_story_p4}</p>
      </div>
    </div>
  );
};

export const HomeSection_3 = () => {
  return (
      <div>
        <h1 className="home-head-3">BILINGUAL SERVICES</h1>
        <h1 className="home-head-3 home-subhead-3">
          <FontAwesomeIcon icon={["far", "star"]} />
        </h1>
        <div className="home-p-container">
          <p className="home-p-1">{IntroData.service_intro}</p>
        </div>
      </div>
  );
};

export const HomeSection_4 = () => {
  return (
    <div>
      <h1 className="home-head-4">OUR CORE VALUES</h1>
      <div className="home-p-container">
        <p className="home-p-1">{IntroData.core_values}</p>
      </div>
    </div>
  );
};
