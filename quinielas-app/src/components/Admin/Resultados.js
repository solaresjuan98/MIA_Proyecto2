import React, { useState, useEffect } from "react";
import axios from "axios";

export const Resultados = () => {
  const url = "http://localhost:4000/";
  const [temporadas, setTemporadas] = useState([]);
  const [idTemporada, setIdTemporada] = useState(temporadas);
  const [resultados, setResultados] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  useEffect(() => {
    obtenerListaTemporadas();
    obtenerListaResultados();
  }, []);

  // -------- OBTENER LISTADO DE TEMPORADAS --------
  const obtenerListaTemporadas = async () => {
    await axios.get(`${url}temporadas`).then((response) => {
      const listaTemporadas = response.data;
      setTemporadas(listaTemporadas);
    });
  };

  // -------- OBTENER LISTADO DE TEMPORADAS --------
  const obtenerListaResultados = async () => {
    await axios.get(`${url}resultados`).then((response) => {
      const listaResultados = response.data;
      setResultados(listaResultados);
    });
  };

  const handleIdTemporadaChange = (e) => {
    setIdTemporada(e.target.value);

    filtrarResultados(e.target.value);
  };

  const filtrarResultados = (idTemp) => {
    const resFiltrados = resultados.filter(
      (resultado) => resultado.Id_temporada === parseInt(idTemp)
    );
    console.log(resFiltrados);
    setResultadosFiltrados(resFiltrados);
  };

  return (
    <div className="container mt-5  animate__animated animate__fadeIn">
      <h1>Resultados</h1>
      <hr />
      <label>Selecciona una temporada</label>
      <select
        className="custom-select animate__animated animate__fadeIn"
        onChange={handleIdTemporadaChange}
        value={idTemporada}
      >
        <option>Selecciona una temporada...</option>
        {temporadas.map((temporada, i) => {
          return <option>{temporada.Id_temporada}</option>;
        })}
      </select>

      <div className="mt-5 animate__animated animate__fadeInLeft">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Jornada</th>
              <th scope="col">Equipo local</th>
              <th scope="col">Marcador local</th>
              <th scope="col">Equipo visitante</th>
              <th scope="col">Marcador visitante</th>
            </tr>
          </thead>
          <tbody>
            {resultadosFiltrados.map((resultado, i) => {
              return (
                <tr className="table-light">
                  <td>{resultado.Num_jornada}</td>
                  <td>{resultado.Equipo_local}</td>
                  <td>{resultado.Marcador_local}</td>
                  <td>{resultado.Equipo_visitante}</td>
                  <td>{resultado.Marcador_visitante}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
