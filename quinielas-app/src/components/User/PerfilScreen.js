import React from "react";

export const PerfilScreen = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-3">Datos de perfil</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>

        <h3 className="mb-3">Nombre: </h3>
        <h3 className="mb-3">Apellido: </h3>
        <h3 className="mb-3">Fecha de nacimiento: </h3>
        <h3 className="mb-3">Fecha de registro: </h3>
        <h3 className="mb-3">Correo electrónico: </h3>
        <h3 className="mb-3">Tier: </h3>
        <h3 className="mb-3">Tipo de membresia: </h3>
        <p className="lead">
          <button className="btn btn-primary btn-lg mt-5">Learn more</button>
        </p>
      </div>
    </div>
  );
};
