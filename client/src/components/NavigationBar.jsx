import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import "./NavigationBar.css";
// props.bgcolor
function NavigationBar(props) {
  return (
    <div style={{ background:"#5b10a8" , height: "72px"}}>
      <ul className="MenuOptions">
        <Link to="">
          <li className="item1">
            <NavItem
              color={props.itemcolor}
              option="Login"
              bgcolor={props.bgcolor}
              hovercolor={props.hovercolor}
              hoverbgcolor={props.hoverbgcolor}
            />
          </li>
        </Link>
        <Link to="/Mainpage">
          <li className="item2">
            <NavItem
              color={props.itemcolor}
              option="Mainpage"
              bgcolor={props.bgcolor}
              hovercolor={props.hovercolor}
              hoverbgcolor={props.hoverbgcolor}
            />
          </li>
        </Link>
        <Link to="/Round1">
          <li className="item3">
            <NavItem
              color={props.itemcolor}
              option="Start"
              bgcolor={props.bgcolor}
              hovercolor={props.hovercolor}
              hoverbgcolor={props.hoverbgcolor}
            />
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default NavigationBar;
