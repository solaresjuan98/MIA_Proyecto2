import React from "react";

export const PosicionesScreen = () => {
  return (
    <div className="container mt-5">
      <h2>TABLA DE POSICIONES</h2>
      <table className="table mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Posicion</th>
            <th scope="col">Jugador</th>
            <th scope="col">Last</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
