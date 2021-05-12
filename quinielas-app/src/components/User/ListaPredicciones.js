import React from "react";
import moment from 'moment'

export const ListaPredicciones = (props) => {
  const { ListaPredicciones } = props;
  //console.log(ListaPredicciones);
  return (
    <div className="animate__animated animate__fadeInUpBig">
      <table className="table">
        <thead className="thead-dark">
          <th scope="col">Fecha prediccion</th>
          <th scope="col">Equipo local</th>
          <th scope="col">Prediccion local</th>
          <th scope="col">Equipo visitante</th>
          <th scope="col">Prediccion visitante</th>
        </thead>
        <tbody>
          {ListaPredicciones.map((prediccion, i) => {
            return (
              <tr className="table-light animate__animated animate__pulse">
                <td>{moment(prediccion.Fecha_prediccion).format('LLL')}</td>
                <td>{prediccion.Equipo_local}</td>
                <td>{prediccion.Marcador_local}</td>
                <td>{prediccion.Equipo_visitante}</td>
                <td>{prediccion.Marcador_visitante}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
