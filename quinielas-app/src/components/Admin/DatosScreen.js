import React from "react";
import yaml from "js-yaml";

export const DatosScreen = () => {
  let fileReader;

  /* */
  const handleLeerArchivo = (e) => {
    const contenido = fileReader.result;

    const doc = yaml.load(contenido);

    //let arr = [];
    //arr = doc;

    //console.log(arr);

    for (const [elemento1, elemento2] of Object.entries(doc)) {
      //console.log(elemento1);
      console.log(
        elemento2.nombre,
        elemento2.apellido,
        elemento2.username,
        elemento2.password
      );
      console.log("Num resultados:", elemento2.resultados.length);
      for (let i = 0; i < elemento2.resultados.length; i++) {
        //console.log(elemento2.resultados[i].temporada);
        //console.log(elemento2.resultados[i].tier);
        //console.log("Num jornadas: ", elemento2.resultados[i].jornadas.length);

        for (let j = 0; j < elemento2.resultados[i].jornadas.length; j++) {
          console.log(elemento2.resultados[i].jornadas[j].jornada);
          console.log("Num predicciones: ", elemento2.resultados[i].jornadas[j].predicciones.length)
          
          for(let k = 0; k < elemento2.resultados[i].jornadas[j].predicciones.length; k++){
            console.log(
              elemento2.resultados[i].jornadas[j].predicciones[k].deporte, 
              elemento2.resultados[i].jornadas[j].predicciones[k].fecha,
              elemento2.resultados[i].jornadas[j].predicciones[k].visitante,
              elemento2.resultados[i].jornadas[j].predicciones[k].local,
              elemento2.resultados[i].jornadas[j].predicciones[k].prediccion.visitante,
              " - ",
              elemento2.resultados[i].jornadas[j].predicciones[k].prediccion.local)
          }
        }
      }
      //console.log(elemento2.resultados.temporada);
    }
    /* 
    arr.map((elemento) => {
      console.log(elemento);
    })
    */

    //console.log(doc.A2);
    //console.log(doc.A2.nombre);
    //console.log(doc.A2.resultados);
    //console.log(doc.A2.resultados[0].jornadas);
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
      <h2>Elige que datos quieres cargar a la base de datos</h2>
      <div className="row mt-5">

      </div>
    </div>
  );
};
