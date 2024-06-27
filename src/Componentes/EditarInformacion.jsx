import React from 'react';
import AyudaAnimal from '../Imagenes/img-mascota-5.webp';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import { useNavigate } from 'react-router-dom';

function EditarInformacion (){

  const navigate = useNavigate();

  const handleTerminar = () =>{
    navigate('/espacio')
  }
    
    return (
        <div className='containerT'>
            <h2>Datos de la mascota</h2>
            <section className="form-section">
          <form>
            <div className="form-container">
              {/* Contenedor 1 */}
              <div className="form-group-container">
                <div className="form-group">
                    <div className='form-group1'>
                      <div>
                      <label>Ingrese el Nombre de su Mascota</label>
                      <input type="text" placeholder="Lucho" className='Mascota' />
                      </div>                     
                    </div>
                </div>         
                <div className="form-group">
                  <label>Seleccione su tipo de Mascota</label>
                  <select className="small-select">
                    <option>Perro</option>
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
                  <input type="text" placeholder="Café" className='Mascota' />
                </div>
                <div className="form-group">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' />
                </div>
              </div>
              {/* Contenedor 3 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa la Personalidad de su Mascota</label>
                  <input type="text" placeholder="Es una mascota..." className="estado"/>
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Tiene un ojo de otro color..." className="estado"/>
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="form-group-container">
                <div className="form-group photo-section">
                  <label>Fotografía</label>
                  <img src={AyudaAnimal} alt="Animal en Ayuda" className='ayudaAnimal' />
                </div>
                <button onClick={handleTerminar} type="submit" className="submit-button">Terminar Edición <span className="check-icon">✔</span></button>
              </div>
            </div>
          </form>
        </section>
        </div>
        
      );
    };

export default EditarInformacion;

