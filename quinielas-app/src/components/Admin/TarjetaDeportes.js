import React from "react";
import axios from 'axios'
import Swal from 'sweetalert2'


export const TarjetaDeportes = (props) => {
  const { deportes } = props;

  const handleDelete = (deporteId) => {
    console.log(deporteId);

    // Ejecutar la peticion delete con axios
    /*await axios.delete(
      )*/
  };

  if (deportes.length > 0) {
    return deportes.map((deporte, i) => {
      return (
        <div className="card border-dark mb-3">
          <div className="card-body">
            <h4 className="card-title" key={i}>
              {deporte.Nombre}
            </h4>
            <button
              className="btn btn-danger mt-2"
              onClick={() => handleDelete(deporte.Id_deporte)}
            >
              Eliminar deporte
            </button>
            <p className="card-text"></p>
          </div>
        </div>
      );
    });
  } else {
    return <h2>Cargando...</h2>;
  }
};
