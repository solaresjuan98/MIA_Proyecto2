package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/handlers"
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

// esto es de pruebas
type allTasks []task

// arreglo de clientes
type clientes []Usuario

// Arreglo de tareas [PRUEBAS]
var tasks = allTasks{
	{
		Id:      1,
		Name:    "Task One",
		Content: "Test content",
	},
}

// ---- END TEST STRUTS ----

// DB STRUCTS
// Usuario
type Usuario struct {
	Id_cliente         int    `json:"Id_cliente"`
	Nombre_usuario     string `json:"Nombre_usuario"`
	Apellido_usuario   string `json:"Apellido_usuario"`
	Nickname           string `json:"Nickname"`
	Id_tier            int    `json:"Id_tier"`
	Membresia          string `json:"Membresia"`
	Fecha_nacimiento   string `json:"Fecha_nacimiento"`
	Correo_electronico string `json:"Correo_electronico"`
	Foto_perfil        string `json:"Foto_perfil"`
	Contrasenia        string `json:"Contrasenia"`
}

// Tier
type Tier struct {
	NombreTier string `json:"NombreTier"`
	Precio     int    `json:"precio"`
}

// Deportes
type Deporte struct {
	Id_Deporte    int    `json:"Id_deporte"`
	Nombre        string `json:"Nombre"`
	Color_deporte string `json:"Color_deporte"`
	Foto_deporte  string `json:"Foto_deporte"`
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
	Id_temporada     int    `json:"Id_temporada"`
	Deporte          string `json:"Deporte"`
	Nombre_temporada string `json:"Nombre_temporada"`
	Id_deporte       int    `json:"Id_deporte"`
	Estado           string `json:"Estado"`
	Anio             string `json:"Anio"`
	Fecha_inicio     string `json:"Fecha_inicio"`
	Fecha_final      string `json:"Fecha_fin"`
}

// Jornadas
type Jornada struct {
	Id_jornada   int    `json:"Id_jornada"`
	Id_temporada int    `json:"Id_temporada"`
	Anio         string `json:"Anio"`
	Fecha_inicio string `json:"Fecha_inicio"`
	Fecha_final  string `json:"Fecha_final"`
	Estado       string `json:"Estado"`
}

// Evento (Para metodo POST)
type Evento struct {
	Id_temporada     int    `json:"Id_temporada"`
	Id_jornada       int    `json:"Id_jornada"`
	Titulo_evento    string `json:"Titulo_evento"`
	Equipo_local     string `json:"Equipo_local"`
	Equipo_visitante string `json:"Equipo_visitante"`
	Fecha_inicio     string `json:"Fecha_inicio"`
	Fecha_final      string `json:"Fecha_final"`
}

