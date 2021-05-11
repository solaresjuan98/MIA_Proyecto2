import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export const PrediccionesScreen = () => {
  const url = "http://localhost:4000/";
  // Predicciones
  const [predicciones, setPredicciones] = useState([]);
  // Estado de clientes
  const [clientes, setClientes] = useState([]);
  // Estado de nickname
  const [nicknameUsuario, setNicknameUsuario] = useState("");
  // Estado de Id de usuario
  const [idCliente, setIdCliente] = useState("");
  // Predicciones filtradas
  const [prediccionesFiltradas, setPrediccionesFiltradas] = useState([]);

  useEffect(() => {
    obtenerListaClientes();
    obtenerPredicciones();
  }, []);

  const obtenerPredicciones = async () => {
    await axios
      .get(`${url}predicciones`)
      .then((response) => {
        const listaPredicciones = response.data;
        setPredicciones(listaPredicciones);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const obtenerListaClientes = async () => {
    await axios
      .get(`${url}clientes`)
      .then((response) => {
        const listaClientes = response.data;
        setClientes(listaClientes);
      })
      .catch((err) => console.error(`Error ${err}`));
  };

  const handleNicknameChange = (e) => {
    setNicknameUsuario(e.target.value);
    clientes.forEach((cliente) => {
      if (cliente.Nickname === e.target.value) {
        setIdCliente(parseInt(cliente.Id_cliente));
        filtrarPredicciones(cliente.Id_cliente);
        //console.log(cliente.Id_cliente);
      }
    });
  };

  const filtrarPredicciones = (id_cliente) => {
    const pFiltradas = predicciones.filter(
      (prediccion) => prediccion.Id_cliente === id_cliente
    );

    setPrediccionesFiltradas(pFiltradas);
    //console.log(pFiltradas);
  };

  return (
    <div className="container mt-5">
      <h1>Predicciones</h1>
      <hr />
      <label>Buscar predicciones por nombre de usuario</label>
      <select
        className="custom-select animate__animated animate__fadeIn"
        onChange={handleNicknameChange}
        value={nicknameUsuario}
      >
        <option selected="">Selecciona un nombre de usuario</option>
        {clientes.map((cliente) => {
          return <option>{cliente.Nickname}</option>;
        })}
      </select>

      <div className="mt-5">
        <table className="table">
          <thead className="thead-dark">
            <th scope="col">Fecha prediccion</th>
            <th scope="col">Equipo local</th>
            <th scope="col">Prediccion local</th>
            <th scope="col">Equipo visitante</th>
            <th scope="col">Prediccion visitante</th>
          </thead>
          <tbody>
            {prediccionesFiltradas.map((prediccion, i) => {
              return (
                <tr className="table-light animate__animated animate__pulse">
                  <td>{moment(prediccion.Fecha_prediccion).format('LLL')}</td>
                  <td>{prediccion.Equipo_local}</td>
                  <td>{prediccion.Marcador_local}</td>
                  <td>{prediccion.Equipo_visitante}</td>
                  <td>{prediccion.Marcador_visitante}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
