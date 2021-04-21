import React from "react";
// Arui me quede
export const JornadasScreen = () => {
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-sm-4">
          <div className="card border-dark mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nueva temporada</h5>{" "}
            </div>
            <div className="card-body">
              <h4 className="card-title">4455</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm mb-5">
          <h2>Detalle de jornadas</h2>
          <hr />
          <div className="card border-dark mb-3">
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

      <div className="row mt-5">
        <div className="col-sm-4">
          <h3>Terminar jornada</h3>
        </div>

        <div className="col-sm"></div>
      </div>
    </div>
  );
};
