import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import { AdminDashboard } from "../components/Admin/AdminDashboard";
import { JornadasScreen } from "../components/Admin/JornadasScreen";
import { Resultados } from "../components/Admin/Resultados";
import { AdminNavbar } from "../components/UI/AdminNavbar";
import { UserNavbar } from "../components/UI/UserNavbar";
import { UserDashboard } from "../components/User/UserDashboard";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { MembresiaScreen } from "../components/User/MembresiaScreen";
import { PerfilScreen } from "../components/User/PerfilScreen";
import { PosicionesScreen } from "../components/User/PosicionesScreen";
import { DeportesScreen } from "../components/Admin/DeportesScreen";
import { ReportesScreen } from "../components/Admin/ReportesScreen";
import { TemporadasScreen } from "../components/Admin/TemporadasScreen";
import { DatosScreen } from "../components/Admin/DatosScreen";
import { CalendarUserScreen } from "../components/userCalendar/CalendarUserScreen";

export const InternalRoutes = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  console.log(user.rol);
  let isUser = false;

  // Valida el rol del usuario, es decir si es usuario (con o sin membresia) o administrador
  if (user.rol === "user") {
    //console.log('xdddd');
    isUser = true;
  }

  return (
    <>
      {isUser ? <UserNavbar /> : <AdminNavbar />}

      <div>
        <Switch>
          {/*RUTAS PARA ADMINISTRADOR*/}
          <Route exact path="/adminHome" component={AdminDashboard} />
          <Route exact path="/jornadas" component={JornadasScreen} />
          <Route exact path="/resultados" component={Resultados} />
          <Route exact path="/deportes" component={DeportesScreen} />
          <Route exact path="/reportes" component={ReportesScreen} />
          <Route exact path="/temporadas" component={TemporadasScreen} />
          <Route exact path="/carga" component={DatosScreen} />
          <Route exact path="/calendar" component={CalendarScreen} />

          {/*RUTAS PARA USUARIO */}
          <Route exact path="/userHome" component={UserDashboard} />
          <Route exact path="/membresia" component={MembresiaScreen} />
          <Route exact path="/perfilUsuario" component={PerfilScreen} />
          <Route exact path="/tablaPosiciones" component={PosicionesScreen} />
          <Route exact path="/calendarioUsuario" component={CalendarUserScreen} />

          {/*RUTA POR DEFECTO (inicial)*/}
          <Redirect to="/login" />
        </Switch>
      </div>
    </>
  );
};
