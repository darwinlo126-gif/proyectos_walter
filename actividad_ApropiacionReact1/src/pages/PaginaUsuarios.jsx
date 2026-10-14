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
        setpersonas(data);

       }catch(error){
        console.error(error);
       }
    };


     return (
   
   
        <Tablap persona={personas}/>


  );
}