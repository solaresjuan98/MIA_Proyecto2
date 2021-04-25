import React, { useState, useEffect } from "react";
import axios from "axios";
import { TarjetaDeportes } from "./TarjetaDeportes";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

export const DeportesScreen = () => {
  const [deportes, obtenerDeportes] = useState("");

  const url = "http://localhost:4000/deportes";

  useEffect(() => {
    obtenerListaDeportes();
    const interval = setInterval(() => {
      obtenerListaDeportes();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // se puede destructurar, antes era formValues
  const [{ Nombre }, handleInputChange, reset] = useForm({
    Nombre: "",
  });

  //console.log(Nombre);

  // ------- OBTENER LISTA DE DEPORTES -------
  const obtenerListaDeportes = async () => {
    await axios
      .get(url)
      .then((response) => {
        const listaDeportes = response.data;
        obtenerDeportes(listaDeportes);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoDeporte = {
      id: deportes.length + 1,
      Nombre: Nombre,
    };

    const urlPost = "http://localhost:4000/crearDeporte";
    console.log(nuevoDeporte);
    axios
      .post(urlPost, nuevoDeporte)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    Swal.fire("Aviso", "Deporte creado con exito", "success");
    reset();
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
                    name="Nombre"
                    onChange={handleInputChange}
                    value={Nombre}
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
