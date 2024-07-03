import './App.css';
import Portada1 from './Componentes/Portada1';
import Portada2 from './Componentes/Portada2';
import Portada3 from './Componentes/Portada3';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Componentes/Menu';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Header from './Componentes/Header';
import NavBar from './Componentes/NavBar';
import RegistroForm from './Componentes/RegistroForm';
import AyudaForm from './Componentes/AyudaForm';
// import HeaderEspacio from './Componentes/HeaderEspacio'
import EditarInformacion from './Componentes/EditarInformacion'
import RegistrarMascota from './Componentes/RegistrarMascota'
// import NavBarRegistro from './Componentes/NavBarRegistro';
import InterfazUser from './Componentes/InterfazUser';
import TuEspacio from './Componentes/TuEspacio';


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/login/menu" element={
            <div>
              <Menu />
            </div>} />
          <Route path="/login" element={
            <div>
              <Login />
            </div>} />
          <Route path="/registrarse" element={
            <div>
              <Registro />
            </div>} />
          <Route path="/" element={
            <div>
              <Portada1 />
              <Portada2 />
              <Portada3 />
            </div>
          } />
          <Route path="/animales" element={

            <div className="container">
              <Header />
              <NavBar />
              <main>
                <InterfazUser />
              </main>
            </div>

          } />
          <Route path="/animales/reportar" element={
            <div className="container">
              <Header />
              <NavBar />
              <main>
                <RegistroForm />
              </main>
            </div>
          } />
          <Route path="/animales/visualizar" element={
            <div className="container">
              <Header />
              <NavBar />
              <main>
                <AyudaForm />
              </main>
            </div>
          } />
          <Route path="/espacio" element={
            <div>
              <TuEspacio></TuEspacio>
            </div>
          } />
          <Route path="/espacio/agregar" element={
            <div>
              <RegistrarMascota></RegistrarMascota>
            </div>
          } />
          <Route path="/espacio/editar" element={
            <div>
              <EditarInformacion></EditarInformacion>
            </div>
          } />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
