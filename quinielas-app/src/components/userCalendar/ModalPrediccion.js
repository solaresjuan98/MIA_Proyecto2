import React, { useState, useContext, useEffect } from "react";
//import moment from "moment";
import { AuthContext } from "../../Auth/AuthContext";
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

export const ModalPrediccion = ({ evento }) => {
  const url = "http://localhost:4000/";
  const { user } = useContext(AuthContext);
  //console.log(user);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const {
    Id_temporada,
    Num_jornada,
    Equipo_local,
    Equipo_visitante,
    Id_evento,
  } = evento;

  // Estado de predicicones
  const [predicciones, setPredicciones] = useState([]);
  // Estado que maneja si la predicción ya fue hecha
  //const [yaHizoPrediccion, setYaHizoPrediccion] = useState(false);
  // Obtener usuario
  const [usuarioLogueado, setUsuarioLogueado] = useState("");
  const [idCliente, setIdCliente] = useState(0);

  useEffect(() => {
    obtenerUsuarioLoggeado();
    //obtenerPredicciones();
  }, []);

  // Estado que maneja los marcadores
  // local
  const [marcadorLocal, setMarcadorLocal] = useState(0);
  // visitante
  const [marcadorVisitante, setMarcadorVisitante] = useState(0);

  const [formValues, setFormValues] = useState({
    Id_evento: Id_evento,
    Id_cliente: 0,
    Id_temporada: Id_temporada,
    Num_jornada: Num_jornada,
    Local: Equipo_local,
    Visitante: Equipo_visitante,
    Marcador_local: 0,
    Marcador_visitante: 0,
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const obtenerUsuarioLoggeado = async () => {
    await axios
      .get(`${url}cliente/${user.nickname}`)
      .then((response) => {
        const cliente = response.data;
        console.log(response.data.Id_cliente);
        setIdCliente(response.data.Id_cliente);
        setUsuarioLogueado(cliente);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const handleMarcadorLocalChange = (e) => {
    setMarcadorLocal(e.target.value);
    //console.log(usuarioLogueado.Id_cliente);
    setIdCliente(usuarioLogueado.Id_cliente);
    setFormValues({
      ...formValues,
      Id_cliente: idCliente,
      Marcador_local: parseInt(e.target.value),
    });
  };

  const handleMarcadorVisitanteChange = (e) => {
    setMarcadorVisitante(e.target.value);

    setFormValues({
      ...formValues,
      Marcador_visitante: parseInt(e.target.value),
    });
  };

  const obtenerPredicciones = (e) => {
    axios.get(`${url}predicciones`).then((response) => {
      const predicciones = response.data;
      setPredicciones(predicciones);
    });
  };

  // ------- ENVIAR FORMULARIO DE PREDICCION ------
  const handlePrediccionSubmit = (e) => {
    e.preventDefault();
    let bandera = false;
    console.log(formValues);
    /*
        1. Primero validar si ya el usuario hizo la predicción
            - Si ya hizo la predicción, inpedir la prediccion
            - De lo contrario, guardar la predicción en la base de datos
    */

    const { Id_cliente, Id_evento } = formValues;

    /*predicciones.forEach((prediccion) => {
      if (
        prediccion.Id_cliente === Id_cliente &&
        prediccion.Id_evento === Id_evento
      ) {
        console.log("Encontrado");
        bandera = true;

      }
    });*/

    if (bandera) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ya realizaste una predicción para este evento",
      });
      return;
    }

    axios
      .post(`${url}ingresarPrediccion`, formValues)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Predicción realizada con exito", "success");
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
      <h3>Realizar prediccion</h3>
      <hr />
      <form className="container" onSubmit={handlePrediccionSubmit}>
        <div className="form-group">
          <label>Equipo local</label>
          <input
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            value={Equipo_local}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Equipo visitante</label>
          <input
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            value={Equipo_visitante}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Marcador predicción equipo local</label>
          <input
            type="number"
            className="form-control"
            placeholder="Marcador local"
            autoComplete="off"
            value={marcadorLocal}
            onChange={handleMarcadorLocalChange}
          />
        </div>
        <div className="form-group">
          <label selected="">Marcador predicción equipo visitante</label>
          <input
            type="number"
            className="form-control"
            placeholder="Marcardor visitante"
            autoComplete="off"
            value={marcadorVisitante}
            onChange={handleMarcadorVisitanteChange}
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
