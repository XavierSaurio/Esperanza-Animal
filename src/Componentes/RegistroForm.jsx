import React from 'react';
//import './RegistroForm.css';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import { useNavigate } from 'react-router-dom';

const RegistroForm = () => {

  const navigate = useNavigate();

  const handleAñadir= ()=> {
    navigate('/animales');
  }


    
    return (
        <div className='containerT'>
            <h2>Datos de la mascota en Abandono</h2>
            <section className="form-section">
          <form>
            <div className="form-container">
              {/* Contenedor 1 */}
              <div className="form-group-container">
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
              <div className="form-group-container">
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
              <div className="form-group-container">
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
              <div className="form-group-container">
                <div className="form-group photo-section">
                  <label>Agregar Fotografía</label>
                  <button className="add-photo-button">+</button>
                </div>
                <div className="form-group">
                  <label>Seleccione la Situación Actual del Animal</label>
                  <select className="small-select">
                    <option>Grave</option>
                  </select>
                </div>
                <button onClick={handleAñadir} type="submit" className="submit-button">Añadir <span className="check-icon">✔</span></button>
              </div>
            </div>
          </form>
        </section>
        </div>
        
      );
    };

export default RegistroForm;
