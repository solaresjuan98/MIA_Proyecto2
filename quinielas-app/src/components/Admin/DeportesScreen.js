import React, { useState, useEffect } from "react";
import axios from "axios";
import { TarjetaDeportes } from "./TarjetaDeportes";
//import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

// Deporte inicial
const deporteNuevo = {
  Nombre: "",
  Color_deporte: "",
  Foto_deporte: "",
};

export const DeportesScreen = () => {
  const [deportes, obtenerDeportes] = useState("");

  // Estado de nombre de deporte
  const [nombreDeporte, setNombreDeporte] = useState("");
  // Estado de color
  const [color, setColor] = useState("#ffffff");
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  // Estado de url imagen en cloudinary
  const [imageUrl, setImageUrl] = useState("");

  const url = "http://localhost:4000/deportes";

  useEffect(() => {
    obtenerListaDeportes();
    const interval = setInterval(() => {
      obtenerListaDeportes();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // se puede destructurar, antes era formValues
  /*const [{ Nombre, Color }, handleInputChange, reset] = useForm({
    Nombre: "",
    //Color: "",
  });*/

  // DATOS DE FORMULARIO PARA CREAR DEPORTE
  const [formValues, setFormValues] = useState(deporteNuevo);

  // ------- OBTENER LISTA DE DEPORTES -------
  const obtenerListaDeportes = async () => {
    await axios
      .get(url)
      .then((response) => {
        const listaDeportes = response.data;
        obtenerDeportes(listaDeportes);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  // ------- manejar datos de formulario para crear deporte -------
  const handleNombreDeporteChange = (e) => {
    setNombreDeporte(e.target.value);

    setFormValues({
      ...formValues,
      Nombre: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    console.log(e.target.value);

    setColor(e.target.value);

    setFormValues({
      ...formValues,
      Color_deporte: e.target.value,
    });
  };

  // ------- Subir imagenes -------
  const subirImagen = async () => {
    console.log(imagenSeleccionada);

    const formData = new FormData();
    formData.append("file", imagenSeleccionada);
    formData.append("upload_preset", "mia-proyecto2");

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dxdkgv30q/image/upload";

    await axios.post(cloudinaryUrl, formData).then((response) => {
      setImageUrl(response.data.secure_url);
      console.log(response.data.secure_url);
      //setImageUrl(response.data.secure_url);
      setFormValues({
        ...formValues,
        Foto_deporte: response.data.secure_url,
      });
    });
  };

  // ------- AGREGAR DEPORTE -------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlPost = "http://localhost:4000/crearDeporte";
    console.log(formValues);
    await axios
      .post(urlPost, formValues)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    Swal.fire("Aviso", "Deporte creado con exito", "success");
    setNombreDeporte("");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-4">
          <div className="card border-light mb-3">
            <div className="card-header">
              <h5 className="card-title">Crear nuevo deporte</h5>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Nombre del deporte
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Nombre del deporte"
                    autoComplete="off"
                    name="Nombre"
                    onChange={handleNombreDeporteChange}
                    value={nombreDeporte}
                  />
                </div>
                <div className="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Color de deporte:
                  </label>
                  <br />
                  <input
                    type="color"
                    className="form-control-mt-2"
                    onChange={handleColorChange}
                    value={color}
                  />
                </div>
                <div className="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Imagen de deporte:
                  </label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={(event) => {
                          setImagenSeleccionada(event.target.files[0]);
                        }}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                    <div className="input-group-append">
                      <span
                        style={{ cursor: "pointer" }}
                        className="input-group-text"
                        onClick={() => subirImagen()}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" class="btn btn-primary btn-block">
                    Crear deporte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm mb-5">
          <h2 className="mb-2">Deportes creados: </h2>
          <hr />
          <TarjetaDeportes deportes={deportes} />
        </div>
      </div>
    </div>
  );
};
