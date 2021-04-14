import React from "react";

export const DeportesScreen = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          <h3>Crear nuevo deporte</h3>

          <div class="card border-light mb-3">
            <div class="card-header">Crear nuevo deporte </div>
            <div class="card-body">
              <h4 class="card-title">Light card title</h4>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm mb-5">
            <h2 className="mb-5">Deportes creados: </h2>
          <div
            className="card border-primary mb-3"
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
    </div>
  );
};
