import React from "react";

export const MembresiaScreen = () => {
  return (
    <div className="container mt-5">
      <h1>Información de membresia</h1>

      <p>Mostrar aqui si el usuario en cuestion tiene una membresia </p>

      <div className="row mt-5">
        <div className="col-sm">
          <div
            className="card text-white bg-warning mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia gold</div>
            <div className="card-body">
              <h4 className="card-title">Precio</h4>
              <h3 className="card-text text-dark">Q. 900.00</h3>
              <button type="button" className="btn btn-primary mt-3">
                Comprar
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            className="card text-white bg-secondary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia silver</div>
            <div className="card-body">
              <h4 className="card-title">Precio</h4>
              <h3 className="card-text text-dark">Q. 450.00</h3>
              <button type="button" className="btn btn-primary mt-3">
                Comprar
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            className="card text-white bg-danger mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia bronze</div>
            <div className="card-body">
              <h4 className="card-title">Precio</h4>
              <h3 className="card-text text-dark">Q. 150.00</h3>
              <button type="button" className="btn btn-primary mt-3">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3>Cancelar membresia</h3>
    </div>
  );
};
