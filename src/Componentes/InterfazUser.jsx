// InterfazUsuario.jsx
import React, { useState } from 'react';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg'; 
import imagen from '../Imagenes/icono2.jpg';
import imgPresentacion from '../Imagenes/Img4.png';
import imgMascota1 from '../assets/img-mascota-1.webp'; 
import imgMascota2 from '../assets/img-mascota-2.webp'; 
import imgMascota3 from '../assets/img-mascota-3.webp'; 
import imgMascota4 from '../assets/img-mascota-4.webp'; 
import animalesR from '../assets/animalesR.jpg'
import user from '../assets/icono-usuario.svg'
import lupa from '../assets/icono-lupa.svg'
import ojo from '../assets/icono-ojo.svg'
import mas from '../assets/icono-mas.png'
import logo from '../assets/logo.webp'
import { useNavigate } from "react-router-dom";
import '../Estilos/InterfazUser.css'


function InterfazUser() {
    const navigate = useNavigate();
    const handleReportar = () => {
        navigate('/animales/reportar');
    };
    const handleVisualizar = () => {
        navigate('/animales/visualizar');
    };
    const [active, setActive] = useState('Mascotas en Abandono');
    return (
        <div >
          <div>
            <header>
              <div className="user-section">
                <p><IconoSVG className="icon" />Usuario</p>
              </div>
              <h1>
                ESPERANZA ANIMAL 
                <img src={imagen} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
              </h1>
            </header>
                  <nav>
            {['Mascotas en Abandono', 'Registrar Mascota en Abandono', 'Brindar Ayuda a un Animal', 'Home'].map((item) => (
              <button
                key={item}
                className={`nav-button ${active === item ? 'active' : ''}`}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            ))}
          </nav>
            <img src={imgPresentacion} className='presentacionImg' alt="Imagen de Presentación" />
          </div>
          <main>
            <div className="container">
              <div className="cajaB">
                <h2 className="FiltroInput">Filtro de busqueda</h2>
                <div className="FiltroBusqueda">
                  <div className="FB">
                    <h4 className="Filtrar">Filtrar Busqueda</h4>
                  </div>
                  <select className="Select">
                    <option>Seleccione Provincia</option>
                  </select>
                  <select className="Select">
                    <option>Seleccione Cantón</option>
                  </select>
                  <select className="Select">
                    <option>Seleccione Parroquia</option>
                  </select>
                  <button className="BotonBusqueda"><img src={lupa} alt="lupa" className="Lupa" /></button>
                </div>
                <div className="AnimalesNecesitados">
                  <h2 className="NecesitamosAyuda">Necesitamos tu ayuda</h2>
                  <div className="Animales">
                    <div className="Animal">
                      <img src={imgMascota1} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>
                    <div className="Animal">
                      <img src={imgMascota2} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>
                    <div className="Animal">
                      <img src={imgMascota3} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>
                    <div className="Animal">
                      <img src={imgMascota4} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>
                    <div className="Animal">
                      <div className="InfoMascota">
                        <div className="Mas">
                          <a><img style={{ cursor: 'pointer' }} src={mas} alt="Mascota 1" className="mas" onClick={handleReportar} /></a>
                        </div>
                        <h2 className="informacion">Reportar Animal en Abandono </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
}

export default InterfazUser;
