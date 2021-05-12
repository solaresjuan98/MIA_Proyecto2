import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";
import { ListaPredicciones } from "./ListaPredicciones";

export const PrediccionesUserScreen = () => {
  const url = "http://localhost:4000/";
  const { user } = useContext(AuthContext);
  //console.log(user.id);

  // --- ESTADO QUE MANEJA LA LISTA DE PREDICCIONES QUE HA HECHO EL CLIENTE QUE ESTA LOGUEADO ---
  //const [predicciones, setPredicciones] = useState([]);
  //_--- ESTADO DE LAS PREDICCIONES FILTRADAS
  const [prediccionesCliente, setPrediccionesCliente] = useState([]);

  useEffect(() => {
    obtenerPrediccionesCliente();
  }, []);

  //console.log(predicciones);

  const obtenerPrediccionesCliente = async () => {
    await axios
      .get(`${url}/predicciones`)
      .then((response) => {
        const listaPrediccionesCliente = response.data;

        const predCliente = listaPrediccionesCliente.filter(
          (prediccion) => prediccion.Id_cliente === parseInt(user.id)
        );

        setPrediccionesCliente(predCliente);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  return (
    <div className="container mt-5">
      <h1>Predicciones realizadas</h1>
      <hr />
      <ListaPredicciones ListaPredicciones={prediccionesCliente} />
    </div>
  );
};
