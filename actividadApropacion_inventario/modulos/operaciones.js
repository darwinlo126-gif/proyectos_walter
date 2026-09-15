export function listarProductos(productos){

    //con el metodo foreach muestro el nombre de los productos y la cantidad que tiene cada uno 
    productos.forEach((producto)=>{
        console.log(`${producto.nombre} - stock: ${producto.cantidad}`);
    })
}
export function calcularInventario(productos){
    //con el reduce estoy calculando cuanto cuesta cierta cantidad de productos ya que el total 
    //vendria siendo un contador el cual me retorna la operacion que hice al multiplicar la cantidad por el precio
    //el reduce siempre inicia en 0

    return productos.reduce((total,producto)=>{
        return total + producto.cantidad * producto.precio;
    },0);
}
//el find trae el elemento que cumpla con esa condiccion 
export function buscarProductoID(productos,id){
    return productos.find((producto)=>producto.id===id);
    
}
//el filter filtra todos los productos los cuales cumplan con la condicion que se le solicita 
export function productosDisponibles(productos){
return productos.filter((producto)=>producto.cantidad>0);}  

export function promedioPrecios(productos){
    const suma= productos.reduce((contador,producto)=>{
        return contador+producto.precio
    },0)
    return suma/productos.length;

}