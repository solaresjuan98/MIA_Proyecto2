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
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contraseniaUsuario, setContraseniaUsuario] = useState("");
  const [membresia, setMembresia] = useState("");

  // Validar campos
  const [campoNombreValido, setCampoNombreValido] = useState(true);
  const [campoApellidoValido, setCampoApellidoValido] = useState(true);
  const [campoNicknameValido, setCampoNicknameValido] = useState(true);
  const [campoCorreoValido, setCampoCorreoValido] = useState(true);

  useEffect(() => {
    obtenerDatosCliente();
  }, []);

  // ESTADO DE DATOS DE FOMULARIO
  const [formValues, setFormValues] = useState(clienteLogueado);
  //console.log(clienteLogueado);

  // CAMBIAR EL ESTADO DE LOS DATOS DEL FORMULARIO
  const handleNombreChange = (e) => {
    setNombreUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Nombre_usuario: e.target.value,
    });
  };

  const handleApellidoChange = (e) => {
    setApellidoUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Apellido_usuario: e.target.value,
    });
  };

  const handleNicknameChange = (e) => {
    setNicknameUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Nickname: e.target.value,
    });
  };

  const handleCorreoChange = (e) => {
    setCorreoUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Correo_electronico: e.target.value,
    });
  };

  const handleContraseniaChange = (e) => {
    setContraseniaUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Contrasenia: e.target.value,
    });
  };

  // SUBIR IMAGEN EN CLOUDINARY
  const subirImagen = () => {
    console.log(imagenSeleccionada);
    const formData = new FormData();
    formData.append("file", imagenSeleccionada);
    formData.append("upload_preset", "mia-proyecto2");

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dxdkgv30q/image/upload";

    axios.post(cloudinaryUrl, formData).then((response) => {
      setImageUrl(response.data.secure_url);
      console.log(response.data.secure_url);
      setFormValues({
        ...formValues,
        Foto_perfil: response.data.secure_url,
      });
    });
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
        setImageUrl(cliente.Foto_perfil);
        //setMembresia(cliente.Membresia);
        //setImageUrl("");

        setFormValues({
          Id_cliente: parseInt(cliente.Id_cliente),
          Nombre_usuario: cliente.Nombre_usuario,
          Apellido_usuario: cliente.Apellido_usuario,
          Nickname: cliente.Nickname,
          Correo_electronico: cliente.Correo_electronico,
          Foto_perfil: cliente.Foto_perfil,
        });
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  const badgeMembresia = () => {
    if (clienteLogueado.Membresia === "gold") {
      return <span className="badge badge-warning">Gold</span>;
    } else if (clienteLogueado.Membresia === "silver") {
      return <span className="badge badge-secondary">Silver</span>;
    } else if (clienteLogueado.Membresia === "bronze") {
      return <span className="badge badge-secondary">Silver</span>;
    } else {
      return <span className="badge badge-info">Gratis</span>;
    }
  };

  // ------ FUNCION PARA ACTUALIZAR DATOS DE USUARIO ------
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log(formValues);

    const { Nombre_usuario, Apellido_usuario, Nickname, Correo } = formValues;

    if (Nombre_usuario.trim().length < 2) {
      return setCampoNombreValido(false);
    }

    if (Apellido_usuario.trim().length < 2) {
      return setCampoApellidoValido(false);
    }

    if (Nickname.trim().length < 2) {
      return setCampoNicknameValido(false);
    }

    /*if (Correo.trim().length < 2) {
      return setCampoCorreoValido(false);
    }*/

    // Ejecutar poteicion
    await axios
      .put(`${url}modificarUsuario`, formValues)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(`Error ${err}`));

    Swal.fire("Aviso", "Usuario actualizado con exito", "success");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4 animate__animated animate__fadeInUp">
          {/*------ TARJETA CON DATOS DE USUARIO (vista previa)------*/}
          <div className="card mb-3 ">
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
        {/* ------ FORMULARIO DE PARA EDITAR (actualizar) DATOS ------ */}
        <div className="col-sm mb-5 animate__animated animate__fadeInRight">
          <div className="card border-dark mb-3">
            <div className="card-header">
              <h3 className="card-title">Editar datos de perfil</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdateUser}>
                <div className="form-group">
                  <label>Identificador único de cliente </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Readonly input here…"
                    value={clienteLogueado.Id_cliente}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !campoNombreValido && "is-invalid"
                    }`}
                    placeholder="Nombre"
                    value={nombreUsuario}
                    onChange={handleNombreChange}
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !campoApellidoValido && "is-invalid"
                    }`}
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
                    className={`form-control ${
                      !campoNicknameValido && "is-invalid"
                    }`}
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
                    Foto de perfil
                  </label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={(event) => {
                          setImagenSeleccionada(event.target.files[0]);
                        }}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                    <div className="input-group-append">
                      <span
                        style={{ cursor: "pointer" }}
                        className="input-group-text"
                        onClick={() => subirImagen()}
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
