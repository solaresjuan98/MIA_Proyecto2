import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import moment from "moment";
import { ListaJornadas } from "./ListaJornadas";

const ahora = moment().minutes(0).seconds(0).add(1, "hours");
const fin = ahora.clone().add(1, "week");

export const JornadasScreen = () => {
  // Estado de las fechas
  const [fechaInicio, setFechaInicio] = useState(ahora.toDate());
  const [fechaFin, setFechaFin] = useState(fin.toDate());

  // Estado temporadas
  const [temporadas, obtenerTemporadas] = useState([]);
  // Estado jornadas
  const [jornadas, obtenerJornadas] = useState([]);

  // URL DE LA API
  const url = "http://localhost:4000/";

  useEffect(() => {
    obtenerListaTemporadas();
    obtenerListaJornadas();
  }, []);

  // ------- OBTENER LISTA DE TEMPORADAS -------
  const obtenerListaTemporadas = () => {
    axios
      .get(`${url}temporadas`)
      .then((response) => {
        const listaTemporadas = response.data;
        obtenerTemporadas(listaTemporadas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleInicioJornadaChange = (e) => {
    console.log(e);
  };

  const handleFinJornadaChange = (e) => {
    console.log(e);
  };

  // ------- OBTENER LISTA DE JORNADAS -------
  const obtenerListaJornadas = () => {
    axios
      .get(`${url}jornadas`)
      .then((response) => {
        const listaJornadas = response.data;
        obtenerJornadas(listaJornadas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  // Filtrar jornadas terminadas
  //const jornadasTerminadas = jornadas.filter((jornada) => jornada.Estado === 'Finalizada');
  //console.log(jornadasTerminadas);

  //console.log(moment(ahora).format("l"));
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-sm-4">
          <div className="card border-dark mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nueva jornada</h5>{" "}
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="col-form-label">Temporada</label>
                  <select className="custom-select">
                    <option selected="custom-select">
                      Selecciona una Temporada...
                    </option>
                    {temporadas.map((temporada) => (
                      <option key={temporada.Id_temporada}>
                        {temporada.Id_temporada}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="col">Fecha de inicio de jornada</label>
                  <DateTimePicker
                    onChange={handleInicioJornadaChange}
                    value={fechaInicio}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="col">Fecha de fin de jornada </label>
                  <DateTimePicker
                    onChange={handleFinJornadaChange}
                    value={fechaFin}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <button class="btn btn-primary">Crear jornada</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm mb-5">
          <h2>Detalle de jornadas</h2>
          <hr />
          <ListaJornadas jornadas={jornadas} />
        </div>
      </div>
    </div>
  );
};
