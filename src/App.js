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
import RegistrarMascotaAbandono from './Componentes/RegistrarMascotaAbandono';


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/login/menu/:id" element={
            <div> <Menu /> </div>}
          />
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
          <Route path="/animales/:id" element={
            <div>
              <InterfazUser></InterfazUser>
            </div>
          } />
          {/* r */}
          <Route path="/espacio/abandonado/:id" element={
            <div>
              <RegistrarMascotaAbandono></RegistrarMascotaAbandono>
            </div>
          } />
          {/* r */}
          <Route path="/animales/reportar" element={
            <div>
              <RegistroForm />
            </div>
          } />
          <Route path="/animales/visualizar/:id" element={<InterfazUser />} />

          <Route path="/animales/visualizar" element={
            <div>
              <AyudaForm />
            </div>
          } />
          <Route path="/espacio/:id" element={
            <div>
              <TuEspacio></TuEspacio>
            </div>
          } />
          <Route path="/espacio/agregar/:id" element={
            <div>
              <RegistrarMascota></RegistrarMascota>
            </div>
          } />
          <Route path="/espacio/editar/:id/:id_" element={
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
