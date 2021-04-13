import React, { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { types } from "../../types/types";
import "./Login.css";

export const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const rolUsuario = "user";
  const handleLogin = () => {
    //history.replace("/adminHome");

    dispatch({
      type: types.login,
      payload: {
        id: 23,
        name: "Juan",
        rol: rolUsuario,
      },
    });

    //history.replace("/adminHome");

    if (rolUsuario === "administrator") {
      history.replace("/adminHome");
    } else {
      history.replace("/userHome");
    }
  };

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
