import Aside from "./components/Aside"
import Navbar from "./components/Navbar"
import "./assets/css/Adminlte.css"
import Footer from "./components/Footer"
import Error404 from "./pages/Error404"
const App=()=> {

  return (
    <>
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">

      <div className="app-wrapper">
    <Navbar ususario="Darwin "/>
    <Aside/>
     <div class="app-content">
      Aca va el contenido 
      <Error404/>

     </div>
     <Footer/>
        

      </div>
    </div>
  
    </>
  )
}

export default App
