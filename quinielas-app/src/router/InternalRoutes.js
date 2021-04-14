import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import { AdminDashboard } from "../components/Admin/AdminDashboard";
import { Jornadas } from "../components/Admin/Jornadas";
import { Resultados } from "../components/Admin/Resultados";
import { AdminNavbar } from "../components/UI/AdminNavbar";
import { UserNavbar } from "../components/UI/UserNavbar";
import { UserDashboard } from "../components/User/UserDashboard";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { MembresiaScreen } from "../components/User/MembresiaScreen";
import { PerfilScreen } from "../components/User/PerfilScreen";

export const InternalRoutes = () => {
  const { user } = useContext(AuthContext);
  console.log(user.rol);
  let isUser = false;

  // Valida el rol del usuario, es decir si es usuario (con o sin membresia) o administrador
  if (user.rol === "user") {
    isUser = true;
  }

  return (
    <>
      {isUser ? <UserNavbar /> : <AdminNavbar />}

      <div>
        <Switch>
          <Route exact path="/adminHome" component={AdminDashboard} />
          <Route exact path="/jornadas" component={Jornadas} />
          <Route exact path="/resultados" component={Resultados} />
          <Route exact path="/userHome" component={UserDashboard} />
          <Route exact path="/calendar" component={CalendarScreen} />
          <Route exact path="/membresia" component={MembresiaScreen} />
          <Route exact path="/perfilUsuario" component={PerfilScreen} />
          <Redirect to="/adminHome" />
        </Switch>
      </div>
    </>
  );
};
