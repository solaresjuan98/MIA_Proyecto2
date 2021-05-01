import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import axios from "axios";

// MODAL STYLES
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

// Fecha de inicio
const ahora = moment().minutes(0).seconds(0).add(1, "hours");
// Fecha de finalizacion
const fechaFinal = ahora.clone().add(1.5, "hours"); // 1 hora despues del inicio

export const CalendarModal = () => {
  // Url de API
  const url = "http://localhost:4000/";
  //const [tituloEvento, setTituloEvento] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [dateStart, setdateStart] = useState(ahora.toDate());
  const [dateEnd, setDateEnd] = useState(fechaFinal.toDate());
  const [campoValido, setCampoValido] = useState(true);

  // Estado jornadas
  const [jornadas, setJornadas] = useState([]);
  // Estado temporadas
  const [temporadas, setTemporadas] = useState([]);
  // id temporada
  const [idTemporada, setIdTemporada] = useState(temporadas);
  // id jornada
  const [idJornada, setIdJornada] = useState(jornadas);
  // equipo (o jugador) local
  const [equipoLocal, setEquipoLocal] = useState("");
  // equipo (o jugador) visitante
  const [equipoVisitante, setEquipoVisitante] = useState("");
  // filtrar jornadas
  const [jornadasFiltradas, setJornadasFiltradas] = useState([]);

  useEffect(() => {
    obtenerListaJornadas();
    obtenerListaTemporadas();
  }, []);

  const [formValues, setFormValues] = useState({
    Id_temporada: 0,
    Id_jornada: 0,
    Titulo_evento: "",
    Equipo_local: "",
    Equipo_visitante: "",
    Fecha_inicio: moment(ahora.toDate()).format("L"),
    Fecha_final: moment(fechaFinal.toDate()).format("L"),
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleIdTemporadaChange = (e) => {
    setIdTemporada(e.target.value);

    setFormValues({
      ...formValues,
      Id_temporada: parseInt(e.target.value),
    });

    filtarJornadas(e.target.value);
    //console.log(e.target.values)
  };

  const handleIdJornadaChange = (e) => {
    setIdJornada(e.target.value);

    setFormValues({
      ...formValues,
      Id_jornada: parseInt(e.target.value),
    });
  };

  const handleStartDateChange = (e) => {
    setdateStart(e);

    setFormValues({
      ...formValues,
      Fecha_inicio: moment(e).format("L"),
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);

    setFormValues({
      ...formValues,
      Fecha_final: moment(e).format("L"),
    });
  };

  const handleEquipoLocalChange = (e) => {
    setEquipoLocal(e.target.value);

    setFormValues({
      ...formValues,
      Equipo_local: e.target.value,
    });
  };

  const handleEquipoVisitanteChange = (e) => {
    setEquipoVisitante(e.target.value);

    setFormValues({
      ...formValues,
      Equipo_visitante: e.target.value,
      Titulo_evento:
        formValues.Equipo_local + " vs " + formValues.Equipo_visitante,
    });
  };

  // Formsubmit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // form values
    //console.log(formValues);
    const inicio = moment(ahora);
    const fin = moment(fechaFinal);

    const { Equipo_local, Equipo_visitante } = formValues;

    if (inicio.isSameOrAfter(fin)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (Equipo_local.trim().length < 2 || Equipo_visitante.trim().length < 2) {
      return setCampoValido(false);
    }
    console.log(formValues);
    // ejetuar envio de datos el backend
    await axios
      .post(`${url}crearEvento`, formValues)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    setCampoValido(true);
    closeModal();
    Swal.fire("Aviso", "Evento creado con exito", "success");
  };

  //console.log(formValues.Id_temporada);

  // ----------- PETICIONES GET -----------

  // Obtener temporadas
  const obtenerListaTemporadas = async () => {
    await axios
      .get(`${url}temporadas`)
      .then((response) => {
        const listaTemporadas = response.data;
        setTemporadas(listaTemporadas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  // Obtener jornadas
  const obtenerListaJornadas = async () => {
    await axios
      .get(`${url}jornadas`)
      .then((response) => {
        const listaJornadas = response.data;
        setJornadas(listaJornadas);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const filtarJornadas = (idTemp) => {
    const jFiltradas = jornadas.filter(
      (jornada) => jornada.Id_temporada === parseInt(idTemp)
    );

    setJornadasFiltradas(jFiltradas);
  };

  /*
  
  const jornadasFiltradas = jornadas.filter(
    (jornada) => jornada.Id_temporada === 21
  );*/

  return (
    <Modal
      isOpen={modalIsOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      contentLabel="Example Modal"
    >
      <h3> Nuevo evento </h3>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <select
            className="custom-select"
            onChange={handleIdTemporadaChange}
            value={idTemporada}
          >
            <option selected="">Selecciona una temporada...</option>
            {temporadas.map((temporadas, i) => {
              return <option>{temporadas.Id_temporada}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <select
            className="custom-select"
            onChange={handleIdJornadaChange}
            value={idJornada}
          >
            <option selected="">Selecciona una jornada...</option>
            {jornadasFiltradas.map((jornada) => {
              return <option>{jornada.Id_jornada}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            minDate={dateStart}
            value={dateEnd}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Equipo / Jugador local</label>
          <input
            type="text"
            className={`form-control ${!campoValido && "is-invalid"}`}
            placeholder="Equipo o jugador local"
            //name="title"
            autoComplete="off"
            value={equipoLocal}
            onChange={handleEquipoLocalChange}
            //value={title}
            //onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Equipo / Jugador visitante</label>
          <input
            type="text"
            className={`form-control ${!campoValido && "is-invalid"}`}
            placeholder="Equipo o jugador visitante"
            name="title"
            autoComplete="off"
            value={equipoVisitante}
            onChange={handleEquipoVisitanteChange}
            //value={title}
            //onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Crear evento </span>
        </button>
      </form>
    </Modal>
  );
};
