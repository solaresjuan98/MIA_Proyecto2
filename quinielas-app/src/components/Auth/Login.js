import React, { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { types } from "../../types/types";
import Swal from "sweetalert2";
//import { useForm } from "../hooks/useForm";
import DateTimePicker from "react-datetime-picker";
import "./Login.css";
import moment from "moment";
import axios from "axios";

const fecha_Nacimiento = moment().minutes(0).seconds(0).subtract(1, "hours");

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

export const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  // URL de api
  //const url = "http://localhost:4000/";

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

  // --- DATOS DEL FORMULARIO PARA CREAR USUARIO
  const [formValues, setFormValues] = useState(usuarioNuevo);

  // -------------------------------
  const rolUsuario = "administrador";
  const handleLogin = () => {
    //history.replace("/adminHome");

    /*
      Membresias de usuario
       - Gold
       - Silver
       - Bronze
    */

    dispatch({
      type: types.login,
      payload: {
        id: 23,
        name: "Administrador",
        rol: rolUsuario,
        membresia: "Silver",
      },
    });

    //history.replace("/adminHome");

    if (rolUsuario === "administrador") {
      history.replace("/adminHome");
    } else {
      history.replace("/userHome");
    }
  };

  // -------  manejar datos del formulario -------
  // Nombre
  const handleNombreChange = (e) => {
    //console.log(e.target.value);
    setNombreUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Nombre_usuario: e.target.value,
    });
  };

  // Apellido
  const handleApellidoChange = (e) => {
    //console.log(e.target.value);
    setApellidoUsuario(e.target.value);

    setFormValues({
      ...formValues,
      Apellido_usuario: e.target.value,
    });
  };

  // Nickname
  const handleNicknameChange = (e) => {
    //console.log(e.target.value);
    setNickname(e.target.value);
    setFormValues({
      ...formValues,
      Nickname: e.target.value,
    });
  };

  // Correo
  const handleCorreoChange = (e) => {
    //console.log(e.target.value);
    setCorreo(e.target.value);
    setFormValues({
      ...formValues,
      Correo_electronico: e.target.value,
    });
  };

  // Contrasenia
  const handleContraseniaChange = (e) => {
    //console.log(e.target.value);
    setContrasenia(e.target.value);
    setFormValues({
      ...formValues,
      Contrasenia: e.target.value,
    });
  };

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
      setImageUrl(response.data.secure_url);
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
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
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

                      /*setFormValues({
                        ...formValues,
                        
                      })*/
                    }}
                  />
                  <label className="custom-file-label" for="inputGroupFile02">
                    Choose file
                  </label>
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
