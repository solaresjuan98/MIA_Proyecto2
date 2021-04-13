import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import { AdminDashboard } from "../components/Admin/AdminDashboard";
import { Jornadas } from "../components/Admin/Jornadas";
import { Resultados } from "../components/Admin/Resultados";
import { AdminNavbar } from "../components/UI/AdminNavbar";
import { UserNavbar } from "../components/UI/UserNavbar";
import { UserDashboard } from "../components/User/UserDashboard";

export const DashboardRoutes = () => {
  const { user } = useContext(AuthContext);
  console.log(user.rol);
  let isUser = false;

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
          <Redirect to="/adminHome" />
        </Switch>
      </div>
    </>
  );
};
