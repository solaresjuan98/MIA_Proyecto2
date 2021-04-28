import React, { useState } from "react";
import { CalendarModal } from "../calendar/CalendarModal";

export const AgregarEvento = () => {
  const [abrirModal, setAbrirModal] = useState(false);

  const handleMostrarModal = () => {
    setAbrirModal(!abrirModal);
    console.log(abrirModal);
  };

  return (
    <div>
      {" "}
      <button className="btn btn-primary fab" onClick={handleMostrarModal}>
        <i className="fas fa-plus"></i>
      </button>
      {!abrirModal ? <CalendarModal /> : <h5>{""}</h5>}
    </div>
  );
};
