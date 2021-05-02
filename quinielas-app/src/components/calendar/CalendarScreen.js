import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-es";
import { CalendarEvent } from "./CalendarEvent";
import { AuthContext } from "../../Auth/AuthContext";
import "../../App.css";
import { AgregarEvento } from "../UI/AgregarEvento";
import axios from "axios";

moment.locale("es");
const localizer = momentLocalizer(moment);
let tieneMembresia = false;
let events_ = [];

// Definir las fecha actual, para dar colores al calendario
//const ahora = moment().minutes(0).seconds(0).add(1, "hours");

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
  // Estado de temporadas, para filtrar
  const [temporadas, setTemporadas] = useState([]);
  // Estado de id de temporada para filtrar
  const [idTemporada, setidTemporada] = useState(temporadas);
  // Estado de eventos filtrados, para mostrar en el calendario
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  useEffect(() => {
    obtenerListaEventos();
    obtenerListaTemporadas();
    const interval = setInterval(() => {
      obtenerListaEventos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  events_ = [...eventos];

  // Formateando las fechas del calendario
  for (let i = 0; i < events_.length; i++) {
    events_[i].start = moment(events_[i].start).toDate();//.add(6, "hours").toDate();
    events_[i].end = moment(events_[i].end).toDate(); //.add(6, "hours").toDate();
    //events_[i].start = moment(events_[i].start).toDate();
    //events_[i].end = moment(events_[i].end).toDate();
  }

  //console.log(events_);

  // alterar fecha de eventos
  //console.log(moment(events_[0].start).toDate());

  const handleIdTemporadaChange = (e) => {
    setidTemporada(e.target.value);

    filtrarEventos(e.target.value);
  };

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

  // -------- OBTENER LISTADO DE EVENTOS --------
  const obtenerListaEventos = async () => {
    await axios.get(`${url}eventos`).then((response) => {
      const listaEventos = response.data;
      setEventos(listaEventos);
    });
  };

  // -------- OBTENER LISTADO DE TEMPORADAS --------
  const obtenerListaTemporadas = async () => {
    await axios.get(`${url}temporadas`).then((response) => {
      const listaTemporadas = response.data;
      setTemporadas(listaTemporadas);
    });
  };

  // --------  FILTRAR EVENTOS POR TEMPORADA --------
  const filtrarEventos = (idTemp) => {
    const evFiltrados = events_.filter(
      (evento) => evento.Id_temporada === parseInt(idTemp)
    );

    setEventosFiltrados(evFiltrados);
    console.log(evFiltrados);
  };

  return (
    <div>
      {tieneMembresia ? (
        <div>
          <form>
            <div className="form-group ml-3">
              <label className="col-form-label" for="inputDefault">
                Ver eventos de temporada...
              </label>
              <select
                className="custom-select"
                onChange={handleIdTemporadaChange}
                value={idTemporada}
              >
                <option>Selecciona una temporada</option>
                {temporadas.map((temporadas, i) => {
                  return <option>{temporadas.Id_temporada}</option>;
                })}
              </select>
            </div>
          </form>
          <div className="calendar-screen">
            {/*<h3 className="mt-2">Temporada: 2021-Q21 </h3>*/}

            <Calendar
              localizer={localizer}
              events={eventosFiltrados}
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
