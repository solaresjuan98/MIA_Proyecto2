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
  const [formValues, setFormValues] = useState(clienteLogueado);

  useEffect(() => {
    obtenerDatosCliente();
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

  // -------- PAGAR/RENOVAR MEMBRESIA --------
  const pagarMembresiaGold = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "gold",
    };

    console.log(transaccion);
    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const pagarMembresiaSilver = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "silver",
    };

    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const pagarMembresiaBronze = (e) => {
    e.preventDefault();

    const transaccion = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "bronze",
    };

    ejecutarSPPago(transaccion);

    Swal.fire("Aviso", "Membresía pagada con exito", "success");
  };

  const cancelarMembresia = (e) => {
    e.preventDefault();
    const transaccionCancelar = {
      Id_cliente: clienteLogueado.Id_cliente,
      Tipo_membresia: "Gratis",
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
          <span className="badge badge-warning">Gold</span>{" "}
        </h4>
      );
    } else if (clienteLogueado.Membresia === "silver") {
      return (
        <h4>
          {" "}
          <span className="badge badge-secondary">Silver</span>{" "}
        </h4>
      );
    } else if (clienteLogueado.Membresia === "bronze") {
      return (
        <h4>
          {" "}
          <span className="badge badge-secondary">Silver</span>{" "}
        </h4>
      );
    } else {
      return (
        <h4>
          {" "}
          <span className="badge badge-info">Gratis</span>
        </h4>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1>Información de membresia</h1>
      Tu membresía actual es: {badgeMembresia()}
      <div className="row mt-5">
        <div className="col-sm">
          <div
            className="card text-white bg-warning mb-3"
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
            className="card text-white bg-secondary mb-3"
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
            className="card text-white bg-danger mb-3"
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
      </div>
      <h3>Cancelar membresia</h3>
      <form onSubmit={cancelarMembresia}>
        <button className="btn btn-danger" type="submit">
          Cancelar membresía
        </button>
      </form>
    </div>
  );
};
