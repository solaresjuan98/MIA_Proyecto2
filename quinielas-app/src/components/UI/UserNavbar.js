import React, { useContext, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import "../../index.css";
import { types } from "../../types/types";

export const UserNavbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  //console.log(rol);
  //console.log(user);

  const [navbarColapsado, setNavbarColapsado] = useState(true);

  const handleColapsarNavbar = () => {
    setNavbarColapsado(!navbarColapsado);
  };

  const history = useHistory();

  const handleLogout = () => {
    history.replace("/login");
    dispatch({
      type: types.logout,
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark animate__animated animate__fadeIn">
        <NavLink className="navbar-brand" exact to="/userHome">
          Inicio
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded={!navbarColapsado ? true : false}
          aria-label="Toggle navigation"
          onClick={handleColapsarNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${
            navbarColapsado ? "collapse" : ""
          } navbar-collapse animate__animated animate__fadeIn`}
          id="navbarColor01"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/userHome">
                Home
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/perfilUsuario">
                Perfil
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/calendarioUsuario">
                Calendario
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/membresia">
                Membresia
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/misPredicciones">
                Predicciones
              </NavLink>
            </li>
          </ul>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <span className="nav-item nav-link text-info">
                {user.nickname}
              </span>
              <button
                className="nav-item nav-link btn btn-danger"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
