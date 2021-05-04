import React from "react";

export const UserDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group">

            <li className="list-group-item d-flex justify-content-between align-items-center">
              Eventos
              <span className="badge badge-primary badge-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Mensajes
              <span className="badge badge-primary badge-pill">1</span>
            </li>

          </ul>
        </div>
        <div className="col-sm mb-5">
          <h1>Seccion de novedades</h1>
          <hr />
        </div>
      </div>
    </div>
  );
};
