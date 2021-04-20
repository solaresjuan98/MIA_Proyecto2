import React from "react";

export const TarjetaDeportes = (props) => {
  const { deportes } = props;

  if (deportes.length > 0) {
    return deportes.map((deporte, i) => {
      return (
        <div className="card border-dark mb-3">
          <div className="card-body">
            <h4 className="card-title">{deporte.Nombre}</h4>
            <p className="card-text"></p>
          </div>
        </div>
      );
    });
  } else {
    return <h2>Cargando...</h2>;
  }
};
