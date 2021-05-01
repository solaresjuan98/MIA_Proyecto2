import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-es";
import { CalendarEvent } from "./CalendarEvent";
//import { CalendarModal } from "./CalendarModal";
import { AuthContext } from "../../Auth/AuthContext";
import "../../App.css";
import { AgregarEvento } from "../UI/AgregarEvento";
import axios from "axios";

moment.locale("en");
const localizer = momentLocalizer(moment);
let tieneMembresia = false;
let events_ = [];

// Definir las fecha actual, para dar colores al calendario
const ahora = moment().minutes(0).seconds(0).add(1, "hours");
export const CalendarScreen = () => {
  const url = "http://localhost:4000/";
  const { user } = useContext(AuthContext);
  //console.log(user.membresia);
  const tipoMembresia = user.membresia;
  // Validar si es miembro para mostrar el calendariio
  if (
    tipoMembresia === "Gold" ||
    tipoMembresia === "Silver" ||
    tipoMembresia === "Bronze"
  ) {
    tieneMembresia = true;
  }

  // Estado de eventos
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerListaEventos();

    const interval = setInterval(() => {
      obtenerListaEventos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  events_ = [...eventos];

  // Formateando las fechas del calendario
  for (let i = 0; i < events_.length; i++) {
    events_[i].start = moment(events_[i].start).add(6, "hours").toDate();
    events_[i].end = moment(events_[i].end).add(6, "hours").toDate();
  }

  //console.log(events_);

  // alterar fecha de eventos
  //console.log(moment(events_[0].start).toDate());

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      //backgroundColor: "#40CE6F", // Personalizar colores
      borderRAdius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  // OBTENER LISTADO DE EVENTOS
  const obtenerListaEventos = async () => {
    await axios.get(`${url}eventos`).then((response) => {
      const listaEventos = response.data;
      setEventos(listaEventos);
    });
  };
  //console.log(eventos);

  return (
    <div>
      {tieneMembresia ? (
        <div>
          <form>
            <div className="form-group ml-3">
              <label class="col-form-label" for="inputDefault">
                Ver eventos de temporada...
              </label>
              <select className="custom-select">
                <option>Selecciona una temporada</option>
              </select>
            </div>
            <div className="form-group ml-3">
              <button className="btn btn-success">Filtrar</button>
            </div>
          </form>
          <div className="calendar-screen">
            {/*<h3 className="mt-2">Temporada: 2021-Q21 </h3>*/}

            <Calendar
              localizer={localizer}
              events={events_}
              startAccessor="start"
              endAccessor="end"
              messages={messages}
              eventPropGetter={eventStyleGetter}
              onDoubleClickEvent={onDoubleClick}
              onView={onViewChange}
              view={lastView}
              onSelectEvent={onSelectEvent}
              components={{
                event: CalendarEvent,
              }}
            />

            <AgregarEvento />
          </div>
        </div>
      ) : (
        <h1>Para acceder al calendario, debes tener una membresia activa</h1>
      )}
    </div>
  );
};
