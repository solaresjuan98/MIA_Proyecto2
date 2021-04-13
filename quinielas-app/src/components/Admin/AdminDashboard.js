import React from "react";

export const AdminDashboard = () => {
  return (
    <div className="container-fluid mt-5">
      {/*Dashboard*/}
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Mi perfil
              <span className="badge badge-primary badge-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Eventos
              <span className="badge badge-primary badge-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Mensajes
              <span className="badge badge-primary badge-pill">1</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Deportes
              <span className="badge badge-primary badge-pill">45</span>
            </li>
          </ul>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Capital de temporada</div>
            <div className="card-body">
              <h4 className="card-title">10354</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes bronze</div>
            <div className="card-body">
              <h4 className="card-title">4121</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes silver</div>
            <div className="card-body">
              <h4 className="card-title">10354</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes gold</div>
            <div className="card-body">
              <h4 className="card-title">4455</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-4">
          <h1>More content</h1>
        </div>

        <div className="col align-self-end">
          <h3>Tabla de posiciones</h3>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Posición</th>
                <th scope="col">Jugador</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
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
      </div>

      <div className="row mt-3">
        <div className="col-sm-4">
          <h1>More content</h1>
        </div>

        <div className="col align-self-end">One of three columns</div>
      </div>

      {/* ---------- */}
    </div>
  );
};
