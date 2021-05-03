import React from "react";

export const UserDashboard = () => {
  return (
    <div className="container-fluid mt-5">
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
        <h1>Titulo</h1>
      </div>
      
    </div>
  );
};