// Evento (Para peticion GET, para que sea compatible con el calendario)
type EventoCalendario struct {
	Id_temporada     int    `json:"Id_temporada"`
	Id_jornada       int    `json:"Id_jornada"`
	Titulo_evento    string `json:"title"`
	Equipo_local     string `json:"Equipo_local"`
	Equipo_visitante string `json:"Equipo_visitante"`
	Fecha_inicio     string `json:"start"`
	Fecha_final      string `json:"end"`
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
	rows, _ := db.Query("SELECT id_deporte, nombre_deporte, foto_deporte, color FROM deporte order by NOMBRE_DEPORTE asc")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	for rows.Next() {
		d := new(Deporte)
		rows.Scan(&d.Id_Deporte, &d.Nombre, &d.Foto_deporte, &d.Color_deporte)
		deportes = append(deportes, *d) //
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
	//w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	w.Write(temporadasJSON)
}

func obtenerTemporadas(n int) []Temporada {

	temporadas := make([]Temporada, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	//rows, _ := db.Query("SELECT id_temporada, nombre_temporada , estado_temporada, id_deporte FROM temporada")
	rows, _ := db.Query("SELECT ID_TEMPORADA, ID_DEPORTE ,CAST(fecha_inicio AS VARCHAR2(30)) AS FECHA_INICIO,CAST(fecha_final AS VARCHAR2(30)) AS FECHA_FIN,EXTRACT(YEAR FROM fecha_inicio) as ANIO_INICIO, estado_temporada FROM TEMPORADA order by ID_TEMPORADA asc")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	for rows.Next() {
		t := new(Temporada)
		rows.Scan(&t.Id_temporada, &t.Id_deporte, &t.Fecha_inicio, &t.Fecha_final, &t.Anio, &t.Estado)
		//rows.Scan(&t.Id_temporada, &t.Nombre_temporada, &t.Estado, &t.Id_deporte)
		temporadas = append(temporadas, *t) //
	}

	return temporadas
}

// ----------- OBTENER JORNADAS -----------
func obtenerJornadasRouter(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	jornadas := obtenerJornadas(limit)

	jornadasJSON, _ := json.Marshal(jornadas)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(jornadasJSON)

}

func obtenerJornadas(n int) []Jornada {

	jornadas := make([]Jornada, 0)
	// CONSULTA SQL
	query := "SELECT ID_JORNADA,ID_TEMPORADA,CAST(FECHA_INICIO_JORNADA AS VARCHAR2(30)) AS FECHA_INICIO,CAST(FECHA_FIN_JORNADA AS VARCHAR2(30)) AS FECHA_FIN,EXTRACT(YEAR FROM fecha_fin_jornada) as ANIO_INICIO, ESTADO_JORNADA FROM JORNADA ORDER BY ID_JORNADA ASC"
	//query := "SELECT ID_JORNADA, ID_TEMPORADA, CAST(FECHA_INICIO_JORNADA AS VARCHAR2(30)) AS FECHA_INICIO, CAST(FECHA_FIN_JORNADA AS VARCHAR2(30)) AS FECHA_FIN, ESTADO_JORNADA FROM JORNADA"

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query(query)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	for rows.Next() {
		j := new(Jornada)
		rows.Scan(&j.Id_jornada, &j.Id_temporada, &j.Fecha_inicio, &j.Fecha_final, &j.Anio, &j.Estado)
		jornadas = append(jornadas, *j)
	}

	return jornadas

}

// ----------- OBTENER EVENTOS -----------

func obtenerEventosRouter(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	eventos := obtenerEventos(limit)

	eventosJSON, _ := json.Marshal(eventos)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(eventosJSON)

}

func obtenerEventos(n int) []EventoCalendario {

	eventos := make([]EventoCalendario, 0)

	query := "SELECT ID_TEMPORADA, ID_JORNADA, NOMBRE_EVENTO, EQUIPO_LOCAL, EQUIPO_VISITANTE, FECHA_INICIO_EVENTO, FECHA_FIN_EVENTO FROM EVENTO"

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query(query)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	for rows.Next() {
		e := new(EventoCalendario)
		rows.Scan(&e.Id_temporada, &e.Id_jornada, &e.Titulo_evento, &e.Equipo_local, &e.Equipo_visitante, &e.Fecha_inicio, &e.Fecha_final)
		eventos = append(eventos, *e)
	}

	return eventos

}

// ----------- OBTENER USUARIOS -----------

// ----------- OBTENER USUARIO -----------

func obtenerUsuariosRouter(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	clientes := obtenerClientes(limit)

	clientesJSON, _ := json.Marshal(clientes)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(clientesJSON)

}

func obtenerUsuarioNicknameRouter(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	nickname := vars["nickname"]

	/*
		if err != nil {
			fmt.Fprintf(w, "f")
			return
		}
	*/
	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	clientes := obtenerClientes(limit)

	for _, cliente := range clientes {

		if cliente.Nickname == nickname {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(cliente)
		}

	}
}

func obtenerUsuarioRouter(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	id_cliente, err := strconv.Atoi(vars["id"])

	if err != nil {
		fmt.Fprintf(w, "f")
		return
	}

	r.ParseForm()

	limit, _ := strconv.Atoi(r.FormValue("limit"))

	clientes := obtenerClientes(limit)

	for _, cliente := range clientes {

		if cliente.Id_cliente == id_cliente {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(cliente)
		}

	}

}

func obtenerClientes(n int) []Usuario {

	clientes := make([]Usuario, 0)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	rows, _ := db.Query("SELECT ID_CLIENTE, NOMBRE, APELLIDO, NOMBRE_USUARIO, (select NOMBRE_TIER from TIER WHERE TIER.ID_TIER = CLIENTES.ID_TIER), TO_CHAR(FECHA_NACIMIENTO), CORREO_ELECTRONICO, FOTO_PERFIL FROM CLIENTES")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	for rows.Next() {
		u := new(Usuario)
		rows.Scan(&u.Id_cliente, &u.Nombre_usuario, &u.Apellido_usuario, &u.Nickname, &u.Membresia, &u.Fecha_nacimiento, &u.Correo_electronico, &u.Foto_perfil)
		clientes = append(clientes, *u)

	}

	return clientes

}

// ------------------------------------- PETICIONES POST ---------------------------------------------------

// -------------- CREAR TEMPORADA --------------
func crearTemporadaRouter(w http.ResponseWriter, r *http.Request) {

	var nuevaTemporada Temporada
	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &nuevaTemporada)

	res, err := db.Exec("INSERT INTO TEMPORADA(FECHA_INICIO, FECHA_FINAL, ESTADO_TEMPORADA, ID_DEPORTE) values (TO_DATE('" + nuevaTemporada.Fecha_inicio + "', 'dd/mm/yyyy'), TO_DATE('" + nuevaTemporada.Fecha_final + "', 'dd/mm/yyyy'), 'Activo', (SELECT ID_DEPORTE FROM DEPORTE WHERE NOMBRE_DEPORTE = '" + nuevaTemporada.Deporte + "'))")

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(nuevaTemporada.Fecha_inicio)
	fmt.Println(nuevaTemporada.Deporte)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nuevaTemporada)
	fmt.Println(res.LastInsertId())
}

