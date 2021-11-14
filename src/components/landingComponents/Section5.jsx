import React from "react";
import "./landingComponents.css";
import wss from "../../resources/sponsor/wss.png";
import cocacola from "../../resources/sponsor/cocacola.png";
import geeksmate from "../../resources/sponsor/geeksmate.png";
import intershala from "../../resources/sponsor/intershala.png";
import ixigo from "../../resources/sponsor/ixigo.png";
import paytm from "../../resources/sponsor/paytm.png";
import polygon from "../../resources/sponsor/polygon.png";
import portis from "../../resources/sponsor/portis.png";
import snapchat from "../../resources/sponsor/snapchat.png";
import xdc from "../../resources/sponsor/xdc.png";
import yourstory from "../../resources/sponsor/yourstory.png";

export function Section5(){
    return (
    <div className="page_container row Sapling">
            <h4 className="ta_center" style={{marginTop:'1rem'}}>Sponsors</h4>
           
            <div className="column ">
              
              <a href="https://wharfstreetstrategies.com/" target="blank">
                <img
                  src={wss}
                  className="center"
                  style={{ width: "90%", paddingTop: "10px" }}
                  alt="altimage"
                  align="left"
                />
              </a>
              
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://snapchat.com/" target="blank">
                <img
                  src={snapchat}
                  className="center"
                  style={{ width: "200%", paddingTop: "10px" }}
                  alt="altimage"
                  align="centre"
                />
              </a>
             
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://polygon.technology/" target="blank">
                <img
                  src={polygon}
                  className="center"
                  style={{ width: "90%", paddingTop: "10px", background: "black" }}
                  alt="altimage"
                  align="right"
                />
              </a>
              <br />
              <br />
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://www.coca-colaindia.com/" target="blank">
                <img
                  src={cocacola}
                  className="center"
                  style={{ width: "80%", paddingTop: "10px" }}
                  alt="altimage"
                />
              </a>
              <br />
             <br/>
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://portis.io/" target="blank">
                <img
                  src={portis}
                  className="center"
                  style={{ width: "60%", paddingTop: "10px" }}
                  alt="altimage"
                />
              </a>
              <br />
              
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://www.amdocs.com/products-services#/?utm_source=driveoperationalexcellencepage&utm_medium=amdocswebsite&utm_campaign=driveoperationalexcellencepagerightsectionlink" target="blank">
                <img
                  src={xdc}
                  className="center"
                  style={{ width: "25%", paddingTop: "10px" }}
                  alt="altimage"
                />
              </a>
              <br />
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://www.ixigo.com" target="blank">
                <img
                  src={ixigo}
                  className="center"
                  style={{ width: "35%", paddingTop: "10px" }}
                  alt="altimage"
                />
              </a>
              
              <br />
            </div>
            <div className="column ">
              <a href="https://geeksmate.in" target="blank">
                <img
                  src={geeksmate}
                  className="center"
                  style={{ width: "100%", paddingTop: "20px"}}
                  alt="altimage"
                />
              </a>
              <br/>
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://paytm.com" target="blank">
                <img
                  src={paytm}
                  className="center"
                  style={{ width: "60%",paddingTop: "10px" }}
                  alt="altimage"
                />
              </a>
              <br />
            </div>
            <div className="column large2 medium4 small6">
              <a href="https://yourstory.com/" target="blank">
                <img
                  src={yourstory}
                  className="center"
                  style={{ width: "60%" }}
                  alt="altimage"
                />
              </a>
              <br/>
            </div>

            <div className="column large2 medium4 small6">
              <a href="https://intershala.com/" target="blank">
                <img
                  src={intershala}
                  className="center"
                  style={{ width: "60%" }}
                  alt="altimage"
                />
              </a>
              <br />
            </div>

            
          </div>

         
    );
  }

