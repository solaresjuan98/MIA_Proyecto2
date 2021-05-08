import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, Id_temporada, Equipo_local, Equipo_visitante } = event;
  //console.log(event);
  return (
    <div>
      <span>
        {Equipo_local}
        {" vs "}
        {Equipo_visitante}
      </span>
      <br></br>
      <span>{Id_temporada} </span>
    </div>
  );
};
