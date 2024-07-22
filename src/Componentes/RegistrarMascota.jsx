import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../Estilos/StyleUI4.css';
import '../Estilos/StyleInformacion.css';
import '../Estilos/StyleRegistrar.css';
import logo from '../Imagenes/logo.webp';
import imgPr from '../Imagenes/espacio.png';
import perroperfil from '../Imagenes/perro_perfil.webp';

function RegistrarMascota() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [errors, setErrors] = useState({});
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

  const [active, setActive] = useState('Registrar Mascota');
  const handleClick = (item) => {
    if (item === 'Home') {
      navigate('/login/menu');
    } else {
      setActive(item);
    }
  };

  const [imagenId, setImagenId] = useState('');

  useEffect(() => {
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
    fotoMascota: ''
  });

  const handleChange = (e) => {
    setDatosMascota({
      ...datosMascota,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = datosMascota.nombre ? "" : "Este campo es obligatorio.";
    tempErrors.tipo = datosMascota.tipo ? "" : "Este campo es obligatorio.";
    tempErrors.raza = datosMascota.raza ? "" : "Este campo es obligatorio.";
    tempErrors.sexo = datosMascota.sexo ? "" : "Este campo es obligatorio.";
    tempErrors.color = datosMascota.color ? "" : "Este campo es obligatorio.";
    tempErrors.tamaño = datosMascota.tamaño ? "" : "Este campo es obligatorio.";
    tempErrors.personalidad = datosMascota.personalidad ? "" : "Este campo es obligatorio.";
    tempErrors.rasgosDistintivos = datosMascota.rasgosDistintivos ? "" : "Este campo es obligatorio.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:5000/mascota", datosMascota);
        navigate(`/espacio/${id}`);
        console.log("Data sent successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const mostrarFoto = () => {
    if (datosMascota.fotoMascota === "") {
      return <img src={perroperfil} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
    } else {
      return <img src={datosMascota.fotoMascota} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
    }
  };

  return (
    <div className="Container" onSubmit={handleSubmit}>
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
        <img src={imgPr} className='presentacionImg' alt="Imagen de Presentación" />
      </div>
      <div className='containerT'>
        <h2>Datos de la mascota</h2>
        <section className="form-section">
          <form>
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <div className='form-group1'>
                    <div>
                      <label>Ingrese el Nombre de su Mascota</label>
                      <input type="text" placeholder="Fred" className='Mascota' id="nombre" value={datosMascota.nombre} onChange={handleChange} />
                      {errors.nombre && <p className="error" style={{ color: 'red' }}>{errors.nombre}</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione su tipo de Mascota</label>
                  <select className="small-select" id="tipo" value={datosMascota.tipo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Gato</option>
                    <option>Perro</option>
                  </select>
                  {errors.tipo && <p className="error" style={{ color: 'red' }}>{errors.tipo}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza de su Mascota</label>
                  <select className="small-select" id="raza" value={datosMascota.raza} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Indeterminada</option>
                  </select>
                  {errors.raza && <p className="error" style={{ color: 'red' }}>{errors.raza}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Seleccione el Sexo de su Mascota</label>
                  <select className='Mascota' id="sexo" value={datosMascota.sexo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                  {errors.sexo && <p className="error" style={{ color: 'red' }}>{errors.sexo}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el Color de su Mascota</label>
                  <input type="text" placeholder="Negro" className='Mascota' id="color" value={datosMascota.color} onChange={handleChange} />
                  {errors.color && <p className="error" style={{ color: 'red' }}>{errors.color}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' id="tamaño" value={datosMascota.tamaño} onChange={handleChange} />
                  {errors.tamaño && <p className="error" style={{ color: 'red' }}>{errors.tamaño}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa la Personalidad de su Mascota</label>
                  <input type="text" placeholder="Es una mascota..." className="estado" id="personalidad" value={datosMascota.personalidad} onChange={handleChange} />
                  {errors.personalidad && <p className="error" style={{ color: 'red' }}>{errors.personalidad}</p>}
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos de su Mascota</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado" id="rasgosDistintivos" value={datosMascota.rasgosDistintivos} onChange={handleChange} />
                  {errors.rasgosDistintivos && <p className="error" style={{ color: 'red' }}>{errors.rasgosDistintivos}</p>}
                </div>
              </div>
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
                        setDatosMascota((prevMascota) => ({
                          ...prevMascota,
                          fotoMascota: base64data
                        }));
                      };
                    }}
                  />
                </div>
                <button onClick={handleSubmit} type="submit" className="submit-button">Añadir <span className="check-icon">✔</span></button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RegistrarMascota;
