import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Resultados = () => {
  const url = "http://localhost:4000/";

  // Estado de eventos que provienen del backend del backend
  const [eventos, setEventos] = useState([]);
  // Estado de temporadas que provienen del backend del backend
  const [temporadas, setTemporadas] = useState([]);
  // Estado de id de temporada para el form que filtra resultados
  const [idTemporada, setIdTemporada] = useState(temporadas);
  // Estado de id de temporada para el form que INGRESA los resultados
  const [idTemporada2, setIdTemporada2] = useState(temporadas);
  // Estado de los resultados que provienen del backend de golang
  const [resultados, setResultados] = useState([]);
  // Resultados filtrados de acuerdo a la temporada
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  // Temporadas en estado activo
  const [temporadasActivas, setTemporadasActivas] = useState([]);
  // Eventos filtrados en función a la temporadas a la que pertenecen
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  // Resultado del equipo local
  const [marcadorLocal, setMarcadorLocal] = useState("");
  // Resultado del equipo visitante
  const [marcadorVisitante, setMarcadorVisitante] = useState("");
  // Id de evento
  const [idEvento, setIdEvento] = useState(eventos);
  // Equipo local
  const [equipoLocal, setEquipoLocal] = useState("");
  // Equipo visitante
  const [equipoVisitante, setEquipoVisitante] = useState("");
  // Temporadas Activoas

  // Datos del formulario a enviar
  const [formValues, setFormValues] = useState({
    Id_temporada: 0,
    Id_evento: 0,
    Equipo_local: "",
    Marcador_local: 0,
    Equipo_visitante: "",
    Marcador_visitante: 0,
  });

  useEffect(() => {
    obtenerListaTemporadas();
    obtenerListaResultados();
    obtenerListaEventos();

    const interval = setInterval(() => {
      obtenerListaTemporadas();
      obtenerListaResultados();
    }, 5000);

    return () => clearInterval(interval);
    //filtrarTemporadasActivas();
  }, []);

  // -------- OBTENER LISTADO DE EVENTOS --------
  const obtenerListaEventos = async () => {
    await axios.get(`${url}eventos`).then((response) => {
      const listaEventos = response.data;
      setEventos(listaEventos);
    });
  };

  // -------- OBTENER LISTADO DE TEMPORADAS --------
  const obtenerListaTemporadas = async () => {
    await axios.get(`${url}temporadas`).then((response) => {
      const listaTemporadas = response.data;
      setTemporadas(listaTemporadas);

      const tempActivas = listaTemporadas.filter(
        (temporada) => temporada.Estado === "Activo"
      );

      setTemporadasActivas(tempActivas);
      //filtrarTemporadasActivas(temporadas);
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

  const handleIdTemporada2Change = (e) => {
    setIdTemporada2(e.target.value);

    filtrarEventos(e.target.value);

    setFormValues({
      ...formValues,
      Id_temporada: parseInt(e.target.value),
    });
  };

  const handleMarcadorLocalChange = (e) => {
    setMarcadorLocal(e.target.value);

    setFormValues({
      ...formValues,
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

  const handleIdEventoChange = (e) => {
    setIdEvento(e.target.value);

    const eventoDetalle = eventosFiltrados.filter(
      (evento) => evento.Id_evento === parseInt(e.target.value)
    );

    setEquipoLocal(eventoDetalle[0].Equipo_local);
    setEquipoVisitante(eventoDetalle[0].Equipo_visitante);

    setFormValues({
      ...formValues,
      Id_evento: parseInt(e.target.value),
      Equipo_local: eventoDetalle[0].Equipo_local,
      Equipo_visitante: eventoDetalle[0].Equipo_visitante,
    });
  };

  const filtrarTemporadasActivas = (listaTemporadas) => {
    console.log("f");
    const tempActivas = temporadas.filter(
      (temporada) => temporada.Estado === "Activo"
    );

    console.log(tempActivas);
    setTemporadasActivas(tempActivas);
  };

  const filtrarEventos = (idTemp) => {
    console.log(idTemp);
    const evFiltrados = eventos.filter(
      (evento) => evento.Id_temporada === parseInt(idTemp)
    );

    console.log(evFiltrados);
    setEventosFiltrados(evFiltrados);
  };

  // ----------- FILTRAR RESULTADOS -----------
  const filtrarResultados = (idTemp) => {
    const resFiltrados = resultados.filter(
      (resultado) => resultado.Id_temporada === parseInt(idTemp)
    );
    console.log(resFiltrados);
    setResultadosFiltrados(resFiltrados);
  };

  // ----------- ENVIAR RESULTADO -----------
  const handleResultadoSubmit = (e) => {
    e.preventDefault();

    // Validar si el resultado ya existe
    let bandera = false;
    console.log(formValues);

    resultados.forEach((resultado) => {
      if (resultado.Id_evento === formValues.Id_evento) {
        bandera = true;
      }
    });

    if (bandera) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El resultado ya fue ingresado",
      });
      return;
    }

    axios
      .post(`${url}ingresarResultadoSP`, formValues)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(`Error ${err}`));

    Swal.fire("Aviso", "Resultado ingresado con exito", "success");
  };

  return (
    <div className="container mt-5  animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-sm-4">
          <div className="card border-light mb-3">
            <div className="card-header">
              <h5 className="card-title">Ingresar resultado</h5>{" "}
            </div>
            <div className="card-body animate__animated animate__fadeInDown">
              {/* ---------------------- FORMULARIO PARA INGRESAR RESULTADOS ---------------------- */}
              <form onSubmit={handleResultadoSubmit}>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Temporada:
                  </label>
                  <select
                    className="custom-select"
                    onChange={handleIdTemporada2Change}
                    value={idTemporada2}
                  >
                    <option selected="">Selecciona un temporada...</option>
                    {temporadasActivas.map((temporada, i) => (
                      <option key={i}>{temporada.Id_temporada}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Código evento:
                  </label>
                  <select
                    className="custom-select"
                    onChange={handleIdEventoChange}
                    value={idEvento}
                  >
                    <option selected="">Selecciona un evento...</option>
                    {eventosFiltrados.map((evento, i) => {
                      return <option key={i}>{evento.Id_evento}</option>;
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Equipo local
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Equipo_local"
                    value={equipoLocal}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Marcador local
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Marcardor local"
                    autoComplete="off"
                    value={marcadorLocal}
                    onChange={handleMarcadorLocalChange}
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Equipo visitante
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Equipo_local"
                    value={equipoVisitante}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Marcador visitante
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Marcardor visitante"
                    autoComplete="off"
                    value={marcadorVisitante}
                    onChange={handleMarcadorVisitanteChange}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 btn-block mt-1"
                  >
                    Ingresar resultado
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm mb-5">
          <h3>Visualizar resultados</h3>
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

          <div className="mt-5">
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
                    <tr className="table-light animate__animated animate__pulse">
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
      </div>
    </div>
  );
};
