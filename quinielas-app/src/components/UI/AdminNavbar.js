import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

import "../../index.css";
import { types } from "../../types/types";

export const AdminNavbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  //console.log(user);

  const history = useHistory();

  const handleLogout = () => {
    history.replace("/login");
    dispatch({
      type: types.logout,
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" exact to="/adminHome">
          AdminNavbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/adminHome">
                Inicio
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/carga">
                Carga
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/deportes">
                Deportes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/temporadas">
                Temporadas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/jornadas">
                Jornadas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/calendar">
                Calendario
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/reportes">
                Reportes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/resultados">
                Resultados
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
