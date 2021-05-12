import React from "react";

export const EstadisticasScreen = () => {
  return (
    <div className="container-fluid mt-5">
      <h1>Estadisticas</h1>
      <hr />

      <div className="form-group">
        <label className="col-form-label" for="inputDefault">
          Selecciona una temporada:
        </label>
        <select
          className="custom-select"
          //onChange={handleIdTemporadaChange}
          //value={idTemporada}
        >
          <option>Selecciona una temporada...</option>
        </select>
      </div>

      <div className="mt-2">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Posicion</th>
              <th scope="col">Jugador</th>
              <th scope="col">P10</th>
              <th scope="col">P5</th>
              <th scope="col">P3</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};
