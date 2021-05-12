import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import moment from "moment";
import { ListaJornadas } from "./ListaJornadas";
//import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

moment.locale("en");
// Definir las fecha de inicio y de fin por defecto de la jornada
const ahora = moment().minutes(0).seconds(0).add(1, "hours");
const fin = ahora.clone().add(1, "week");

const jornadaInicial = {
  Id_temporada: 0,
  Fecha_inicio: moment(ahora).format("LLL"),
  Fecha_final: moment(fin).format("LLL"),
};

export const JornadasScreen = () => {
  // Estado de las fechas
  const [fechaInicio, setFechaInicio] = useState(ahora.toDate());
  const [fechaFin, setFechaFin] = useState(fin.toDate());

  // Estado temporadas
  const [temporadas, obtenerTemporadas] = useState([]);

  const [idTemporada, setIdTemporada] = useState(temporadas);

  // Estado jornadas
  const [jornadas, obtenerJornadas] = useState([]);

  // Formulario
  const [formValues, setFormValues] = useState(jornadaInicial);

  // Temporadas en estado activo
  const [temporadasActivas, setTemporadasActivas] = useState([]);

  //const { Fecha_inicio, Fecha_fin } = formValues;

  // URL DE LA API
  const url = "http://localhost:4000/";

  useEffect(() => {
    obtenerListaTemporadas();
    obtenerListaJornadas();

    const interval = setInterval(() => {
      obtenerListaJornadas();
      obtenerListaTemporadas();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ------- OBTENER LISTA DE TEMPORADAS -------
  const obtenerListaTemporadas = async () => {
    await axios
      .get(`${url}temporadas`)
      .then((response) => {
        const listaTemporadas = response.data;
        obtenerTemporadas(listaTemporadas);

        //console.log(temporadas);
        const tempActivas = listaTemporadas.filter(
          (temporada) => temporada.Estado === "Activo"
        );

        //console.log(tempActivas);

        setTemporadasActivas(tempActivas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleIdTemporadaChange = (e) => {
    setIdTemporada(e.target.value);
    console.log(e.target.value);
    setFormValues({
      ...formValues,
      Id_temporada: parseInt(e.target.value), // Convertir a numero
    });
  };

  const handleInicioJornadaChange = (e) => {
    setFechaInicio(e);

    setFormValues({
      ...formValues,
      Fecha_inicio: moment(e).locale("en").format("LLL"),
    });
  };

  const handleFinJornadaChange = (e) => {
    setFechaFin(e);

    setFormValues({
      ...formValues,
      Fecha_final: moment(e).locale("en").format("LLL"),
    });
  };

  // ------- OBTENER LISTA DE JORNADAS -------
  const obtenerListaJornadas = async () => {
    await axios
      .get(`${url}jornadas`)
      .then((response) => {
        const listaJornadas = response.data;
        obtenerJornadas(listaJornadas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*const momentoInicio = moment(Fecha_inicio);
    const momentoFin = moment(Fecha_fin);
    console.log(momentoInicio);
    console.log(momentoFin);*/

    /*if (momentoInicio.isSameOrAfter(momentoFin)) {
      Swal.fire(
        "Error",
        "La fecha de inicio tiene que ser antes que la de fin",
        "error"
      );
      return;
    }*/
    console.log(formValues);

    // Peticion post en axios
    await axios
      .post(`${url}crearJornadaSP`, formValues)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    Swal.fire("Aviso", "Jornada creada con exito", "success");
  };

  // Filtrar jornadas terminadas (PUEDE SER UTIL PARA FILTRAR Y NO ESTAR HACIENDO TANTA PETICION A LA BD)
  //const jornadasTerminadas = jornadas.filter((jornada) => jornada.Estado === 'Finalizada');
  //console.log(jornadasTerminadas);

  //console.log(moment(ahora).format("l"));
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        <div className="col-sm-4">
          <div className="card border-dark mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nueva jornada</h5>{" "}
            </div>
            <div className="card-body animate__animated animate__fadeInDown">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="col-form-label">Temporada</label>
                  <select
                    className="custom-select"
                    onChange={handleIdTemporadaChange}
                    value={idTemporada}
                  >
                    <option selected="custom-select">
                      Selecciona una Temporada...
                    </option>
                    {temporadasActivas.map((temporada, i) => (
                      <option key={i}>{temporada.Id_temporada}</option>
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
                  <button className="btn btn-primary btn-block">
                    Crear jornada
                  </button>
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
