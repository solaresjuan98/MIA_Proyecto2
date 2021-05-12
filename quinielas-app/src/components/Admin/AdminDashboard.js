import React, { useState, useEffect } from "react";
import axios from "axios";

export const AdminDashboard = () => {
  const url = "http://localhost:4000/";

  useEffect(() => {
    obtenerCapital();
  }, []);

  // Estado de capital de temporada
  const [capitalTemp, setCapitalTemp] = useState([]);

  const obtenerCapital = async () => {
    await axios
      .get(`${url}capitalTemporada`)
      .then((response) => {
        const listaCapital = response.data;
        setCapitalTemp(listaCapital);
      })
      .catch((err) => console.error(`Err: ${err}`));
  };

  return (
    <div className="container-fluid mt-5">
      {/*Dashboard*/}
      <div className="row">
        <div className="col-sm-4 animate__animated animate__backInDown">
          <h3>Capital de temporada actual</h3>
          <ul className="list-group mt-3">
            {capitalTemp.map((capital, i) => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Temporada: {capital.Nombre_temporada}
                  <span className="badge badge-primary badge-pill">
                    Q. {capital.Total_pagado}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Capital de temporada</div>
            <div className="card-body">
              <h4 className="card-title">10354</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes bronze</div>
            <div className="card-body">
              <h4 className="card-title">4121</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes silver</div>
            <div className="card-body">
              <h4 className="card-title">10354</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm col-md-2">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header">Clientes gold</div>
            <div className="card-body">
              <h4 className="card-title">4455</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3"></div>

      <div className="row mt-3"></div>

      {/* ---------- */}
    </div>
  );
};
