// import React from 'react';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
///
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import imagen from '../Imagenes/icono2.jpg';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import logo from '../Imagenes/logo.webp'
import imgPr from '../Imagenes/espacio.png'
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



function RegistrarMascota() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleAñadir = () => {
    navigate('/espacio');
  }
  useEffect(() => {
    // Fetch the name associated with the id from the server
    const fetchName = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/login/${id}`);
            setNombre(response.data.nombre);
        } catch (error) {
            console.error(error);
        }
    };
    fetchName();
}, [id]);

  // navbar
  const [active, setActive] = useState('Registar Mascota');
  const handleClick = (item) => {
      if (item === 'Home') {
          navigate('/login/menu'); // Reemplaza '/home' con la ruta a la que quieres navegar
      } else {
          setActive(item);
      }
  };

  //capturar imagen 
  const [imagenId, setImagenId] = useState('');

    useEffect(() => {
        // Fetch the image associated with the id from the server
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/login/${id}`);
                setImagenId(response.data.fotoPerfil);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImage();
    }, [id]);

  return (
    <div className="Container">
      <header>
        <div className="user-section">
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={imagenId} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            {nombre}
        </p>
        </div>
        <h1>ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
      </header>
      <hr />
      {/* g */}
      <div>
        <nav>
          {['Tus Mascotas', 'Registrar Mascota', 'Editar Información', 'Home'].map((item) => (
            <button
              key={item}
              className={`nav-button ${active === item ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <img src={imgPr} className='presentacionImg' alt="Imagen de Presentación" ></img>

      </div>

      {/* g */}


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
                      <input type="text" placeholder="Fred" className='Mascota' />
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
                  <label>Describa la Personalidad de su Mascota</label>
                  <input type="text" placeholder="Es una mascota..." className="estado" />
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado" />
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="form-group-container">
                <div className="form-group photo-section">
                  <label>Agregar Fotografía</label>
                  <button className="add-photo-button">+</button>
                </div>
                <button onClick={handleAñadir} type="submit" className="submit-button">Añadir <span className="check-icon">✔</span></button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>


  );
};

export default RegistrarMascota;

