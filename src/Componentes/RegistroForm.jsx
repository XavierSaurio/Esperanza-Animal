import React, { useState } from 'react';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import imagen from '../Imagenes/icono2.jpg';
import imgPresentacion from '../Imagenes/Img4.png';
import { useNavigate } from 'react-router-dom';
import '../Estilos/StyleUI3.css';

const RegistroForm = () => {

  const navigate = useNavigate();

  const handleAñadir= ()=> {
    navigate('/animales');
  }
  const [active, setActive] = useState('Mascotas en Abandono');

  return (
    <div className="contenedorRegistro">
      <header>
        <div className="usuario">
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
        <h2>Datos de la mascota en Abandono</h2>
        <section className="form-datosMascota">
          <form>
            <div className="form-contenedorRegistro">
              {/* Contenedor 1 */}
              <div className="form-group-contenedorRegistro">
                <div className="form-group">
                  <h3>Registre la Dirección de la mascota en Abandóno</h3>
                  <div className='form-group1'>
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
                <div className="form-group">
                  <label>Seleccione su tipo de Mascota</label>
                  <select className="small-select">
                    <option>Gato</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza de su Mascota</label>
                  <select className="small-select">
                    <option>Indeterminada</option>
                  </select>
                </div>
              </div>
              {/* Contenedor 2 */}
              <div className="form-group-contenedorRegistro">
                <div className="form-group">
                  <label>Seleccione el Sexo de su Mascota</label>
                  <select className='Mascota'>
                    <option>Macho</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ingrese el Color de su Mascota</label>
                  <input type="text" placeholder="Negro" className='Mascota' />
                </div>
                <div className="form-group">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' />
                </div>
              </div>
              {/* Contenedor 3 */}
              <div className="form-group-contenedorRegistro">
                <div className="form-group">
                  <label>Estado de la Mascota (Salud)</label>
                  <input type="text" placeholder="Es una mascota..." className="estado"/>
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado"/>
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="form-group-contenedorRegistro">
                <div className="form-group seleccionarFoto">
                  <label>Agregar Fotografía</label>
                  <button className="add-photo-button">+</button>
                </div>
                <div className="form-group">
                  <label>Seleccione la Situación Actual del Animal</label>
                  <select className="small-select">
                    <option>Grave</option>
                  </select>
                </div>
                <button type="submit" className="submit-button">Añadir <span className="iconoAñadir">✔</span></button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default RegistroForm;
