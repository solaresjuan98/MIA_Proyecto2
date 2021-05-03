import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export const PerfilScreen = () => {
  const { user } = useContext(AuthContext);
  const url = "http://localhost:4000/";
  //console.log(user);

  // Estado de Usuario loggeado
  const [clienteLogueado, setClienteLogueado] = useState("");

  // -------- ESTADO DE DATOS DE USUARIO --------
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [nicknameUsuario, setNicknameUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [fotoPerfilUsuario, setFotoPerfilUsuario] = useState("");
  const [contraseniaUsuario, setContraseniaUsuario] = useState("");

  useEffect(() => {
    obtenerDatosCliente();
  }, []);

  console.log(clienteLogueado);

  // CAMBIAR EL ESTADO DE LOS DATOS DEL FORMULARIO
  const handleNombreChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellidoUsuario(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNicknameUsuario(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreoUsuario(e.target.value);
  };

  const handleContraseniaChange = (e) => {
    setContraseniaUsuario(e.target.value);
  };

  // OBTENER DATOS DE USUARIO AUTENTICADO
  const obtenerDatosCliente = async () => {
    axios
      .get(`${url}cliente/${user.nickname}`)
      .then((response) => {
        const cliente = response.data;
        setClienteLogueado(cliente);
        // Setear valores
        setNombreUsuario(cliente.Nombre_usuario);
        setApellidoUsuario(cliente.Apellido_usuario);
        setNicknameUsuario(cliente.Nickname);
        setCorreoUsuario(cliente.Correo_electronico);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const badgeMembresia = () => {
    if (clienteLogueado.Membresia === "Gold") {
      return <span className="badge badge-warning">Gold</span>;
    } else if (clienteLogueado.Membresia === "Silver") {
      return <span className="badge badge-secondary">Silver</span>;
    } else {
      return <span className="badge badge-info">Gratis</span>;
    }
  };

  // ------ FUNCION PARA ACTUALIZAR DATOS DE USUARIO ------
  const handleUpdateUser = () => {
    Swal.fire("Aviso", "Usuario actualizado con exito", "success");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          {/*------ TARJETA CON DATOS DE USUARIO (vista previa)------*/}
          <div className="card mb-3">
            <h3 className="card-header">Datos de perfil</h3>
            <div className="card-body">
              <h5 className="card-title">Nombre completo: </h5>
              <h6 className="card-subtitle text-muted">
                {clienteLogueado.Nombre_usuario}{" "}
                {clienteLogueado.Apellido_usuario}
              </h6>
            </div>
            <img src={clienteLogueado.Foto_perfil} alt="card img" />
            <div className="card-body">
              <h5 className="card-title">Tipo de membresia: </h5>
              {badgeMembresia()}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">@{clienteLogueado.Nickname}</li>
              <li className="list-group-item">
                {moment(clienteLogueado.Fecha_nacimiento).format("LL")}
              </li>
              <li className="list-group-item">
                {clienteLogueado.Correo_electronico}
              </li>
            </ul>
          </div>
        </div>
        {/* ------ FORMULARIO DE PARA EDITAR DATOS ------ */}
        <div className="col-sm mb-5">
          <div className="card border-dark mb-3">
            <div className="card-header">
              <h3 className="card-title">Primary card title</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdateUser}>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    onChange={handleNombreChange}
                    value={nombreUsuario}
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    onChange={handleApellidoChange}
                    value={apellidoUsuario}
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Nickname:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nickname"
                    onChange={handleNicknameChange}
                    value={nicknameUsuario}
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Correo Electronico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    onChange={handleCorreoChange}
                    value={correoUsuario}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    //onChange={handleContraseniaChange}
                    //value={contrasenia}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Foto de perfil
                  </label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        /*onChange={(event) => {
                      setImagenSeleccionada(event.target.files[0]);
                    }}*/
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                    <div className="input-group-append">
                      <span
                        style={{ cursor: "pointer" }}
                        className="input-group-text"
                        //onClick={() => subirImagen()}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <button type="submit" className="btn btn-success btn-block">
                    Actualizar perfil
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
