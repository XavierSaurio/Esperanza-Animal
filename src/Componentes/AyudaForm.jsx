import React, { useState } from 'react';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import imagen from '../Imagenes/icono2.jpg';
import imgPresentacion from '../Imagenes/Img4.png';
import AyudaAnimal from '../Imagenes/img-mascota-2.webp';
import ayudaIcon from '../icons/icono-brindar-ayuda.svg';
import hogarIcon from '../icons/icono-casa.svg';
import '../Estilos/StyleUI4.css';
import { useNavigate } from 'react-router-dom';

const AyudaForm = () => {

  const navigate = useNavigate();

  const handleAyudar= ()=> {
    navigate('/animales');
  }
    
  const [active, setActive] = useState('Mascotas en Abandono');

  return (
    <div className="container">
      <header>
        <div className="iconoUsuario">
          <p><IconoSVG className="icon" />Usuario</p>
        </div>
        <h1>ESPERANZA ANIMAL 
          <img src={imagen} className='esperanzaImg' alt="Imagen de Esperanza Animal"/>
        </h1>
      </header>
      <img src={imgPresentacion} className='presentacionImg' alt="Imagen de Presentación" />

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

      <main>
        <h2>Datos de la mascota a la cual Brindar Ayuda</h2>
        <div className="situacion-container">
          <label className='situacionMascota'>Situación de la mascota</label>
          <select>
            <option>Grave</option>
          </select>
        </div>
        <section className="formInformacionAnimal">
          <form>
            <div className="contenedorPrincipal">
              {/* Contenedor 1 */}
              <div className="contenedoresInformacion">
                <div className="direccionMascota">
                  <h3>Registre la Dirección de la mascota en Abandóno</h3>
                  <div className='direccionMascota1'>
                    <div>
                      <label className='Direccion'>Provincia</label>
                      <select>
                        <option>Pichincha</option>
                      </select>
                    </div>
                    <div>
                      <label className='Direccion'>Cantón</label>
                      <select>
                        <option>Quito</option>
                      </select>
                    </div>
                    <div>
                      <label className='Direccion'>Parroquia</label>
                      <select>
                        <option>Tumbaco</option>
                      </select>
                    </div>
                  </div>
                </div>         
                <div className="direccionMascota">
                  <label>Seleccione su tipo de Mascota</label>
                  <select className="opcionesMascota">
                    <option>Gato</option>
                  </select>
                </div>
                <div className="direccionMascota">
                  <label>Seleccione la Raza de su Mascota</label>
                  <select className="opcionesMascota">
                    <option>Indeterminada</option>
                  </select>
                </div>
              </div>
              {/* Contenedor 2 */}
              <div className="contenedoresInformacion">
                <div className="direccionMascota">
                  <label>Seleccione el Sexo de su Mascota</label>
                  <select className='Mascota'>
                    <option>Macho</option>
                  </select>
                </div>
                <div className="direccionMascota">
                  <label>Ingrese el Color de su Mascota</label>
                  <input type="text" placeholder="Negro" className='Mascota' />
                </div>
                <div className="direccionMascota">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' />
                </div>
              </div>
              {/* Contenedor 3 */}
              <div className="contenedoresInformacion">
                <div className="direccionMascota">
                  <label>Estado de la Mascota (Salud)</label>
                  <input type="text" placeholder="Es una mascota..." className="estado"/>
                </div>
                <div className="direccionMascota">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado"/>
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="contenedoresInformacion">
                <div className="direccionMascota photo-section">
                  <label>Fotografía</label>
                  <img src={AyudaAnimal} alt="Animal en Ayuda" className='ayudaAnimal' />
                </div>
                <div className="buttons-container">
                  <button className="botonesAyuda">
                    <img src={ayudaIcon} alt="Brindar Ayuda" className="iconoBoton" />
                    <span>Brindar Ayuda</span>
                  </button>
                  <button className="botonesAyuda">
                    <img src={hogarIcon} alt="Dar Hogar" className="iconoBoton" />
                    <span>Dar Hogar</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
    };

export default AyudaForm;
