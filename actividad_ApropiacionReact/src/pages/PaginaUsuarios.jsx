import { useEffect,useState } from "react";
import { obtenerUsuario } from "../services/LeerApi";
import Tablap from "../components/Tablap";

export default function PaginaUsuarios(){
    const [personas,setpersonas]= useState([]);

    useEffect(()=>{
        Tabla()

    },[]);

    const Tabla=async()=>{
       try{
        const data= await obtenerUsuario();
        setpersonas(data.results);

       }catch(error){
        console.error(error);
       }
    };


     return (
    <div className="row">
      {personas.map((persona) => (
        // para pintar muchos componentes cada componente debe tener una llave o un estado 
        <div key={persona.id} className="col-md-3 mb-4">
        <Tablap persona={persona}/>

        </div>
      ))}
    </div>
  );
}