import React from "react";
import moment from "moment";

const ahora = moment().minutes(0).seconds(0).add(1, "hours");
export const CalendarEvent = ({ event }) => {
  const { Id_temporada, Equipo_local, Equipo_visitante, start, end } = event;
  //console.log(event);
  //console.log(moment(start).format('LLL'))
  let momentoEvento = moment(start);

  if (ahora > momentoEvento) {
    //console.log('El evento ya paso hace rato');
  }

  if (ahora > momentoEvento) {
    return (
      <div style={{ backgroundColor: "#ccc" }}>
        <span>
          {Equipo_local}
          {" vs "}
          {Equipo_visitante}
        </span>
        <br></br>
        <span>{Id_temporada} </span>
      </div>
    );
  } else {
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
  }
};
