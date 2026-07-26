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
let tarjetaFormulario = document.querySelector("#tarjetaFormulario");
let formularioLibro = document.querySelector("#formularioLibro");
let mensajeError = document.querySelector("#mensajeError");
let btnLimpiar = document.querySelector("#btnLimpiar");
let inputCodigo = document.querySelector("#codigo");
let inputTitulo = document.querySelector("#Titulo");
let inputAutor = document.querySelector("#Autor");
let inputCategoria = document.querySelector("#Categoria");
let inputAño = document.querySelector("#año");
let selectEstado = document.querySelector("#Estado");
let cuerpoTabla = document.querySelector("#cuerpoTabla");

let libros = []; 

let editando = false;
let codigoAEditar = "";
let criterioOrden = "Titulo"; 
let sentidoOrden = "asc";

//muestro el formulario 
mostrarFormulario.addEventListener('click',(e)=>{
    e.preventDefault();
    if(tarjetaFormulario.style.display==="none" || tarjetaFormulario.style.display==="")
    {
        tarjetaFormulario.style.display="block";
    }else{
        tarjetaFormulario.style.display="none";
    }
})

// limpiar el formulario 
btnLimpiar.addEventListener('click',()=>
{
    formularioLibro.reset();
    editando=false;
    codigoAEditar="";
    tituloFormulario.textContent="REGISTRAR LIBRO";
    mensajeError.textContent="";
})

//creo la tabla
function mostrarArreglo(arreglo) {
    // Si la lista está vacía, mostramos un mensaje indicando que no hay registros
    if (arreglo.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-3">
                    No hay libros registrados o no coinciden con la búsqueda.
                </td>
            </tr>`;
        return;
    }

    cuerpoTabla.innerHTML = arreglo.map((libro) => `
        <tr>
            <td>${libro.codigo}</td>
            <td>${libro.Titulo}</td>
            <td>${libro.Autor}</td>
            <td>${libro.Categoria}</td>
            <td>${libro.año}</td>
            <td>
                <span class="badge ${libro.Estado === 'Disponible' ? 'bg-success' : 'bg-warning text-dark'}">
                    ${libro.Estado}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning me-1 btn-editar" data-codigo="${libro.codigo}">Editar</button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-codigo="${libro.codigo}">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// valido el formulario
function validarFormulario(codigo, titulo, autor, categoria, año) {
    if (!codigo || !titulo || !autor || !categoria || !año) {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return false;
    }
    mensajeError.textContent = "";
    return true;
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

    if(!validarFormulario(codigo,titulo,autor,categoria,año)) return;

    if(editando){
        // busco con find el libro que tiene el codigo que estoy editando
        let libro = libros.find(l => l.codigo === codigoAEditar);
        libro.codigo=codigo;
        libro.Titulo=titulo;
        libro.Autor=autor;
        libro.Categoria=categoria;
        libro.año=año;
        libro.Estado=estado;

        editando=false;
        codigoAEditar="";
        tituloFormulario.textContent="REGISTRAR LIBRO";
    }else{
        let arreglo={codigo,Titulo:titulo,Autor:autor,Categoria:categoria,año,Estado:estado};
        libros.push(arreglo);
    }

    formularioLibro.reset();
    tarjetaFormulario.style.display="none";
    procesarYMostrar();
})

// edito el libro cuando le doy click al boton editar de la tabla
function editarLibro(e){
    if(!e.target.classList.contains('btn-editar')) return;

    let codigo = e.target.dataset.codigo;
    let libro = libros.find(l => l.codigo === codigo);
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
    tarjetaFormulario.style.display="block";
}

// elimino el libro cuando le doy click al boton eliminar de la tabla
function eliminarLibro(e){
    if(!e.target.classList.contains('btn-eliminar')) return;

    let codigo = e.target.dataset.codigo;
    let confirmar = confirm("¿Seguro que deseas eliminar este libro?");
    if(!confirmar) return;

    // con filter dejo en libros solo los que no tengan ese codigo
    libros = libros.filter(l => l.codigo !== codigo);
    procesarYMostrar();
}

// pongo los eventos en cuerpoTabla porque los botones se crean despues dinamicamente
cuerpoTabla.addEventListener('click', editarLibro);
cuerpoTabla.addEventListener('click', eliminarLibro);

// evito que se recargue la pagina al buscar con enter
formBuscar.addEventListener('submit',(e)=>{
    e.preventDefault();
})

// busco en tiempo real mientras escribo
inputBuscar.addEventListener('input',()=>{
    procesarYMostrar();
})

// filtro cuando cambio el select de estado
selectFiltroEstado.addEventListener('change',()=>{
    procesarYMostrar();
})

// cambio el criterio de orden
sortTitulo.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="Titulo";
    procesarYMostrar();
})
sortAño.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="año";
    procesarYMostrar();
})
sortAutor.addEventListener('click',(e)=>{
    e.preventDefault();
    criterioOrden="Autor";
    procesarYMostrar();
})

// cambio el sentido del orden
sortAsc.addEventListener('click',(e)=>{
    e.preventDefault();
    sentidoOrden="asc";
    procesarYMostrar();
})
sortDesc.addEventListener('click',(e)=>{
    e.preventDefault();
    sentidoOrden="desc";
    procesarYMostrar();
})

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

// filtro busco y ordeno antes de mostrar la tabla
function procesarYMostrar(){
    let datos = [...libros];

    let texto = inputBuscar.value.trim().toLowerCase();
    if(texto !== ""){
        datos = datos.filter(l =>
            l.codigo.toLowerCase().includes(texto) ||
            l.Titulo.toLowerCase().includes(texto) ||
            l.Autor.toLowerCase().includes(texto)
        );
    }

    let estado = selectFiltroEstado.value;
    if(estado !== ""){
        datos = datos.filter(l => l.Estado === estado);
    }

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

mostrarArreglo(libros);
procesarYMostrar();