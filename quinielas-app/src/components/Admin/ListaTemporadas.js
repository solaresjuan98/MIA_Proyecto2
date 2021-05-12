import React from "react";

export const ListaTemporadas = (props) => {
  const { temporadas } = props;

  const handleIniciarTemporada = (tempID) => {
    // Setear la jornada como activo
    console.log(tempID);
  };

  const handleTerminarJornada = (tempID) => {
    console.log(tempID);
  };

  // Filtrar jornadas activas
  const temporadasActivas = temporadas.filter(
    (temporada) => temporada.Estado === "Activo"
  );

  // Filtrar temporadas inactivas
  const temporadasInactivas = temporadas.filter(
    (temporada) => temporada.Estado !== "Activo"
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
                      handleTerminarJornada(temporada.Id_temporada)
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
                <td>{temporada.Deporte}</td>
                <td>{temporada.Estado}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleTerminarJornada(temporada.Id_temporada)
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
    </div>
  );

  /*return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>

            <th scope="col">Nombre temp</th>
            <th scope="col">Id. deporte</th>
            <th scope="col">Estado</th>
            <th scope="col"> {"  "} </th>
          </tr>
        </thead>
        <tbody>
          {temporadas.map((temporada, i) => {
            if (temporada.Estado === "Activo") {
              return (
                <tr className="table-light animate__animated animate__fadeInRight">
         
                  <td>{temporada.Nombre_temporada}</td>
                  <td>{temporada.Deporte}</td>
                  <td>{temporada.Estado}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleTerminarJornada(temporada.Id_temporada)
                      }
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr className="table-light animate__animated animate__fadeInRight">
                
                  <td>{temporada.Nombre_temporada}</td>
                  <td>{temporada.Deporte}</td>
                  <td>{temporada.Estado}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleIniciarTemporada(temporada.Id_temporada)
                      }
                    >
                      {" "}
                      Iniciar{" "}
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );*/
};
