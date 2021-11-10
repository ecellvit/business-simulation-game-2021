import React from "react";

function TeamJoin(props) {
  return (
    <div>
      <div>
        <p>Team Name:{props.teamName}</p>
        <p>Team Leader:{props.teamLeader}</p>
        <p>Team Size:{props.teamSize}</p>
      </div>
    </div>
  );
}

export default TeamJoin;
