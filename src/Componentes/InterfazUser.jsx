// InterfazUsuario.jsx
import React, { useState } from 'react';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg'; 
import imagen from '../Imagenes/icono2.jpg';
import imgPresentacion from '../Imagenes/Img4.png';
import imgMascota1 from '../assets/img-mascota-1.webp'; 
import imgMascota2 from '../assets/img-mascota-2.webp'; 
import imgMascota3 from '../assets/img-mascota-3.webp'; 
import imgMascota4 from '../assets/img-mascota-4.webp'; 
import brindarAyuda from '../icons/icono-ayuda.svg'
import lupa from '../assets/icono-lupa.svg'
import ojo from '../assets/icono-ojo.svg'
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
            {['Mascotas en Abandono', 'Registrar Mascota en Abandono', 'Brindar Ayuda a un Animal','', 'Home'].map((item) => (
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
                <h2 className="FiltroInput">Filtro de Búsqueda</h2>
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
                
                {/*Necesitamos Ayuda */}
                <div className="encabezado">
                  <div className="contenedor-logo">
                    <span className="logo">Necesitamos tu ayuda</span>
                      <img src={brindarAyuda} className="icono-manos"/>
                 </div>
                  <div className="contenedor-botones">
                    <button className="boton">Reportar Animal en Abandono</button>
                    <button className="boton">Reportar Pérdida</button>
                    <div className="desplegable">
                      <select className="boton boton-desplegable">Administrar Registros
                      <option>Administrar Registros</option>  
                      </select>
                    </div>
                  </div>
                </div>

                  <div className="Animales">
                    <div className="Animal">
                      <div className="EtiquetaSituacion_Perdida">Pérdida</div>
                        <img src={imgMascota1} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion1">
                          Informar <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} />
                        </h2>
                        <h3>Nombre: <strong className="nombre">Goofy</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>

                    <div className="Animal">
                    <div className="EtiquetaSituacion_Abandono">Abandono</div>
                      <img src={imgMascota2} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion1">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Hembra</h3>
                      </div>
                    </div>
                    <div className="Animal">
                    <div className="EtiquetaSituacion_Perdida1">Pérdida</div>
                      <img src={imgMascota3} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion1">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Nombre: <strong className="nombre">Nala</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Hembra</h3>
                      </div>
                    </div>
                    <div className="Animal">
                    <div className="EtiquetaSituacion_Abandono1">Abandono</div>
                      <img src={imgMascota4} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion1">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Situación: <strong className="grave">Grave</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
                      </div>
                    </div>
                    <div className="Animal">
                    <div className="EtiquetaSituacion_Perdida2">Pérdida</div>
                      <img src={imgMascota3} alt="Mascota 1" className="ImagenMascota" />
                      <div className="InfoMascota">
                        <h2 className="informacion1">Ver Informacion <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Nombre: <strong className="nombre">Lili</strong></h3>
                        <h3>Ubicación: Pichincha, Quito, Tumbaco</h3>
                        <h3>Sexo: Macho</h3>
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
