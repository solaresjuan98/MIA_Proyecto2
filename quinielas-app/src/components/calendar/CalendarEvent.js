import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user, prediccion } = event;

  return (
    <div>
      <span>{title}</span>
      {/*<strong>
        {" \n "} {user.name} {" \n "}
      </strong>*/}
      <br></br>
      <span>{prediccion}</span>
    </div>
  );
};