// -------------- CREAR JORNADA --------------
func crearJornadaRouter(w http.ResponseWriter, r *http.Request) {

	var nuevaJornada Jornada

	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	json.Unmarshal(reqBody, &nuevaJornada)
	fmt.Println(nuevaJornada.Id_temporada)
	fmt.Println(nuevaJornada.Fecha_inicio)
	fmt.Println(nuevaJornada.Fecha_final)
	res, err := db.Exec("INSERT INTO JORNADA(ID_TEMPORADA, FECHA_INICIO_JORNADA, FECHA_FIN_JORNADA, ESTADO_JORNADA) VALUES (" + strconv.Itoa(nuevaJornada.Id_temporada) + ", TO_DATE('" + nuevaJornada.Fecha_inicio + "', 'dd/mm/yyyy'), TO_DATE('" + nuevaJornada.Fecha_final + "', 'dd/mm/yyyy'), 'Activa')")

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nuevaJornada)
	fmt.Println(res.LastInsertId())

}

// -------------- REGISTRAR USUARIO --------------
func crearClienteRouter(w http.ResponseWriter, r *http.Request) {

	var nuevoUsuario Usuario
	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &nuevoUsuario)

	// consulta para crear un cliente
	queryInsert := `insert into CLIENTES(NOMBRE, APELLIDO, NOMBRE_USUARIO, FECHA_NACIMIENTO, FECHA_REGISTRO, CORREO_ELECTRONICO,
		FOTO_PERFIL, CONTRASENIA) values('` + nuevoUsuario.Nombre_usuario + `' , '` + nuevoUsuario.Apellido_usuario + `' , '` + nuevoUsuario.Nickname + `', TO_DATE('` + nuevoUsuario.Fecha_nacimiento + `', 'dd/mm/yyyy'),
		 (select sysdate from dual), '` + nuevoUsuario.Correo_electronico + `', '` + nuevoUsuario.Foto_perfil + `', '` + nuevoUsuario.Contrasenia + `')`

	//fmt.Println(queryInsert)
	res, err := db.Exec(queryInsert)

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nuevoUsuario)
	fmt.Println(res.LastInsertId())

}

// -------------- CREAR DEPORTE --------------
func crearDeporteRouter(w http.ResponseWriter, r *http.Request) {

	var nuevoDeporte Deporte
	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &nuevoDeporte)

	res, err := db.Exec("INSERT INTO DEPORTE(NOMBRE_DEPORTE,COLOR,FOTO_DEPORTE) VALUES ('" + nuevoDeporte.Nombre + "', '" + nuevoDeporte.Color_deporte + "', '" + nuevoDeporte.Foto_deporte + "' )")

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nuevoDeporte)
	fmt.Println(res.LastInsertId())

}

