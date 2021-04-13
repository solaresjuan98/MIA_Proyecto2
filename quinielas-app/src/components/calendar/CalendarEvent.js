import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <span>{title}</span>
      <strong>
        {" \n "} {user.name} {"  "}
      </strong>
    </div>
  );
};
