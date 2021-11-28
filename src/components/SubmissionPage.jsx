import React from "react";
import fplogo from "../resources/images/fpLogo.svg";
import ecellLogo from "../resources/images/ecellLogo.svg";
import { Nav } from "./nav";
import "./SubmissionPage.css";
import { Link } from "react-router-dom";

function SubmissionPage() {
  return (
    <div>
      <Nav />
      <img className="fp__logo" src={fplogo} alt="" />
      <p className="thankyou__submission">Thank you</p>
      <div className="container">
        <div className="back__dashboard--container">
          <Link to="/Dashboard">
            <button className="back__to--dashboard">Back to Dashboard</button>
          </Link>
        </div>
      </div>

      <p className="final__submission">
        We are glad to have you today at FuturePreneurs 7.0, See you next time
      </p>
      <img className="ecell__logo" src={ecellLogo} alt="" />
    </div>
  );
}

export default SubmissionPage;
