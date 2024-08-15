import React, { useState, useEffect } from "react";
import axios from "axios";
import AyudaAnimal from '../Imagenes/img-mascota-5.webp';
import '../Estilos/StyleUI4.css';
import '../Estilos/StyleInformacion.css';
import '../Estilos/StyleRegistrar.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import logo from '../Imagenes/logo.webp';
import imgPr from '../Imagenes/espacio.png';

function EditarInformacion() {

  const navigate = useNavigate();
  const { id, id_  } = useParams(); // Obtener id de usuario y id de mascota desde la URL

  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState({
    nombre: '',
    fotoPerfil: ''
  });

  // Estado para almacenar los datos de la mascota
  const [datosMascota, setDatosMascota] = useState({
    nombre: '',
    tipo: '',
    raza: '',
    sexo: '',
    color: '',
    tamano: '',
    personalidad: '',
    rasgosDistintivos: '',
    fotoMascotaUs: '',
    userId: null
  });

  // Efecto para obtener los datos del usuario
  useEffect(() => {
    axios.get(`http://localhost:5000/usuarios/${id}`)
      .then(respuesta => {
        setUsuario(respuesta.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // Efecto para obtener los datos de la mascota
  useEffect(() => {
    axios.get(`http://localhost:5000/mascotas/${id_ }`)
      .then(respuesta => {
        setDatosMascota(respuesta.data);
      })
      .catch(err => console.log(err));
  }, [id_]);

  // Función para manejar la actualización de los datos de la mascota
  const ModificarUs = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/mascota/editar/${id_ }`, datosMascota)
      .then(respuesta => {
        navigate(`/espacio/${usuario.id}`);
      })
      .catch(err => console.log(err));
  };

  // Función para manejar los cambios en los inputs
  const manejadorInput = (e) => {
    setDatosMascota({ ...datosMascota, [e.target.name]: e.target.value });
  };

  // Función para manejar los clics en los botones de navegación
  const handleClick = (item) => {
    if (item === 'Home') {
      navigate(`/login/menu/${usuario.id}`);
    } else {
      // Aquí podrías implementar lógica adicional si es necesario
    }
  };

  return (
    <div className="Container">
      <header>
        <div className="user-section">
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`http://localhost:5000${usuario.fotoPerfil}`} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            {usuario.nombre}
          </p>
        </div>
        <h1>ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
      </header>
      <hr />

      <div>
        <nav>
          {['Tus Mascotas', 'Registrar Mascota', 'Editar Información', 'Home'].map((item) => (
            <button
              key={item}
              className={`nav-button ${item === 'Editar Información' ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <img src={imgPr} className='presentacionImg' alt="Imagen de Presentación" />
      </div>

      <div className='containerT'>
        <h2>Datos de la mascota</h2>
        <section className="form-section">
          <form onSubmit={ModificarUs}>
            <div className="form-container">
              {/* Contenedor 1 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Nombre de la Mascota</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    value={datosMascota.nombre} 
                    onChange={manejadorInput} 
                    className='Mascota' 
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Mascota</label>
                  <select 
                    name="tipo" 
                    value={datosMascota.tipo} 
                    onChange={manejadorInput} 
                    className="small-select"
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Raza de la Mascota</label>
                  <input 
                    type="text" 
                    name="raza" 
                    value={datosMascota.raza} 
                    onChange={manejadorInput} 
                    className='Mascota' 
                  />
                </div>
              </div>
              {/* Contenedor 2 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Sexo de la Mascota</label>
                  <select 
                    name="sexo" 
                    value={datosMascota.sexo} 
                    onChange={manejadorInput} 
                    className='Mascota'
                  >
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Color de la Mascota</label>
                  <input 
                    type="text" 
                    name="color" 
                    value={datosMascota.color} 
                    onChange={manejadorInput} 
                    className='Mascota' 
                  />
                </div>
                <div className="form-group">
                  <label>Tamaño de la Mascota</label>
                  <input 
                    type="text" 
                    name="tamano" 
                    value={datosMascota.tamano} 
                    onChange={manejadorInput} 
                    className='Mascota' 
                  />
                </div>
              </div>
              {/* Contenedor 3 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Personalidad de la Mascota</label>
                  <input 
                    type="text" 
                    name="personalidad" 
                    value={datosMascota.personalidad} 
                    onChange={manejadorInput} 
                    className="estado" 
                  />
                </div>
                <div className="form-group">
                  <label>Rasgos Distintivos de la Mascota</label>
                  <input 
                    type="text" 
                    name="rasgosDistintivos" 
                    value={datosMascota.rasgosDistintivos} 
                    onChange={manejadorInput} 
                    className="estado" 
                  />
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="form-group-container">
                <div className="form-group photo-section">
                  <label>Fotografía</label>
                  <img 
                    src={datosMascota.fotoMascotaUs ? `http://localhost:5000${datosMascota.fotoMascotaUs}` : AyudaAnimal} 
                    alt="Animal en Ayuda" 
                    className='ayudaAnimal' 
                  />
                </div>
                <button type="submit" className="submit-button">
                  Terminar Edición <span className="check-icon">✔</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditarInformacion;
