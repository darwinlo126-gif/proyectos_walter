let tarjetaPokemon = document.getElementById("tarjetaspokemon");
let carga = document.getElementById("cargando");
let buscarInput = document.getElementById("buscar");
let volver = document.getElementById("volver");
let error = document.getElementById("mensajeError");
let detalle = document.getElementById("detalle");

//genero una funcion para cargar los pokemon
function cargarPokemon() {
  //guardo el api en una variable
  const urlpokelista = "https://pokeapi.co/api/v2/pokemon?limit=30";
  //muestro el mensaje de carga
  carga.style.display = "block"; //el block lo estoy utilizando para que el mensaje tenga visibilidad;

  fetch(urlpokelista)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      datos.results.forEach((pokemonBasico) => {
        //ingreso al objeto de cada pokemon para ver su foto y detalles
        fetch(pokemonBasico.url)
          .then((resulDE) => resulDE.json())
          .then((pokemonInfo) => {
            //genero el diseño de las tarjetas
            tarjetaPokemon.innerHTML += `
            <div onclick="verDetalle('${pokemonInfo.name}')" style="display: inline-block; margin: 10px; text-align: center; border: 1px solid #eee; padding: 10px; border-radius: 10px;">
                <img src="${pokemonInfo.sprites.front_default}" alt="${pokemonInfo.name}">
                <p style="color: #c8a84b;">#${pokemonInfo.id}</p>
                <h3 style="text-transform: capitalize; color: #f0f0f0;">${pokemonInfo.name}</h3>
              </div>`;
          });

        //oculto el mensaje cuando allan fotos visibles
        carga.style.display = "none";
      });
    })
    //lanzo un mensaje si sucede un error
    .catch((fallo) => {
      carga.style.display = "none";
      console.log("error al conectar", fallo);
    });
}

//aca hago la funcion para buscar un pokemon en especifico
function buscar() {
  //leo el nombre del input,lo paso a minusculas y le quito espacios
  let nombre = buscarInput.value.toLowerCase().trim();
  if (nombre == "") return;
  carga.style.display = "block";
  tarjetaPokemon.style.display = "none"; //limpio la pagina inicial
  error.style.display = "none";

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then((respuesta) => {
      if (respuesta.ok == true) {
        // Si la respuesta es buena, la paso a json
        return respuesta.json();
      } else {
        // si no muestro un mensaje de error
        error.innerHTML = " el pokemon no existe";
        error.style.display = "block";
        carga.style.display = "none";
      }
    })
    .then((pokemonInfo) => {
      // Si la respuesta fue OK, aquí ya tenemos la información lista
      if (pokemonInfo) {
        carga.style.display = "none";
        detalle.style.display = "block";

        detalle.innerHTML = `
        <div style="text-align: center; border: 2px solid #ffc107; padding: 20px; border-radius: 15px;">
          <h2 style="text-transform: capitalize; color: #f0f0f0;">${pokemonInfo.name}</h2>
          <img src="${pokemonInfo.sprites.other["official-artwork"].front_default}" style="width: 200px;">
          <p style="color: #c8a84b;"><strong>ID:</strong> #${pokemonInfo.id}</p>
          <p style="color: #c8a84b;"><strong>Altura:</strong> ${pokemonInfo.height / 10} m</p>
          <p style="color: #c8a84b;"><strong>Peso:</strong> ${pokemonInfo.weight / 10} kg</p>
        </div>`;
      }
    });
}
//funcion del boton de atras
function atras() {
  detalle.style.display = "none";
  error.style.display = "none";
  tarjetaPokemon.style.display = "block";
  buscarInput.value = "";
}

//funcion para hacer el click de las tarjetas
function verDetalle(nombre) {
  buscarInput.value = nombre;
  buscar();
}

// Arrancamos todo
cargarPokemon();
