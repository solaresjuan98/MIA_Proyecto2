import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export const MembresiaScreen = () => {
  const { user } = useContext(AuthContext);
  const url = "http://localhost:4000/";
  //console.log(user);

  // Estado de Usuario loggeado
  const [clienteLogueado, setClienteLogueado] = useState("");

  // Datos de pago de membresia
  // const [formValues, setFormValues] = useState(clienteLogueado);

  // Datos de temporada
  const [temporadas, setTemporadas] = useState([]);

  // Id de temporadas
  const [idTemporada, setidTemporada] = useState("");

  // Temporadas activas
  const [temporadasActivas, setTemporadasActivas] = useState([]);

  useEffect(() => {
    obtenerDatosCliente();
    obtenerTemporadas();
  }, []);

  console.log(clienteLogueado);

  // -------- OBTENER DATOS DE USUARIO AUTENTICADO --------
  const obtenerDatosCliente = async () => {
    axios
      .get(`${url}cliente/${user.nickname}`)
      .then((response) => {
        const cliente = response.data;
        setClienteLogueado(cliente);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const obtenerTemporadas = async () => {
    await axios
      .get(`${url}temporadas`)
      .then((response) => {
        const listaTemporadas = response.data;
        setTemporadas(listaTemporadas);

        const tempActivas = listaTemporadas.filter(
          (temporada) => temporada.Estado === "Activo"
        );

        setTemporadasActivas(tempActivas);
      })
      .catch((err) => console.error(`Error ${err}`));
  };

  const handleIdTemporadaChange = (e) => {
    setidTemporada(e.target.value);

    //filtrarEventos(e.target.value);
  };

  // -------- PAGAR/RENOVAR MEMBRESIA --------
  const pagarMembresiaGold = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "gold",
      Id_temporada: parseInt(idTemporada),
    };

    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const pagarMembresiaSilver = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "silver",
      Id_temporada: parseInt(idTemporada),
    };

    console.log(transaccion);
    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const pagarMembresiaBronze = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "bronze",
      Id_temporada: parseInt(idTemporada),
    };

    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const cancelarMembresia = (e) => {
    e.preventDefault();
    const transaccionCancelar = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "Gratis",
      Id_temporada: parseInt(idTemporada),
    };

    ejecutarSPPago(transaccionCancelar);
    Swal.fire("Aviso", "Membresía cancelada", "success");
  };

  const ejecutarSPPago = (transaccion) => {
    // Llamar al endpoint que ejecuta el pago de membresia
    axios
      .post(`${url}pagarMembresia`, transaccion)
      .then((response) => {
        console.log(response);
        //console.log(response.statusText);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const badgeMembresia = () => {
    if (clienteLogueado.Membresia === "gold") {
      return (
        <h4>
          {" "}
          <span className="badge badge-warning animate__animated animate__fadeIn">
            Gold
          </span>{" "}
        </h4>
      );
    } else if (clienteLogueado.Membresia === "silver") {
      return (
        <h4>
          {" "}
          <span className="badge badge-secondary animate__animated animate__fadeIn">
            Silver
          </span>{" "}
        </h4>
      );
    } else if (clienteLogueado.Membresia === "bronze") {
      return (
        <h4>
          {" "}
          <span className="badge badge-secondary animate__animated animate__fadeIn">
            Silver
          </span>{" "}
        </h4>
      );
    } else {
      return (
        <h4>
          {" "}
          <span className="badge badge-info animate__animated animate__fadeIn">
            Gratis
          </span>
        </h4>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="animate__animated animate__fadeIn">
        Información de membresia
      </h1>
      Tu membresía actual es: {badgeMembresia()}
      <select
        className="custom-select mt-5"
        onChange={handleIdTemporadaChange}
        value={idTemporada}
      >
        <option>Selecciona una temporada</option>
        {temporadasActivas.map((temporadas, i) => {
          return <option>{temporadas.Id_temporada}</option>;
        })}
      </select>
      <div className="row mt-5">
        <div className="col-sm">
          <div
            className="card text-white bg-warning mb-3 animate__animated animate__fadeInUp"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia gold</div>
            <div className="card-body">
              <form onSubmit={pagarMembresiaGold}>
                <h4 className="card-title">Precio</h4>
                <h3 className="card-text text-dark">Q. 900.00</h3>

                <button type="submit" className="btn btn-info btn-block mt-3">
                  Adquirir
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            className="card text-white bg-secondary mb-3 animate__animated animate__fadeInUp"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia silver</div>
            <div className="card-body">
              <form onSubmit={pagarMembresiaSilver}>
                <h4 className="card-title">Precio</h4>
                <h3 className="card-text text-dark">Q. 450.00</h3>

                <button type="submit" className="btn btn-info btn-block mt-3">
                  Adquirir
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            className="card text-white bg-danger mb-3 animate__animated animate__fadeInUp"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Membresia bronze</div>
            <div className="card-body">
              <form onSubmit={pagarMembresiaBronze}>
                <h4 className="card-title">Precio</h4>
                <h3 className="card-text text-dark">Q. 150.00</h3>

                <button type="submit" className="btn btn-info btn-block mt-3">
                  Adquirir
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            className="card border-primary mb-3 animate__animated animate__fadeInUp"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Cancelar</div>
            <div className="card-body">
              <form onSubmit={cancelarMembresia}>
                <h4 className="card-title">Precio</h4>
                <h3 className="card-text text-dark">GRATIS</h3>
                <button className="btn btn-danger btn-block mt-3" type="submit">
                  Cancelar membresía
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p class="text-dark">
        <strong>Recuerda que tu membresía se actualiza automáticamente.</strong>
      </p>
    </div>
  );
};
