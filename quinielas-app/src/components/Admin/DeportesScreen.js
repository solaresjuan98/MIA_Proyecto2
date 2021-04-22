import React, { useState, useEffect } from "react";
import axios from "axios";
import { TarjetaDeportes } from "./TarjetaDeportes";

export const DeportesScreen = () => {
  const [deportes, obtenerDeportes] = useState("");

  const [deporte, setDeporte] = useState({
    NombreDeporte: "",
  });

  const { NombreDeporte } = deporte;

  const url = "http://localhost:4000/deportes";

  useEffect(() => {
    obtenerListaDeportes();
  }, []);

  // ------- OBTENER LISTA DE DEPORTES -------
  const obtenerListaDeportes = () => {
    axios
      .get(url)
      .then((response) => {
        const listaDeportes = response.data;
        obtenerDeportes(listaDeportes);
        console.log(listaDeportes[1].Nombre);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Viva el real madrid <3");
    //console.log(NombreDeporte);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          <div className="card border-light mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nuevo deporte</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Nombre del deporte
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Nombre del deporte"
                    autoComplete="off"
                    //onChange={onChangeValue}
                    //value={NombreDeporte}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" class="btn btn-primary btn-block">
                    Crear deporte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm mb-5">
          <h2 className="mb-5">Deportes creados: </h2>
          <div className="container mt-5">
            <TarjetaDeportes deportes={deportes} />
          </div>
        </div>
      </div>
    </div>
  );
};
