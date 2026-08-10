//variables del modal
let modalLibro = new bootstrap.Modal(document.querySelector("#modalLibro"));
let modalEliminar = new bootstrap.Modal(document.querySelector("#modalEliminar"));
let tituloLibroEliminar = document.querySelector("#tituloLibroEliminar");
let btnConfirmarEliminar = document.querySelector("#btnConfirmarEliminar");
let codigoAEliminar = "";
// variables fromulario
let mostrarFormulario = document.querySelector("#btnMostrarFormulario");
let formBuscar = document.querySelector("#formBuscar");
let inputBuscar = document.querySelector("#Buscar");
let selectFiltroCategoria = document.querySelector("#filtroCategoria");
let selectFiltroEstado = document.querySelector("#filtroEstado");
let sortTitulo = document.querySelector("#sortTitulo");
let sortAño = document.querySelector("#sortAño");
let sortAutor = document.querySelector("#sortAutor");
let sortAsc = document.querySelector("#asc");
let sortDesc = document.querySelector("#desc");
let estadoTotal = document.querySelector("#estadoTotal");
let estadoDisponibles = document.querySelector("#estadoDisponibles");
let estadoPrestados = document.querySelector("#estadoPrestados");
let estadoCategorias = document.querySelector("#estadoCategorias");
let tituloFormulario = document.querySelector("#tituloFormulario");

let formularioLibro = document.querySelector("#formularioLibro");

let btnLimpiar = document.querySelector("#btnLimpiar");
let inputCodigo = document.querySelector("#codigo");
let inputTitulo = document.querySelector("#Titulo");
let inputAutor = document.querySelector("#Autor");
let inputCategoria = document.querySelector("#Categoria");
let inputAño = document.querySelector("#año");
let selectEstado = document.querySelector("#Estado");
let cuerpoTabla = document.querySelector("#cuerpoTabla");

let libros = []; 
class Libro {
    constructor(codigo, Titulo, Autor, Categoria, año, Estado) {
        this.codigo = codigo;
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Categoria = Categoria;
        this.año = año;
        this.Estado = Estado;
    }
}
function existeCodigo(codigo, excluirCodigo = null) {
    return libros.some(libro => libro.codigo === codigo && libro.codigo !== excluirCodigo);
}
let editando = false;
let codigoAEditar = "";
let criterioOrden = "Titulo"; 
let sentidoOrden = "asc";

//muestro el formulario 
mostrarFormulario.addEventListener('click',(e)=>{
    e.preventDefault();
   formularioLibro.reset();
    editando=false;
    codigoAEditar="";
    tituloFormulario.textContent="REGISTRAR LIBRO";
    modalLibro.show();
})

// limpiar el formulario 
btnLimpiar.addEventListener('click',()=>
{
    formularioLibro.reset();
    editando=false;
    codigoAEditar="";
    tituloFormulario.textContent="REGISTRAR LIBRO";
    modalLibro.hide();
})

//creo la tabla
function mostrarArreglo(arreglo) {
   //voy a llenar el arreglo utilizando clases dinamicas
   cuerpoTabla.innerHTML=""; //siempre limpio la tabla antes de volver a llenarla
   if (arreglo.length===0){
    let fila=document.createElement("tr");
    let celda=document.createElement("td");
    celda.colSpan=7;
    celda.classList.add("text-center","text-muted","py-3");
    celda.textContent="No hay libros registrados o no coincide su busqueda";
    fila.appendChild(celda);
    cuerpoTabla.appendChild(fila);
    return;

   }
   arreglo.forEach((libro)=>{
    let fila =document.createElement("tr");
    fila.append(crearCelda(libro.codigo));
     fila.append(crearCelda(libro.Titulo));
      fila.append(crearCelda(libro.Autor));
       fila.append(crearCelda(libro.Categoria));
        fila.append(crearCelda(libro.año));

        //hago la celda del estado con badge y clases dinamicas
        let celdaEstado=document.createElement("td");
        let badge=document.createElement("span");
        badge.classList.add("badge");
        badge.classList.add(libro.Estado==="Disponible" ? "bg-success": "bg-warning" );
        if(libro.estado!=="Disponible")badge.classList.add("text-dark");
        badge.textContent=libro.Estado;
        celdaEstado.appendChild(badge);
        fila.appendChild(celdaEstado);

        //celdas de acciones con los botenes de editar y eliminar
        let celdaAcciones=document.createElement("td");
        //boton de editar 
        let btnEditar=document.createElement("button");
        btnEditar.classList.add("btn","btn-sm","btn-warning","me-1","btn-editar");
        btnEditar.dataset.codigo=libro.codigo;
        btnEditar.textContent="Editar";
        
        //boton de eliminar

        let btnEliminar=document.createElement("button");
        btnEliminar.classList.add("btn","btn-sm","btn-danger","btn-eliminar");
        btnEliminar.dataset.codigo=libro.codigo;
        btnEliminar.textContent="Eliminar";


        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
        fila.appendChild(celdaAcciones);
        cuerpoTabla.appendChild(fila);



   });

}
//hago esta funcion para no repetir el codigo en cada celda simple

