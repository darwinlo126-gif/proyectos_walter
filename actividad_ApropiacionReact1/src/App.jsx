import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import PaginaUsuarios from "./pages/PaginaUsuarios";


const App=()=>{
  return <>
  <div className="container_fluid">
    <div className="row">
      <Navbar/>
      <div className="contenedor mb-5"></div>
      <PaginaUsuarios/>
    </div>
    <Footer/>
</div>
  
  
  </>

};
export default App;
