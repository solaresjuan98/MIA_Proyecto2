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

//
type task struct {
	Id      int    `json:"ID"`
	Name    string `json:"Name"`
	Content string `json:"Content"`
}

type People struct {
	Localidad string `json:"localidad"`
	Nombre    string `json:"nombre"`
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

func getPeopleRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	//limit := 45
	limit, _ := strconv.Atoi(r.FormValue("limit"))

	people := getData(limit)

	peopleJSON, _ := json.Marshal(people)
	w.Header().Set("Content-Type", "application/json")
	w.Write(peopleJSON)

}

// Obtener datos de la
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

	// SET PORT
	log.Fatal(http.ListenAndServe(":4000", router))

}

// CompileDaemon -command="./backend"