function crearCelda(texto) {
    let celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// valido el formulario
function validarFormulario(codigo, titulo, autor, categoria, año) {
    let campos = [
        {valor: codigo, input: inputCodigo},
        {valor: titulo, input: inputTitulo},
        {valor: autor, input: inputAutor},
        {valor: categoria, input: inputCategoria},
        {valor: año, input: inputAño}
    ];
    let valido = true;
    campos.forEach(campo => {
        if(!campo.valor){
            campo.input.classList.add('is-invalid');
            valido = false;
        } else {
            campo.input.classList.remove('is-invalid');
        }
    });
    if(!valido){
        Swal.fire({icon:"warning", title:"Faltan datos", text:"Todos los campos son obligatorios."});
    }
    return valido;
}

//capturo los datos y los muestro en la tabla agregar editar o eliminar
formularioLibro.addEventListener('submit',(e)=>{
    e.preventDefault();
    let codigo=inputCodigo.value.trim();
     let titulo=inputTitulo.value.trim();
      let autor=inputAutor.value.trim();
       let categoria=inputCategoria.value.trim();
        let año=inputAño.value.trim();
        let estado=selectEstado.value;
        let mensaje="";

    if(!validarFormulario(codigo,titulo,autor,categoria,año)) return;
    if(editando){
    if(existeCodigo(codigo, codigoAEditar)){
        Swal.fire({icon:"error", title:"Código duplicado", text:`Ya existe otro libro con el código "${codigo}".`});
        inputCodigo.classList.add('is-invalid');
        inputCodigo.focus();
        return;
    }

    // en vez de mutar el objeto, creo uno nuevo con spread y reemplazo en el arreglo
    libros = libros.map(lib =>
        lib.codigo === codigoAEditar
            ? {...lib, codigo, Titulo: titulo, Autor: autor, Categoria: categoria,año: año, Estado: estado}
            : lib
    );

    editando=false;
    codigoAEditar="";
    mensaje="El libro se actualizo correctamente"
    tituloFormulario.textContent="REGISTRAR LIBRO";
}else{
    if(existeCodigo(codigo)){
        Swal.fire({icon:"error", title:"Código duplicado", text:`Ya existe un libro con el código "${codigo}".`});
        inputCodigo.classList.add('is-invalid');
        inputCodigo.focus();
        return;
    }

    let nuevoLibro=new Libro(codigo,titulo,autor,categoria,año,estado);
    libros=[...libros,nuevoLibro];
    mensaje="El libro se registro de manera exitosa!";
}

    formularioLibro.reset();
     modalLibro.hide(); 
  
  ProcesarYMostrar();
       //  mensaje personalizado 
    Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: mensaje,
        timer: 1800,
        showConfirmButton: false
    });
        
})

// edito el libro cuando le doy click al boton editar de la tabla
function editarLibro(e){
    if(!e.target.classList.contains('btn-editar')) return;

    let codigo = e.target.dataset.codigo;
    let libro = libros.find(lib => lib.codigo === codigo);
    if(!libro) return;

    inputCodigo.value=libro.codigo;
    inputTitulo.value=libro.Titulo;
    inputAutor.value=libro.Autor;
    inputCategoria.value=libro.Categoria;
    inputAño.value=libro.año;
    selectEstado.value=libro.Estado;

    editando=true;
    codigoAEditar=codigo;
    tituloFormulario.textContent="EDITAR LIBRO";
    modalLibro.show();
}

