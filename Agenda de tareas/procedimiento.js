// Arreglo principal con la tarea inicial
let tareas = [
    {
        id: 1,
        titulo: "Aprender JavaScript",
        prioridad: "Alta",
        completada: false
    }
];

let filtro = "todas";

// Esto dibuja la lista apenas carga la página
mostrarTarea();


// --- FUNCIONES QUE LLAMA EL HTML ---

function ejecutarAgregar() {
    const inputTitulo = document.getElementById('titulo-tarea');
    const selectPrioridad = document.getElementById('prioridad-tarea');

    const titulo = inputTitulo.value;
    const prioridad = selectPrioridad.value;

    const nuevoId = Date.now();
    const nueva = crearTarea(nuevoId, titulo, prioridad);

    tareas.push(nueva);

    inputTitulo.value = "";
    selectPrioridad.value = "Media";

    mostrarTarea();
}

function ejecutarMarcarCompletada(idTarea) {
    tareas = completarTareaEnLista(tareas, idTarea);
    mostrarTarea();
}

function ejecutarCambiarPrioridad(idTarea, prioridadActual) {
    let proximaPrioridad = "Media";
    if (prioridadActual === "Media") { proximaPrioridad = "Baja"; }
    if (prioridadActual === "Baja") { proximaPrioridad = "Alta"; }

    tareas = tareas.map(function(tarea) {
        if (tarea.id === idTarea) {
            return cambiarPrioridad(tarea, proximaPrioridad);
        }
        return tarea;
    });

    mostrarTarea();
}

function cambiarFiltro(nuevoFiltro) {
    filtro = nuevoFiltro;
    mostrarTarea();
}


// --- LÓGICA PARA PINTAR EN LA PANTALLA ---

function mostrarTarea() {
    const ulLista = document.getElementById('lista-tareas');
    let filtradas = tareas;

    if (filtro === "pendientes") {
        filtradas = obtenerPendientes(tareas);
    } else if (filtro === "Alta" || filtro === "Media" || filtro === "Baja") {
        filtradas = filtrarPorPrioridad(tareas, filtro);
    }

    let html = "";

    filtradas.forEach(function(tarea) {
        let clase = "";
        if (tarea.completada === true) { 
            clase = "class='tarea-completada'"; 
        }

        let color = "bg-primary";
        if (tarea.prioridad === "Alta") { color = "bg-danger"; }
        if (tarea.prioridad === "Baja") { color = "bg-success"; }

        let botonCheck = "";
        if (tarea.completada === false) {
            botonCheck = "<button class='btn btn-success btn-sm me-1' onclick='ejecutarMarcarCompletada(" + tarea.id + ")'>✓</button>";
        }

        const botonCambiar = "<button class='btn btn-outline-secondary btn-sm' onclick='ejecutarCambiarPrioridad(" + tarea.id + ", \"" + tarea.prioridad + "\")'>⚙</button>";

        html += "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
                    "<div>" +
                        "<span " + clase + ">" + tarea.titulo + "</span>" +
                        "<span class='badge " + color + " ms-2'>" + tarea.prioridad + "</span>" +
                    "</div>" +
                    "<div>" +
                        botonCheck +
                        botonCambiar +
                    "</div>" +
                 "</li>";
    });

    ulLista.innerHTML = html;
}


// --- FUNCIONES OBLIGATORIAS DEL TALLER ---

function crearTarea(id, titulo, prioridad) {
    return { id: id, titulo: titulo, prioridad: prioridad, completada: false };
}

function completarTarea(tarea) {
    return { ...tarea, completada: true };
}

function cambiarPrioridad(tarea, nuevaPrioridad) {
    return { ...tarea, prioridad: nuevaPrioridad };
}


// --- FUNCIONES DE CALLBACK ---

function callbackPendientes(tarea) {
    return tarea.completada === false;
}

function callbackAlta(tarea) { return tarea.prioridad === "Alta"; }
function callbackMedia(tarea) { return tarea.prioridad === "Media"; }
function callbackBaja(tarea) { return tarea.prioridad === "Baja"; }


// --- FILTROS DE ARREGLOS ---

function obtenerPendientes(listado) {
    return listado.filter(callbackPendientes);
}

// Filtra según la prioridad usando .filter() y los callbacks de arriba
function filtrarPorPrioridad(listado, prioridad) {
    if (prioridad === "Alta") { return listado.filter(callbackAlta); }
    if (prioridad === "Media") { return listado.filter(callbackMedia); }
    if (prioridad === "Baja") { return listado.filter(callbackBaja); }
    return listado;
}

// Devuelve un nuevo listado mapeado usando .map()
function completarTareaEnLista(listado, idEncontrado) {
    return listado.map(function(tarea) {
        if (tarea.id === idEncontrado) {
            return completarTarea(tarea);
        }
        return tarea;
    });
}