import React, { useState, useEffect } from "react";
import axios from "axios";
import {ListaEventosActuales} from '../User/ListaEventosActuales';

export const UserDashboard = () => {
  const url = "http://localhost:4000/";

  const [eventosActuales, setEventosActuales] = useState([]);

  useEffect(() => {
    //obtenerEventosActivos();
  }, []);

  

  const obtenerEventosActivos = () => {
    axios
      .get(`${url}tempActual`)
      .then((response) => {
        const listaEventos = response.data;
        setEventosActuales(listaEventos);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

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
          <h4>Proximos eventos</h4>
          <ListaEventosActuales eventosActuales={eventosActuales} />
        </div>
      </div>
    </div>
  );
};
