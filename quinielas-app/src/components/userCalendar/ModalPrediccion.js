import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
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

export const ModalPrediccion = (evento) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  console.log(evento);

  // Estado que maneja si la predicción ya fue hecha
  const [yaHizoPrediccion, setYaHizoPrediccion] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // ------- ENVIAR FORMULARIO DE PREDICCION ------
  const handlePrediccionSubmit = (e) => {
    e.preventDefault();

    /*
        1. Primero validar si ya el usuario hizo la predicción
            - Si ya hizo la predicción, inpedir la prediccion
            - De lo contrario, guardar la predicción en la base de datos
    */

    Swal.fire("Aviso", "Predicción realizada con exito", "success");
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
      <h3>Realizar prediccion</h3>
      <hr />
      <form className="container" onSubmit={handlePrediccionSubmit}>
        <div className="form-group">
          <label>Equipo local</label>
          <input
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Equipo visitante</label>
          <input
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Marcador predicción equipo local</label>
          <input
            type="text"
            className="form-control"
            //className={`form-control ${!campoValido && "is-invalid"}`}
            placeholder="Marcador local"
            //name="title"
            autoComplete="off"
            //value={title}
            //onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label selected="">Marcador predicción equipo visitante</label>
          <input
            type="text"
            className="form-control"
            //className={`form-control ${!campoValido && "is-invalid"}`}
            placeholder="Marcardor visitante"
            //name="title"
            autoComplete="off"
            //value={title}
            //onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Realizar predicción </span>
        </button>
      </form>
    </Modal>
  );
};
