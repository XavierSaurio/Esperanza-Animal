// import React from 'react';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
///
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import logo from '../Imagenes/logo.webp'
import imgPr from '../Imagenes/espacio.png'
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import perroperfil from '../Imagenes/perro_perfil.webp'

function RegistrarMascota() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  
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

    //Capturar todos los atributos de la mascota que se quiere agregar
    const [datosMascota, setDatosMascota] = useState({
      nombre: '',
      tipo: '',
      raza: '',
      sexo: '',
      color: '',
      tamaño: '',
      personalidad: '',
      rasgosDistintivos: '',
      id_duenio: id,
      fotoMascota:''
      });

    const handleChange = (e) => {
      setDatosMascota({
        ...datosMascota,
        [e.target.id]: e.target.value
      });
    };

// enviar la informacion al db.json
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/mascota", datosMascota);
    navigate(`/espacio/${id}`);
    console.log("Data sent successfully!");
  } catch (error) {
    console.error(error);

  }
};



// Mostrar la foto de perfil o la foto ingresada
const mostrarFoto = () => {
  if (datosMascota.fotoMascota=="") {
    <br></br>
    return <img src={perroperfil} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;

  } else {
    <br></br>
    return <img src={datosMascota.fotoMascota} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
  }
};


  return (
    <div className="Container" onSubmit={handleChange}>
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
                      <input type="text" placeholder="Fred" className='Mascota' id="nombre" value={datosMascota.nombre} onChange={handleChange}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione su tipo de Mascota</label>
                  <select className="small-select" id="tipo" value={datosMascota.tipo} onChange={handleChange}>
                    <option>Gato</option>
                    <option>Perro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza de su Mascota</label>
                  <select className="small-select" id="raza" value={datosMascota.raza} onChange={handleChange}>
                    <option>Indeterminada</option>
                  </select>
                </div>
              </div>
              {/* Contenedor 2 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Seleccione el Sexo de su Mascota</label>
                  <select className='Mascota' id="sexo" value={datosMascota.sexo} onChange={handleChange}>
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ingrese el Color de su Mascota</label>
                  <input type="text" placeholder="Negro" className='Mascota' id="color" value={datosMascota.color} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' id="tamaño" value={datosMascota.tamaño} onChange={handleChange}/>
                </div>
              </div>
              {/* Contenedor 3 */}
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa la Personalidad de su Mascota</label>
                  <input type="text" placeholder="Es una mascota..." className="estado" id="personalidad" value={datosMascota.personalidad} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado" id="rasgosDistintivos" value={datosMascota.rasgosDistintivos} onChange={handleChange}/>
                </div>
              </div>
              {/* Contenedor 4 */}
              <div className="form-group-container">
                <div className="form-group photo-section">
                  <label id="fotoMascota" value={datosMascota.fotoMascota} onChange={handleChange} type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#754a36",
                                color: "white"
                            }}
                            onClick={handleChange}>Agregar Fotografía</label>
                            <br />
                            <br />
                            {mostrarFoto()}
                            <br />
                            <br />
                           
                            <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = function () {
                              const base64data = reader.result;
                              setDatosMascota((prevMascota)=> ({
                                ...prevMascota,
                                fotoMascota: base64data
                              }));
                            };
                            }}
                            />

                </div>
                <button onClick={handleSubmit} type="submit" className="submit-button">Añadir <span className="check-icon">✔</span></button>              </div>
            </div>
          </form>
        </section>
      </div>
    </div>


  );
};

export default RegistrarMascota;

