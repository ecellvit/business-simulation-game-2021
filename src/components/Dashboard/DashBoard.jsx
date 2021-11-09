import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import TeamList from './TeamList';


function DashBoard() {

  const authCtx = useContext(AuthContext);
  return (
    <div>
      <li>UserName: {authCtx.name}</li>
      <li>Email: {authCtx.emailid}</li>
      <button style={{margin:"3% 50%",fontSize:"30px"}}>Team</button>
      <TeamList />
    </div>
  )
}

export default DashBoard;
