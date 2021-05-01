import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, Id_temporada } = event;
  //console.log(event);
  return (
    <div>
      <span>{title}</span>
      {/*<strong>
        {" \n "} {user.name} {" \n "}
      </strong>*/}
      <br></br>
      <span>{Id_temporada} </span>
    </div>
  );
};
