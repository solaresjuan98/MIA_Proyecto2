import React from "react";
import yaml from "js-yaml";
import axios from "axios";
import Swal from "sweetalert2";

export const DatosScreen = () => {
  let fileReader;
  const url = "http://localhost:4000/";
  /* */
  const handleLeerArchivo = (e) => {
    const contenido = fileReader.result;

    const doc = yaml.load(contenido);

    for (const [elemento1, elemento2] of Object.entries(doc)) {
      for (let i = 0; i < elemento2.resultados.length; i++) {
        for (let j = 0; j < elemento2.resultados[i].jornadas.length; j++) {
          for (
            let k = 0;
            k < elemento2.resultados[i].jornadas[j].predicciones.length;
            k++
          ) {
            let objetoTemporal = {
              Registro: elemento1,
              Nombre: elemento2.nombre,
              Apellido: elemento2.apellido,
              Contrasenia: elemento2.password,
              Username: elemento2.username,
              Temporada: elemento2.resultados[i].temporada,
              Tier: elemento2.resultados[i].tier,
              Jornada: elemento2.resultados[i].jornadas[j].jornada,
              Deporte:
                elemento2.resultados[i].jornadas[j].predicciones[k].deporte,
              Fecha: elemento2.resultados[i].jornadas[j].predicciones[k].fecha,
              Equipo_visitante:
                elemento2.resultados[i].jornadas[j].predicciones[k].visitante,
              Equipo_local:
                elemento2.resultados[i].jornadas[j].predicciones[k].local,
              Prediccion_visita:
                elemento2.resultados[i].jornadas[j].predicciones[k].prediccion
                  .visitante,
              Prediccion_local:
                elemento2.resultados[i].jornadas[j].predicciones[k].prediccion
                  .local,
              Marcador_visita:
                elemento2.resultados[i].jornadas[j].predicciones[k].resultado
                  .visitante,
              Marcador_local:
                elemento2.resultados[i].jornadas[j].predicciones[k].resultado
                  .local,
            };

            guardarEnTemporal(objetoTemporal);
            //console.log(objetoTemporal);
          }
        }
      }
    }
  };

  const handleElegirArchivo = (archivo) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleLeerArchivo;
    fileReader.readAsText(archivo);
    //console.log(archivo.name);
  };

  const guardarEnTemporal = async (objeto) => {
    await axios
      .post(`${url}cargaMasiva`, objeto)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error ${err}`));
  };

  // CARGANDO DATOS EN TABLA TEMPORAL

  const almacenarClientes = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}guardarClientesTemp`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Clientes almacenados con exito", "success");
  };

  const almacenarDeportes = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}guardarDeportesTemp`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Deportes almacenados con exito", "success");
  };

  const almacenarTemporadas = async (e) => {
    e.preventDefault();

    await axios
      .post(`${url}guardarTemporadasTemp`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error ${err}`));

    Swal.fire("Aviso", "Temporadas almacenadas con exito", "success");
  };

  const almacenarEventos = async (e) => {
    e.preventDefault();

    await axios
      .post(`${url}guardarEventosTemp`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Temporadas almacenadas con exito", "success");
  };

  const almacenarPredicciones = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}guardarPredicciones`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Predicciones almacenadas con exito", "success");
  };

  const almacenarResultados = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}guardarResultados`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(`Error: ${err}`));

    Swal.fire("Aviso", "Resultados almacenados con exito", "success");
  };

  return (
    <div className="container mt-5">
      <h1>Seccion de datos</h1>
      <hr />
      <h5>Subir un archivo YAML</h5>
      <div className="input-group mb-3 animate__animated animate__fadeIn">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            onChange={(e) => handleElegirArchivo(e.target.files[0])}
          />
          <label className="custom-file-label">Choose file</label>
        </div>
        <div className="input-group-append">
          <span
            style={{ cursor: "pointer" }}
            className="input-group-text"
            //onClick={(e) => handleElegirArchivo(e.target.files[0])}
          >
            Upload
          </span>
        </div>
      </div>
      <h2>Elige que datos quieres cargar a la base de datos</h2>
      <div className="row mt-5 animate__animated animate__fadeInUp">
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Clientes</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={almacenarClientes}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar clientes
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Deportes</h5>
            </div>
            <div className="card-body">
              <form onSubmit={almacenarDeportes}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar deportes
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              {" "}
              <h5>Temporadas</h5>
            </div>
            <div className="card-body">
              <form onSubmit={almacenarTemporadas}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar temporadas
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Jornadas</h5>
            </div>
            <div className="card-body">
              <form>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar jornadas
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 animate__animated animate__fadeInUp">
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Eventos</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={almacenarEventos}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar eventos
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Predicciones</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={almacenarPredicciones}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar predicciones
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">
              <h5>Resultados</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={almacenarResultados}>
                <button type="submit" className="btn btn-info btn-block mt-3">
                  Cargar resultados
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
