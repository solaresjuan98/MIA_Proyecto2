import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

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
const fechaFinal = ahora.clone().add(1, "hours"); // 1 hora despues del inicio

export const CalendarModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [dateStart, setdateStart] = useState(ahora.toDate());
  const [dateEnd, setDateEnd] = useState(fechaFinal.toDate());
  const [tituloValido, setTituloValido] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: ahora.toDate(),
    end: fechaFinal.toDate(),
  });

  const { notes, title } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStartDateChange = (e) => {
    console.log(e);
    setdateStart(e);

    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);

    setFormValues({
      ...formValues,
      end: e,
    });
  };

  // Formsubmit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // form values
    //console.log(formValues);
    const inicio = moment(ahora);
    const fin = moment(fechaFinal);

    // Imprimir fechas
    console.log(inicio);
    console.log(fin);

    if (inicio.isSameOrAfter(fin)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTituloValido(false);
    }

    // --------------------------------------------------------------------------------------------------------
    // Peticiones para obtener la data que necesito para crear eventos

    // --------- CREACION DE EVENTOS EN EL MODAL ---------

    setTituloValido(true);
    closeModal();
  };

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
          <label>Temporada</label>
          <input
            className="form-control"
            type="text"
            //placeholder="Readonly input here..."
            readonly={true}
            value={43}
          />
        </div>
        <div className="form-group">
          <select
            className="custom-select"

            //onChange={handleDeporteChange}
            //value={deporte}
          >
            <option selected="">Selecciona una jornada...</option>
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
            className={`form-control ${!tituloValido && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Equipo / Jugador visitante</label>
          <input
            type="text"
            className={`form-control ${!tituloValido && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
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
