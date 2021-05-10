import axios from "axios";
import React from "react";
//import axios from 'axios'
//import Swal from 'sweetalert2'

export const TarjetaDeportes = (props) => {
  const { deportes } = props;
  const url = "http://localhost:4000/";

  const handleDelete = (deporteId) => {
    console.log(deporteId);

    // Ejecutar la peticion delete con axios
    axios
      .delete(`${url}eliminarDeporteSP/${deporteId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  if (deportes.length > 0) {
    return deportes.map((deporte, i) => {
      return (
        <div
          className="card border-dark mb-3"
          style={{ backgroundColor: deporte.Color_deporte }}
        >
          <div className="row card-body animate__animated animate__fadeInDown">
            <div className="col-sm-6">
              <h5 className="card-title">{deporte.Nombre}</h5>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deporte.Id_deporte)}
              >
                Eliminar deporte
              </button>
            </div>
            {deporte.Foto_deporte !== "" ? (
              <img
                className="col-sm-6"
                src={deporte.Foto_deporte}
                alt="Card cap"
              />
            ) : (
              <span>No hay imagen disponible :(</span>
            )}
          </div>
        </div>
      );
    });
  } else {
    return <h2>Cargando...</h2>;
  }
};
