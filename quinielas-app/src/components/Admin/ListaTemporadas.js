import React from "react";

export const ListaTemporadas = (props) => {
  const { temporadas } = props;

  const handleIniciarTemporada = (tempID) => {
    // Setear la jornada como activo
    console.log(tempID);
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {/*<th scope="col">Id</th>*/}
            {/*<th scope="col">Id temporada</th>*/}
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
                <tr className="table-light">
                  {/*<th scope="row">{temporada.Id_temporada}</th>*/}
                  <td>{temporada.Nombre_temporada}</td>
                  <td>{temporada.Deporte}</td>
                  <td>{temporada.Estado}</td>
                  <td>
                    <button className="btn btn-danger">Finalizar</button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr className="table-light animate__animated animate__fadeInRight">
                  {/*<th scope="row">{temporada.Id_temporada}</th>*/}
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
  );
};