// elimino el libro cuando le doy click al boton eliminar dentro del modal
function eliminarLibro(e){
    if(!e.target.classList.contains('btn-eliminar')) return;

    let codigo = e.target.dataset.codigo;
   let libro=libros.find(lib=>lib.codigo===codigo);
    if(!libro) return;

   codigoAEliminar=codigo;
   tituloLibroEliminar.textContent=libro.Titulo;
   modalEliminar.show();
}

btnConfirmarEliminar.addEventListener('click',()=>{
    // busco el boton de esa fila y elimino el nodo <tr> directamente del DOM
    let boton = cuerpoTabla.querySelector(`[data-codigo="${codigoAEliminar}"]`);
    if (boton) boton.closest('tr').remove();

    libros=libros.filter(lib=>lib.codigo !==codigoAEliminar);
    codigoAEliminar="";
    modalEliminar.hide();
    ProcesarYMostrar();
    Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El libro se eliminó correctamente.",
        timer: 1800,
        showConfirmButton: false
    });
})

// pongo los eventos en cuerpoTabla porque los botones se crean despues dinamicamente
cuerpoTabla.addEventListener('click', editarLibro);
cuerpoTabla.addEventListener('click', eliminarLibro);

// evito que se recargue la pagina al buscar con enter
formBuscar.addEventListener('submit',(e)=>{
    e.preventDefault();
})

// busco en tiempo real mientras escribo
inputBuscar.addEventListener('input',()=>{
    ProcesarYMostrar();
})

// filtro cuando cambio el select de estado
selectFiltroEstado.addEventListener('change',()=>{
    ProcesarYMostrar();
})
//FILTRO POR CATEGORIA 
selectFiltroCategoria.addEventListener('change',()=>{
    
    ProcesarYMostrar();
});

// cambio el criterio de orden
sortTitulo.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="Titulo";
    ProcesarYMostrar();
})
sortAño.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="año";
    ProcesarYMostrar();
})
sortAutor.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="Autor";
    ProcesarYMostrar();
})

// cambio el sentido del orden
sortAsc.addEventListener('click',(e)=>{
    e.preventDefault();
    sentidoOrden="asc";
    ProcesarYMostrar();
})
sortDesc.addEventListener('click',(e)=>{
    e.preventDefault();
    sentidoOrden="desc";
    ProcesarYMostrar();
})

// filtro busco y ordeno antes de mostrar la tabla

function ProcesarYMostrar(){
    let datos=[...libros];
    // filtro por categoria
     let categoria=selectFiltroCategoria.value;
    if(categoria!=="")
    {
        datos=datos.filter(categorias=>categorias.Categoria===categoria);
    }

// filtro de busqueda
     let texto = inputBuscar.value.trim().toLowerCase();
    if(texto !== ""){
        datos = datos.filter(libro =>
            libro.codigo.toLowerCase().includes(texto) ||
            libro.Titulo.toLowerCase().includes(texto) ||
            libro.Autor.toLowerCase().includes(texto)
        );
    }
// filtro por estado 
     let estado = selectFiltroEstado.value;
    if(estado !== ""){
    datos = datos.filter(lib => lib.Estado === estado);
    }
    // filtros de ordenamiento 
     datos.sort((a,b)=>{
        let valorA = a[criterioOrden].toString().toLowerCase();
        let valorB = b[criterioOrden].toString().toLowerCase();

        if(valorA < valorB) return sentidoOrden === "asc" ? -1 : 1;
        if(valorA > valorB) return sentidoOrden === "asc" ? 1 : -1;
        return 0;
    });
   

    mostrarArreglo(datos);
    actualizarEstadisticas();

}

// actualizo las estadisticas del panel lateral
function actualizarEstadisticas(){
    estadoTotal.textContent = libros.length;
    estadoDisponibles.textContent = libros.filter(l => l.Estado === "Disponible").length;
    estadoPrestados.textContent = libros.filter(l => l.Estado === "Prestado").length;

    // cuento cuantos libros hay por categoria
    let conteoCategorias = {};
    libros.forEach(libro => {
        conteoCategorias[libro.Categoria] = (conteoCategorias[libro.Categoria] || 0) + 1;
    });

    estadoCategorias.innerHTML = Object.keys(conteoCategorias).map(categoria => `
        <li class="d-flex justify-content-between">
            <span>${categoria}</span>
            <span>${conteoCategorias[categoria]}</span>
        </li>
    `).join('');
}

mostrarArreglo(libros);
ProcesarYMostrar();
