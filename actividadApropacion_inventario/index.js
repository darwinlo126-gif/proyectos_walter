import { productos } from "./modulos/productos.js";
import { buscarProductoID, calcularInventario, listarProductos, productosDisponibles, promedioPrecios } from "./modulos/operaciones.js";
listarProductos(productos); //productos 
console.log(calcularInventario(productos));// precio total de todos los productos existentes 
console.log(buscarProductoID(productos,3)); //producto con esa identificacion
console.log(productosDisponibles(productos)); // cantidad de productos mayores a 0 
console.log(promedioPrecios(productos)); // promedio de todos los precios de productos 