// -------------- CREAR EVENTO --------------
func crearEventoRouter(w http.ResponseWriter, r *http.Request) {

	var nuevoEvento Evento
	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &nuevoEvento)

	// Aqui me quede
	queryInsert := `INSERT INTO EVENTO(ID_JORNADA, ID_TEMPORADA,NOMBRE_EVENTO, EQUIPO_LOCAL, EQUIPO_VISITANTE, FECHA_INICIO_EVENTO, FECHA_FIN_EVENTO)
					VALUES(` + strconv.Itoa(nuevoEvento.Id_jornada) + `, ` + strconv.Itoa(nuevoEvento.Id_temporada) + `, '` + nuevoEvento.Titulo_evento +
		`', '` + nuevoEvento.Equipo_local + `', '` + nuevoEvento.Equipo_visitante + `', TO_DATE ('` + nuevoEvento.Fecha_inicio + `', 'MONTH DD, YYYY, HH:MI AM')` +
		`, TO_DATE('` + nuevoEvento.Fecha_final + `', 'MONTH DD, YYYY, HH:MI AM'))`

	res, err := db.Exec(queryInsert)

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nuevoEvento)
	//fmt.Println(queryInsert)
	fmt.Println(res.LastInsertId())

}

// ---------------- esto no funciona

func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {

	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

// ------------------------------------- PROCEDIMIENTOS ALMACENADOS ---------------------------------------------------

func iniciarSesion(w http.ResponseWriter, r *http.Request) {

	var usuario Usuario
	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &usuario)

	res, err := db.Exec("begin INICIO_SESION(:1,:2);end;", usuario.Nickname, usuario.Contrasenia)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}

// ------------------------------------- PETICIONES DELETE ---------------------------------------------------

// -------------- ELIMINAR DEPORTE --------------
func eliminarDeporteRouter(w http.ResponseWriter, r *http.Request) {

	var deporteEliminar Deporte

	reqBody, err := ioutil.ReadAll(r.Body)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	json.Unmarshal(reqBody, &deporteEliminar)
	fmt.Println(deporteEliminar.Nombre)

	res, err := db.Exec("DELETE FROM DEPORTE WHERE Nombre = '" + deporteEliminar.Nombre + "'")

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//w.WriteHeader(http.MethodDelete)
	fmt.Println(res)
}

// ----------- FUNCION MAIN -----------

func main() {

	router := mux.NewRouter().StrictSlash(true)
	headers := handlers.AllowedHeaders([]string{"X-Request-Headers", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	// CONECTANDO BASE DE DATOS
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// RUTAS DE PRUEBA - SIN BASE DE DATOS
	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/tasks", getTasks).Methods("GET")
	router.HandleFunc("/tasks", createTasks).Methods("POST")
	router.HandleFunc("/tasks/{id}", getTask).Methods("GET")
	router.HandleFunc("/tasks/{id}", deleteTask).Methods("DELETE")

	// RUTAS A LA BASE DE DATOS

	// Peticiones GET
	router.HandleFunc("/prueba", getPeopleRouter).Methods("GET")
	router.HandleFunc("/cliente/{nickname}", obtenerUsuarioNicknameRouter).Methods("GET")
	router.HandleFunc("/clientes/{id}", obtenerUsuarioRouter).Methods("GET") // Obtener cliente
	router.HandleFunc("/clientes", obtenerUsuariosRouter).Methods("GET")     // Obtener clientes
	router.HandleFunc("/tier", obtenerTierRouter).Methods("GET")             // Obtener tipos de membresia
	router.HandleFunc("/deportes", getDeportesRouter).Methods("GET")         // Obtener deportes
	router.HandleFunc("/temporadas", obtenerTemporadasRouter).Methods("GET") // Obtener temporadas
	router.HandleFunc("/jornadas", obtenerJornadasRouter).Methods("GET")     // Obtener jornadas
	router.HandleFunc("/eventos", obtenerEventosRouter).Methods("GET")       // Obtener eventos

	// Peticiones POST
	router.HandleFunc("/registroCliente", crearClienteRouter).Methods("POST")  // Registrarse en el sistema
	router.HandleFunc("/crearDeporte", crearDeporteRouter).Methods("POST")     // Crear deporte
	router.HandleFunc("/crearTemporada", crearTemporadaRouter).Methods("POST") // Crear temporada
	router.HandleFunc("/crearJornada", crearJornadaRouter).Methods("POST")     // Crear jornada
	router.HandleFunc("/crearEvento", crearEventoRouter).Methods("POST")       // Crear jornada

	// PROCEDIMIENTOS ALMACENADOS
	router.HandleFunc("/iniciarSesion", iniciarSesion).Methods("POST") // inicio sesión

	// Peticiones DELETE (aun no funciona)
	router.HandleFunc("/eliminarDeporte/{Nombre}", eliminarDeporteRouter).Methods("DELETE")
	// SETEAR PUERTO
	log.Fatal(http.ListenAndServe(":4000", handlers.CORS(headers, methods, origins)(router)))

}

// CompileDaemon -command="./backend"
