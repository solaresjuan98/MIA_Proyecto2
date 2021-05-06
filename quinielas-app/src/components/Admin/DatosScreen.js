import React from "react";
import yaml from "js-yaml";

export const DatosScreen = () => {
  let fileReader;

  /* */
  const handleLeerArchivo = (e) => {
    const contenido = fileReader.result;

    const doc = yaml.load(contenido);

    console.log(doc.A2);
    for(let i = 0; i < 100; i++){
      
    }
    ///console.log(doc[0])
    //console.log(contenido); nostrar el string del contenido
  };

  const handleElegirArchivo = (archivo) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleLeerArchivo;
    fileReader.readAsText(archivo);
    //console.log(archivo.name);
  };

  return (
    <div className="container mt-5">
      <h1>Seccion de datos</h1>
      <hr />
      <h5>Subir un archivo YAML</h5>
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            onChange={(e) => handleElegirArchivo(e.target.files[0])}
          />
          <label className="custom-file-label">Choose file</label>
        </div>
        <div className="input-group-append">
          <span
            style={{ cursor: "pointer" }}
            className="input-group-text"
            //onClick={(e) => handleElegirArchivo(e.target.files[0])}
          >
            Upload
          </span>
        </div>
      </div>
    </div>
  );
};
