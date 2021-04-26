import React from "react";

export const ListaJornadas = (props) => {
  const { jornadas } = props;
  //console.log(jornadas)
  // Filtrar jornadas finalizadas
  const jornadasTerminadas = jornadas.filter(
    (jornada) => jornada.Estado === "Finalizada"
  );

  // Filtrar jornadas activas
  const jornadasActivas = jornadas.filter(
    (jornada) => jornada.Estado === "Activa"
  );

  return (
    <div>
      <h4>Jornadas Activas </h4>

      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id jornada</th>
            <th scope="col">Nombre jornada</th>
            <th scope="col">Id temporada</th>
            <th scope="col">Fecha inicio</th>
            <th scope="col">Fecha final </th>
          </tr>
        </thead>
        <tbody>
          {jornadasActivas.map((jornada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{jornada.Id_jornada}</td>
                <td>
                  J{jornada.Id_jornada}/{jornada.Anio}-Q{jornada.Id_temporada}
                </td>
                <td>{jornada.Id_temporada}</td>
                <td>{jornada.Fecha_inicio}</td>
                <td>{jornada.Fecha_final}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Jornadas Finalizadas </h4>
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id jornada</th>
            <th scope="col">Nombre jornada</th>
            <th scope="col">Id temporada</th>
            <th scope="col">Fecha inicio</th>
            <th scope="col">Fecha final </th>
          </tr>
        </thead>
        <tbody>
          {jornadasTerminadas.map((jornada, i) => {
            return (
              <tr className="table-light" key={i}>
                <td>{jornada.Id_jornada}</td>
                <td>
                  J{jornada.Id_jornada}/{jornada.Anio}-Q{jornada.Id_temporada}
                </td>
                <td>{jornada.Id_temporada}</td>
                <td>{jornada.Fecha_inicio}</td>
                <td>{jornada.Fecha_final}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
