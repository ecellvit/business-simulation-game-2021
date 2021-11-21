import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import "./DashBoard.css";

function CreateTeamForm(props) {
  // const [teamName, setTeamName] = useState("");
  const teamIdInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const teamNameValue = teamIdInputRef.current.value;
    // https://futurepreneursbackend.herokuapp.com//api/public/createTeam
    // http://127.0.0.1:2000/api/public/createTeam
    fetch("https://futurepreneursbackend.herokuapp.com//api/public/createTeam", {
      method: "POST",
      body: JSON.stringify({ teamName: teamNameValue, creatorID: authCtx.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(teamNameValue, authCtx.id);
      })
      .catch((err) => {
        alert(err);
      });
    // props.refresh();
  };

  return (
    <div className="createTeamForm">
      <h4 style={{ marginBottom: "30px" }}>TeamForm</h4>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="teamID">Team Name</label>
        <input type="text" id="teamID" ref={teamIdInputRef} />
        <button
          className="createTeamButton"
          onClick={onSubmitHandler}
          type="button"
        >
          Create Team
        </button>
      </form>
    </div>
  );
}

export default CreateTeamForm;
