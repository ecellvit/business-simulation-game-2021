import React from "react";
import { Link } from "react-router-dom";

//Components
import { Nav } from "./nav";

//CSS
import "./SubmissionPage.css";

//Images
import fplogo from "../resources/images/fpLogo.svg";
import ecellLogo from "../resources/images/ecellLogo.svg";

function ErrorPage() {
  return (
    <div>
      <Nav />
      <img className="fp__logo" src={fplogo} alt="" />
      <p className="thankyou__submission">Error!</p>
      <div className="container">
        <div className="back__dashboard--container">
          <Link to="/Dashboard">
            <button className="back__to--dashboard">Back to Dashboard</button>
          </Link>
        </div>
      </div>
      <p className="final__submission">
        Please try logging out and logging back in!
      </p>
      <img className="ecell__logo" src={ecellLogo} alt="" />
    </div>
  );
}

export default ErrorPage;
