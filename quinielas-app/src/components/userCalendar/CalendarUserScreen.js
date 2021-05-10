import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-es";
//import { CalendarEvent } from "./CalendarEvent";
import { AuthContext } from "../../Auth/AuthContext";
import "../../App.css";
import axios from "axios";
import { ModalPrediccion } from "./ModalPrediccion";

moment.locale("es");
const localizer = momentLocalizer(moment);
let tieneMembresia = false;

let events_ = [];

// Prueba
/*
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
    bgcolor: "#ccc",
    notes: "Partido de UCL",
    prediccion: "/", // Prediccion no realizada
    user: {
      _id: "124",
      name: "Cecilia",
    },
  },
];
*/
/*
  Los eventos del calendario son relativamente simples para otorgar una mayor facilidad de uso para el usuario. La
  única información relevante por cada evento a mostrar en el calendario de navegación además de su color será el
  nombre del equipo local, el equipo visitante y su correspondiente predicción si ya se realizó, el sı́mbolo “/” si no se  
  ha hecho junto a la opción de realizarla y el resultado real si en caso el evento ya ocurrió.
  La escala de intervalos a utilizar en la vista semanal queda a discreción del estudiante.
*/

export const CalendarUserScreen = () => {
  const url = "http://localhost:4000/";
  const { user } = useContext(AuthContext);

  // Estado de Usuario loggeado
  const [clienteLogueado, setClienteLogueado] = useState("");
  // Estado de evento seleccionado
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  // Eventos para mostrar en calendario
  const [eventosCalendario, setEventosCalendario] = useState([]);

  useEffect(() => {
    obtenerDatosCliente();
    obtenerEventosCalendario();
  }, []);

  events_ = [...eventosCalendario];

  for (let i = 0; i < events_.length; i++) {
    events_[i].start = moment(events_[i].start).toDate(); //.add(6, "hours").toDate();
    events_[i].end = moment(events_[i].end).toDate(); //.add(6, "hours").toDate();
    //events_[i].start = moment(events_[i].start).toDate();
    //events_[i].end = moment(events_[i].end).toDate();
  }

  if (
    clienteLogueado.Membresia === "gold" ||
    clienteLogueado.Membresia === "silver" ||
    clienteLogueado.Membresia === "bronze"
  ) {
    tieneMembresia = true;
  }

  // OBTENER DATOS DE USUARIO AUTENTICADO
  const obtenerDatosCliente = async () => {
    axios
      .get(`${url}cliente/${user.nickname}`)
      .then((response) => {
        const cliente = response.data;
        setClienteLogueado(cliente);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  // --------- OBTENER EVENTOS A MOSTRAR
  const obtenerEventosCalendario = async () => {
    axios
      .get(`${url}tempActual`)
      .then((response) => {
        const listaEventos = response.data;
        setEventosCalendario(listaEventos);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  // ------------ COSAS PARA QUE EL CALENDARIO FUNCIONE
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#33B2FF", // Personalizar colores
      borderRAdius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const [abrirModal, setAbrirModal] = useState(false);

  const handleMostrarModalPrediccion = () => {
    setAbrirModal(!abrirModal);
  };

  const onDoubleClick = (e) => {
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
    setEventoSeleccionado(e);
    // Mostrar el modal para hacer la prediccion
    handleMostrarModalPrediccion();
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  return (
    <div>
      {tieneMembresia ? (
        <div>
          {/* VER CALENDARIO */}
          <div className="calendar-screen mt-1 animate__animated animate__fadeInUp">
            <Calendar
              localizer={localizer}
              events={events_} // Cambiar por los eventos del backend
              startAccessor="start"
              endAccessor="end"
              messages={messages}
              eventPropGetter={eventStyleGetter}
              onDoubleClickEvent={onDoubleClick}
              onView={onViewChange}
              view={lastView}
              onSelectEvent={onSelectEvent}
              /*components={{
                event: CalendarEvent,
              }}*/
            />
          </div>
          {!abrirModal && eventoSeleccionado !== "" ? (
            <ModalPrediccion evento={eventoSeleccionado} />
          ) : (
            <h5>{""}</h5>
          )}
        </div>
      ) : (
        <div className="container mt-5">
          <h1>Para acceder al calendario, debes tener una membresía activa </h1>
        </div>
      )}
    </div>
  );
};
