import React from "react";
import fplogo from "../resources/images/fpLogo.svg";
import ecellLogo from "../resources/images/ecellLogo.svg";
import { Nav } from "./nav";
import "./SubmissionPage.css";

function Errorpage(props) {
  return (
    <div>
      <Nav />
      <img className="fp__logo" src={fplogo} alt="" />
      <p className="final__submission">
        {props.error}
      </p>
      <p className="thankyou__submission">Error!</p>
      <p className="final__submission">
        Please click on the button to Login back
      </p>
      <p className="final__submission">
        Please click on the button to go back to Dashboard
      </p>
      <p className="final__submission">
        Please click on the button below to login back
      </p>
      <img className="ecell__logo" src={ecellLogo} alt="" />
    </div>
  );
}

export default Errorpage;