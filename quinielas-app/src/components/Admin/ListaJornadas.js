import React from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";

export const ListaJornadas = (props) => {
  const url = "http://localhost:4000/";
  const { jornadas } = props;
  //console.log(jornadas)
  // Filtrar jornadas finalizadas
  const jornadasTerminadas = jornadas.filter(
    (jornada) => jornada.Estado === "Finalizada"
  );

  const jornadasAnteriores = jornadas.filter(
    (jornada) => jornada.Estado !== "Activa" || jornada.Estado !== "Finalizada"
  );

  // Filtrar jornadas activas
  const jornadasActivas = jornadas.filter(
    (jornada) => jornada.Estado === "Activa"
  );

  const handleFinalizarJornada = async (jornadaID) => {
    console.log(jornadaID);
    const solicitud = {
      Id_jornada: parseInt(jornadaID),
    };

    await axios
      .post(`${url}finalizarJornada`, solicitud)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(`Error: ${err}`));
    Swal.fire("Aviso", "Jornada finalizada", "success");
    //console.log(solicitud);
  };

  return (
    <div className="animate__animated animate__fadeInRight">
      <h4>Jornadas Activas </h4>

      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id temporada</th>
            <th scope="col">Nombre jornada</th>
            <th scope="col">Fecha inicio</th>
            <th scope="col">Fecha final </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {jornadasActivas.map((jornada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{jornada.Id_temporada}</td>
                <td>{jornada.Nombre_jornada}</td>
                <td>{moment(jornada.Fecha_inicio).format("l")}</td>
                <td>{moment(jornada.Fecha_final).format("l")}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleFinalizarJornada(jornada.Id_jornada)}
                  >
                    Finalizar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Jornadas Finalizadas </h4>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id temporada</th>

            <th scope="col">Jornada</th>
            <th scope="col">Fecha inicio</th>
            <th scope="col">Fecha final </th>
          </tr>
        </thead>
        <tbody>
          {jornadasTerminadas.map((jornada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{jornada.Id_temporada}</td>
                <td>{jornada.Nombre_jornada}</td>
                <td>{moment(jornada.Fecha_inicio).format("l")}</td>
                <td>{moment(jornada.Fecha_final).format("l")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Jornadas de años anteriores </h4>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id temporada</th>
            <th scope="col">Jornada</th>
          </tr>
        </thead>
        <tbody>
          {jornadasAnteriores.map((jornada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{jornada.Id_temporada}</td>
                <td>{jornada.Nombre_jornada}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
