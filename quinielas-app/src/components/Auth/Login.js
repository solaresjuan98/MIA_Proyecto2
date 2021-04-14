import React, { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { types } from "../../types/types";
import DateTimePicker from "react-datetime-picker";
import "./Login.css";
import moment from 'moment';


const fechaNacimiento = moment().minutes(0).seconds(0).subtract(1, "hours");


export const Login = ({ history }) => {

  const { dispatch } = useContext(AuthContext);

  const [birthDate, setBirthDate] = useState(fechaNacimiento.toDate());

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


  const handleFechaNacimientoChange = (e) => {
    console.log(e);
  }

  return (
    <div className="container mt-5">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Iniciar Sesión</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
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
              <input
                type="button"
                className="btnSubmit"
                value="Ingresar"
                onClick={handleLogin}
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registrarse</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
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
              <input
                type="password"
                className="form-control"
                placeholder="Repetir contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Tier"
              />
            </div>

            <div className="form-group">
              <label className="text-white">Fecha de nacimiento</label>
              <DateTimePicker
                onChange={handleFechaNacimientoChange}
                value={birthDate}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile02" />
                  <label className="custom-file-label" for="inputGroupFile02">Choose file</label>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text">Upload</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
                onClick={handleLogin}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
