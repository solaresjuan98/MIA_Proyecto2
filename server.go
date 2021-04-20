package main

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	_ "github.com/mattn/go-oci8"
)

type Prueba struct {
	id_prueba int
	nombre    string
	localidad string
}

func main() {

	/*
		db -> devuelve la conexión con la base de datos
	*/
	// Hago la conexión con la bd
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")

	// si hubo un error
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// ----------------------------------------------------

	rows, err := db.Query("SELECT user FROM DUAL")

	if err != nil {
		log.Fatal("Error al obtener los datos \n", err)
	}

	defer rows.Close()

	for rows.Next() {
		var nombre string

		rows.Scan(&nombre)
		fmt.Println("El nombre del usuario es " + nombre)
	}

	// ----------------------------------------------------

	rows2, err2 := db.Query("SELECT nombre, localidad from PRUEBA")

	if err != nil {
		log.Fatal("Error al obtener los datos \n", err2)
	}

	defer rows2.Close()

	for rows2.Next() {
		var nombre string
		var localidad string

		rows2.Scan(&nombre, &localidad)

		fmt.Println("El Nombre: " + nombre + " y la localidad es " + localidad)
	}

	// ----------------------------------------------------

	rows3, err3 := db.Query("SELECT COUNT(*) FROM prueba")

	if err3 != nil {
		log.Fatal("Error")
	}

	for rows3.Next() {
		var tam int

		rows3.Scan(&tam)

		fmt.Println("Tamanio " + strconv.Itoa(tam))
	}

	// ----------------------------------------------------

}
