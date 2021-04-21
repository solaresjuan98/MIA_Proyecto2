package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

//
//var db *sql.DB

// -----------STRUCTS -----------

// TEST STRUCTS
type task struct {
	Id      int    `json:"ID"`
	Name    string `json:"Name"`
	Content string `json:"Content"`
}

type People struct {
	Localidad string `json:"localidad"`
	Nombre    string `json:"nombre"`
}

// ---- END TEST STRUTS ----

// DB STRUCTS

// Tier
type Tier struct {
	NombreTier string `json:"NombreTier"`
	Precio     int    `json:"precio"`
}

// Deportes
type Deporte struct {
	Id_Deporte int    `json:"Id_deporte"`
	Nombre     string `json:"Nombre"`
}

// Recompensas
type Recompensa struct {
	Id_recompensa       int `json:"Id_recompensa"`
	Id_cliente          int `json:"Id_cliente"`
	Cantidad_Recompensa int `json:"Cantidad_Recompensa"`
	Ultima_Recompensa   int `json:"Ultima_Recompensa"`
}

// Temporadas
type Temporada struct {
	Id_temporada int    `json:"Id_temporada"`
	Id_deporte   int    `json:"Id_deporte"`
	Estado       string `json:"Estado"`
}

type allTasks []task

//type allTest []People

var tasks = allTasks{
	{
		Id:      1,
		Name:    "Task One",
		Content: "Test content",
	},
}

// ----------- PETICIONES DE PRUEBA -----------

func getTasks(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(tasks)
}

func createTasks(w http.ResponseWriter, r *http.Request) {
	var newTask task

	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Fprintf(w, "Inserta algo correcto")
	}

	json.Unmarshal(reqBody, &newTask)

	newTask.Id = len(tasks) + 1
	tasks = append(tasks, newTask)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)

}

func getTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	taskId, err := strconv.Atoi(vars["id"])

	if err != nil {
		fmt.Fprintf(w, "ID invalido")
		return
	}

	for _, task := range tasks {
		if task.Id == taskId {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(task)
		}
	}
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	taskId, err := strconv.Atoi(vars["id"])

	if err != nil {
		fmt.Fprintf(w, "Invalid ID")
		return
	}

	for i, task := range tasks {
		if taskId == task.Id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			fmt.Fprintf(w, "La tarea con el id %v ha sido borrada", task.Id)
		}
	}
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to my API -- ")

}

// ----------- PETICIONES A BD ORACLE -----------

// Forma vieja
func getPrueba(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, err := db.Query("SELECT nombre, localidad FROM prueba")

	if err != nil {
		log.Fatal("Error obteniendo los datos \n", err)
	}

	defer rows.Close()

	for rows.Next() {
		var nombre string
		var localidad string

		rows.Scan(&nombre, &localidad)

		fmt.Println("Nombre es " + nombre + " localidad " + localidad)

	}

}

// ----------- PETICION DE PRUEBA -----------

func getPeopleRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	//limit := 45
	limit, _ := strconv.Atoi(r.FormValue("limit"))

	people := getData(limit)

	peopleJSON, _ := json.Marshal(people)
	w.Header().Set("Content-Type", "application/json")
	w.Write(peopleJSON)

}

// Obtener datos de la tabla de prueba
func getData(n int) []People {

	people := make([]People, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query("SELECT nombre, localidad FROM prueba")

	if err != nil {
		log.Fatal(err)
	}
	//defer db.Close()

	for rows.Next() {
		p := new(People)
		rows.Scan(&p.Localidad, &p.Nombre)
		people = append(people, *p)
	}

	return people

}

// ----------- OBTENER TIER -----------
func obtenerTierRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	tier := obtenerTier(limit)

	tierJSON, _ := json.Marshal(tier)
	w.Header().Set("Content-Type", "application/json")
	w.Write(tierJSON)
}

func obtenerTier(n int) []Tier {

	tier := make([]Tier, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query("SELECT nombre_tier, precio FROM TIER")

	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		t := new(Tier)
		rows.Scan(&t.NombreTier, &t.Precio)
		tier = append(tier, *t)
	}

	return tier

}

// ----------- OBTENER DEPORTES -----------
func getDeportesRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	deportes := obtenerDeportes(limit)

	deportesJSON, _ := json.Marshal(deportes)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(deportesJSON)

}

func obtenerDeportes(n int) []Deporte {

	deportes := make([]Deporte, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query("SELECT id_deporte, nombre_deporte FROM deporte")

	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		d := new(Deporte)
		rows.Scan(&d.Id_Deporte, &d.Nombre)
		deportes = append(deportes, *d)
	}

	return deportes

}

// ----------- OBTENER TEMPORADAS -----------
func obtenerTemporadasRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	temporadas := obtenerTemporadas(limit)

	temporadasJSON, _ := json.Marshal(temporadas)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(temporadasJSON)
}

func obtenerTemporadas(n int) []Temporada {

	temporadas := make([]Temporada, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query("SELECT id_temporada, estado_temporada, id_deporte FROM temporada")

	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		t := new(Temporada)
		rows.Scan(&t.Id_temporada, &t.Estado, &t.Id_deporte)
		temporadas = append(temporadas, *t) //
	}

	return temporadas
}

// ----------- FUNCION MAIN -----------

func main() {

	router := mux.NewRouter().StrictSlash(true)

	// CONECTANDO BASE DE DATOS
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// RUTAS DE PRUEBA
	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/tasks", getTasks).Methods("GET")
	router.HandleFunc("/tasks", createTasks).Methods("POST")
	router.HandleFunc("/tasks/{id}", getTask).Methods("GET")
	router.HandleFunc("/tasks/{id}", deleteTask).Methods("DELETE")

	// RUTAS A LA BASE DE DATOS
	router.HandleFunc("/prueba", getPeopleRouter).Methods("GET")
	router.HandleFunc("/tier", obtenerTierRouter).Methods("GET")
	router.HandleFunc("/deportes", getDeportesRouter).Methods("GET")
	router.HandleFunc("/temporadas", obtenerTemporadasRouter).Methods("GET")

	// SET PORT
	log.Fatal(http.ListenAndServe(":4000", router))

}

// CompileDaemon -command="./backend"
