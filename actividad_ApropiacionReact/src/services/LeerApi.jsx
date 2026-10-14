const API="https://jsonplaceholder.typicode.com/users";   
export const obtenerUsuario= async(name= "")=>{
    let url=API;

    if (name){
        url += `/?name=${name}`; //permite pasarle un parametro clave a la url
    }
    const response= await fetch(url);
    console.log(response);
    if(!response.ok)
    {
        throw new Error("Error al consultar los datos de la api");

        
    }
    return await response.json();
};