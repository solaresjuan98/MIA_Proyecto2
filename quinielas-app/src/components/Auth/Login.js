import React, { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { types } from "../../types/types";
import Swal from "sweetalert2";
//import { useForm } from "../hooks/useForm";
import DateTimePicker from "react-datetime-picker";
import "./Login.css";
import moment from "moment";
import axios from "axios";

// La fecha de nacimiento tiene que ser mayor o igual a 18 años antes del dia de hoy
const fecha_Nacimiento = moment().minutes(0).seconds(0).subtract(18, "years");

// Usuario
const usuarioNuevo = {
  Nombre_usuario: "",
  Apellido_usuario: "",
  Nickname: "",
  Correo_electronico: "",
  Contrasenia: "",
  Fecha_Nacimiento: moment(fecha_Nacimiento).format("L"),
  Foto_perfil: "",
};

// Usuario para Login
const usuarioLogin = {
  Nickname_login: "",
  Contrasenia_login: "",
  Rol_usuario: "",
};

export const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  // Estado para login de usuario
  const [nicknameLogin, setNicknameLogin] = useState("");
  const [contraseniaLogin, setContraseniaLogin] = useState("");
  const [rolLogin, setRolLogin] = useState("");

  // Estado de datos para creacion de usuario
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [nickname, setNickname] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  // Estado de la fecha de nacimiento
  const [fechaNacimiento, setFechaNacimiento] = useState(
    fecha_Nacimiento.toDate()
  );

  // DATOS DEL FORMULARIO PARA LOGIN
  const [loginFormValues, setLoginFormValues] = useState(usuarioLogin);

  // --- DATOS DEL FORMULARIO PARA CREAR USUARIO
  const [formValues, setFormValues] = useState(usuarioNuevo);

  // -------------------------------
  let rolUsuario = ""; // = "administrador";

  // -------  manejar datos del formulario de login -------
  // Nickname
  const handleNicknameUsuarioChange = (e) => {
    setNicknameLogin(e.target.value);
    //console.log(e.target.value);
    setLoginFormValues({
      ...loginFormValues,
      Nickname_login: e.target.value,
    });
  };

  // Contraseña
  const handleContraseniaLoginChange = (e) => {
    setContraseniaLogin(e.target.value);
    //console.log(e.target.value);
    setLoginFormValues({
      ...loginFormValues,
      Contrasenia_login: e.target.value,
    });
  };

  // --------- Función de login ---------
  const handleLogin = () => {
    /*
        solo se puede iniciar sesion de dos formas:
          - como admin
          - como usuario (gold, silver, bronze o sin membresia)
    */

    const { Nickname_login, Contrasenia_login } = loginFormValues;

    if (Nickname_login === "Administrador" && Contrasenia_login === "admin") {
      rolUsuario = "administrador";
    }

    dispatch({
      type: types.login,
      payload: {
        id: 23,
        name: Nickname_login,
        rol: rolUsuario,
        membresia: "Silver",
      },
    });

    if (rolUsuario === "administrador") {
      history.replace("/adminHome");
    } else {
      history.replace("/userHome");
    }
  };

  // -------  manejar datos del formulario de creacion de usuario -------
  // Nombre
  const handleNombreChange = (e) => {
    setNombreUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Nombre_usuario: e.target.value,
    });
  };

  // Apellido
  const handleApellidoChange = (e) => {
    setApellidoUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Apellido_usuario: e.target.value,
    });
  };

  // Nickname
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setFormValues({
      ...formValues,
      Nickname: e.target.value,
    });
  };

  // Correo
  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
    setFormValues({
      ...formValues,
      Correo_electronico: e.target.value,
    });
  };

  // Contrasenia
  const handleContraseniaChange = (e) => {
    setContrasenia(e.target.value);
    setFormValues({
      ...formValues,
      Contrasenia: e.target.value,
    });
  };

  // Fecha de nacimiento
  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e);
    setFormValues({
      ...formValues,
      Fecha_Nacimiento: moment(e).format("L"),
    });
  };

  // ---------- Subir imagenes ----------
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
      //setImageUrl(response.data.secure_url);
      setFormValues({
        ...formValues,
        Foto_perfil: response.data.secure_url,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);
    Swal.fire("Aviso", "Usuario creado con exito", "success");
    //reset();
  };

  return (
    <div className="container mt-5">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Iniciar Sesión</h3>
          <br /> <br />
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nickname"
                autoComplete="off"
                onChange={handleNicknameUsuarioChange}
                value={nicknameLogin}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={handleContraseniaLoginChange}
                value={contraseniaLogin}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block mt-3"
                type="submit"
                onClick={handleLogin}
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
        {/*---------- FORMULARIO DE REGISTRO DE USUARIO ---------*/}
        <div className="col-md-6 login-form-2">
          <h3>Registrarse</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={handleNombreChange}
                value={nombreUsuario}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                onChange={handleApellidoChange}
                value={apellidoUsuario}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nickname"
                onChange={handleNicknameChange}
                value={nickname}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                onChange={handleCorreoChange}
                value={correo}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={handleContraseniaChange}
                value={contrasenia}
              />
            </div>

            <div className="form-group">
              <label className="text-white">Fecha de nacimiento</label>
              <DateTimePicker
                onChange={handleFechaNacimientoChange}
                value={fechaNacimiento}
                maxDate={fechaNacimiento}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-white">Foto de perfil</label>
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

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-success btn-block mt-3"
                value="Crear cuenta"
                //onClick={}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
