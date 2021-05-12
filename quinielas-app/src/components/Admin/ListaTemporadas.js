import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const ListaTemporadas = (props) => {
  const { temporadas } = props;

  const url = "http://localhost:4000/";

  const handleTerminarTemporada = async (tempID) => {
    console.log(tempID);

    //console.log(jornadaID);
    const solicitud = {
      Id_jornada: parseInt(tempID),
    };

    await axios
      .post(`${url}finalizarTemporada`, solicitud)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(`Error: ${err}`));
    Swal.fire("Aviso", "Temporada finalizada", "success");
  };

  // Filtrar jornadas activas
  const temporadasActivas = temporadas.filter(
    (temporada) => temporada.Estado === "Activo"
  );

  // Filtrar temporadas inactivas
  const temporadasInactivas = temporadas.filter(
    (temporada) =>
      temporada.Estado !== "Activo" || temporada.Estado === "Finalizada"
  );

  return (
    <div className="animate__animated animate__fadeInRight">
      <h4>Temporadas activas </h4>

      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre temp</th>
            <th scope="col">Id. deporte</th>
            <th scope="col">Estado</th>
            <th scope="col"> {"  "} </th>
          </tr>
        </thead>
        <tbody>
          {temporadasActivas.map((temporada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{temporada.Nombre_temporada}</td>
                <td>{temporada.Deporte}</td>
                <td>{temporada.Estado}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleTerminarTemporada(temporada.Id_temporada)
                    }
                  >
                    Finalizar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Temporadas Finalizadas</h4>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre temp</th>
            <th scope="col">Id. deporte</th>
            <th scope="col">Estado</th>
            <th scope="col"> {"  "} </th>
          </tr>
        </thead>
        <tbody>
          {temporadasInactivas.map((temporada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{temporada.Nombre_temporada}</td>
                <td>{temporada.Id_temporada}</td>
                <td>{temporada.Estado}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
