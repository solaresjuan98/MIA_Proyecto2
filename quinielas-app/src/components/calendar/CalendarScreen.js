import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
//import '../../App.css';

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "VARselona vs Real Madrid",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Partido de LaLiga",
    user: {
      _id: "123",
      name: "Juan",
    },
  },
  {
    title: "Bayern Munich vs PSG",
    start: moment().add(4, "hours").toDate(),
    end: moment().add(6, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Partido de UCL",
    user: {
      _id: "124",
      name: "Cecilia",
    },
  },
];

export const CalendarScreen = () => {
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
    //console.log(event, start, end, isSelected);

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
    <div className="container mt-5 calendar-screen">
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

      <CalendarModal />
    </div>
  );
};
