import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { ListaTemporadas } from "./ListaTemporadas";
import Swal from "sweetalert2";

// configurar Fecha de inicio y fecha de fin por defecto de la temporada
const ahora = moment().minutes(0).seconds(0).add(1, "hours");
const fin = ahora.clone().add(1, "months");

const temporadaInicial = {
  Deporte: "",
  Fecha_inicio: moment(ahora.toDate()).format("LLL"),
  Fecha_fin: moment(fin.toDate()).format("LLL"),
};

export const TemporadasScreen = () => {
  // Estado de las fechas
  const [fechaInicio, setFechaInicio] = useState(ahora.toDate());
  const [fechaFin, setFechaFin] = useState(fin.toDate());
  // Estado de deportes
  const [deportes, obtenerDeportes] = useState([]); // iniciar como un arreglo
  // Estado de deporte
  const [deporte, setDeporte] = useState(deportes);
  // Estado de temporadas
  const [temporadas, obtenerTemporadas] = useState([]);

  const [formValues, setFormValues] = useState(temporadaInicial);

  // URL de api
  const url = "http://localhost:4000/";

  useEffect(() => {
    obtenerListaDeportes();
    obtenerListaTemporadas();

    const interval = setInterval(() => {
      obtenerListaDeportes();
      obtenerListaTemporadas();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //console.log(temporadas);

  // ------- OBTENER LISTA DE DEPORTES -------
  const obtenerListaDeportes = () => {
    axios
      .get(`${url}deportes`)
      .then((response) => {
        const listaDeportes = response.data;
        obtenerDeportes(listaDeportes);
        //console.log(listaDeportes[1].Nombre);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

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

  // Manejar datos de formulario
  const handleDeporteChange = (e) => {
    //console.log(e.target.value);
    setDeporte(e.target.value);

    setFormValues({
      ...formValues,
      Deporte: e.target.value,
    });
  };

  // manejar la fecha de inicio en el formulario
  const handleFechaInicioTemporadaChange = (e) => {
    setFechaInicio(e);
    //console.log(moment(e).format("L"))
    setFormValues({
      ...formValues,
      Fecha_inicio: moment(e).format("LLL"),
    });
  };

  // manejar la fecha de fin en el formulario
  const handleFechaFinTemporadaChange = (e) => {
    //console.log(e);
    setFechaFin(e);

    setFormValues({
      ...formValues,
      Fecha_fin: moment(e).format("LLL"),
    });
  };

  // Enviar formulario
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // moment(fin).format("L")
    console.log(
      "Nombre :",
      moment(formValues.Fecha_inicio).format("YYYY"),
      "-Q"
    );
    console.log(formValues);

    await axios
      .post(`${url}crearTemporadaSP`, formValues)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    /*await axios
      .post(`${url}crearTemporada`, formValues)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.error(err));*/

    Swal.fire("Aviso", "Temporada creada con exito", "success");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          <div className="card border-light mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nueva temporada</h5>{" "}
            </div>
            <div className="card-body animate__animated animate__fadeInDown">
              <form onSubmit={handleSubmitForm}>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Deporte:
                  </label>
                  <select
                    className="custom-select"
                    onChange={handleDeporteChange}
                    value={deporte}
                  >
                    <option selected="">Selecciona un deporte...</option>
                    {deportes.map((deporte, i) => (
                      <option key={i}>{deporte.Nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Fecha de inicio de la temporada
                  </label>
                  <DateTimePicker
                    onChange={handleFechaInicioTemporadaChange}
                    value={fechaInicio}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Fecha de fin de la temporada
                  </label>
                  <DateTimePicker
                    onChange={handleFechaFinTemporadaChange}
                    value={fechaFin}
                    minDate={fechaInicio}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 btn-block mt-1"
                  >
                    Crear temporada
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm mb-5">
          <h2 className="mb-5">Temporadas creadas </h2>
          <div className="container mt-5">
            <ListaTemporadas temporadas={temporadas} />
          </div>
        </div>
      </div>
    </div>
  );
};
