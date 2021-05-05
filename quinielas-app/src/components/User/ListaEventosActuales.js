import React from "react";
import moment from "moment";

const ahora = moment().minutes(0).seconds(0);

export const ListaEventosActuales = (props) => {
  const { eventosActuales } = props;
  console.log(eventosActuales);
  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Local</th>
            <th scope="col">Visitante</th>
            <th scope="col">Fecha inicio</th>
          </tr>
        </thead>
        <tbody>
          {eventosActuales.map((evento, i) => {
            if (ahora < moment(evento.start)) {
              return (
                <tr className="table-light">
                  <td>{evento.Equipo_local}</td>
                  <td>{evento.Equipo_visitante}</td>
                  <td>{moment(evento.start).format("LLL")}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      
    </div>
  );
};
