import React, { useState, useContext } from "react";
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

moment.locale("es");
const localizer = momentLocalizer(moment);
let tieneMembresia = false;

// Example of a list of events
const events = [
  {
    title: "VARselona vs Real Madrid",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Partido de LaLiga",
    prediccion: "0-2",
    user: {
      _id: "123",
      name: "Juan",
    },
  },
  {
    title: "Bayern Munich vs PSG",
    start: moment().add(12, "hours").toDate(),
    end: moment().add(14, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Partido de UCL",
    prediccion: "/", // Prediccion no realizada
    user: {
      _id: "124",
      name: "Cecilia",
    },
  },
];

export const CalendarScreen = () => {
  const { user } = useContext(AuthContext);
  console.log(user.membresia);
  const tipoMembresia = user.membresia;
  // Validar si es miembro para mostrar el calendariio
  if (
    tipoMembresia === "Gold" ||
    tipoMembresia === "Silver" ||
    tipoMembresia === "Bronze"
  ) {
    tieneMembresia = true;
  }

  console.log(tieneMembresia);
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
      backgroundColor: "#40CE6F", // PErsonalizar colores
      borderRAdius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div>
      {tieneMembresia ? (
        <div className="calendar-screen">
          <h3 className="mt-2">Temporada: 2021-Q21 </h3>
          
          <Calendar
            localizer={localizer}
            events={events}
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
          {/*<CalendarModal />*/}

          <AgregarEvento />
        </div>
      ) : (
        <h1>Para acceder al calendario, debes tener una membresia activa</h1>
      )}
    </div>
  );
};
