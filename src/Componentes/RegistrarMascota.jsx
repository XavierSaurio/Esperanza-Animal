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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [active, setActive] = useState('Registrar Mascota');

  // Navbar
  const handleClick = (item) => {
    if (item === 'Home') {
      navigate('/login/menu');
    } else {
      setActive(item);
    }
  };

  // Recuperar el Usuario
  const PETICION_GET_USUARIO = "http://localhost:5000/usuarios/";
  const [usuario, setUsuario] = useState({
    nombre: null,
    fotoPerfil: null
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(PETICION_GET_USUARIO + id)
      .then(respuesta => {
        const userData = respuesta.data;
        setUsuario(userData);
        setDatosMascota(prevState => ({
          ...prevState,
          userId: userData.id // Asigna el ID del usuario al estado de la mascota
        }));
      })
      .catch(err => console.log(err));
  }, [id]);

  // Registrar Mascota
  const PETICIONPOST = "http://localhost:5000/mascotas/new";
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

  const selectedImage = (e) => {
    setDatosMascota(prevState => ({
      ...prevState,
      fotoMascotaUs: e.target.files[0]
    }));
  }

  const manejadorInput = (event) => {
    const { name, value } = event.target;
    setDatosMascota(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = datosMascota.nombre ? "" : "Este campo es obligatorio.";
    tempErrors.tipo = datosMascota.tipo ? "" : "Este campo es obligatorio.";
    tempErrors.raza = datosMascota.raza ? "" : "Este campo es obligatorio.";
    tempErrors.sexo = datosMascota.sexo ? "" : "Este campo es obligatorio.";
    tempErrors.color = datosMascota.color ? "" : "Este campo es obligatorio.";
    tempErrors.tamano = datosMascota.tamano ? "" : "Este campo es obligatorio.";
    tempErrors.personalidad = datosMascota.personalidad ? "" : "Este campo es obligatorio.";
    tempErrors.rasgosDistintivos = datosMascota.rasgosDistintivos ? "" : "Este campo es obligatorio.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const manejadorSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(datosMascota).forEach(key => {
      formData.append(key, datosMascota[key]);
    });

    if (validate()) {
      try {
        const res = await axios.post(PETICIONPOST, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (res.status === 201 || res.status === 200) {
          console.log('Datos enviados con éxito');
          navigate(`/espacio/${usuario.id}`);
        } else {
          console.error('Error al enviar datos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  const mostrarFoto = () => {
    if (datosMascota.fotoMascotaUs === "") {
      return <img src={perroperfil} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
    } else {
      return <img src={URL.createObjectURL(datosMascota.fotoMascotaUs)} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
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
          <form onSubmit={manejadorSubmit}>
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <div className='form-group1'>
                    <div>
                      <label>Ingrese el Nombre de su Mascota</label>
                      <input
                        type="text"
                        placeholder="Fred"
                        className='Mascota'
                        name="nombre"
                        value={datosMascota.nombre}
                        onChange={manejadorInput}
                      />
                      {errors.nombre && <p className="error" style={{ color: 'red' }}>{errors.nombre}</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione su tipo de Mascota</label>
                  <select
                    className="small-select"
                    name="tipo"
                    value={datosMascota.tipo}
                    onChange={manejadorInput}
                  >
                    <option value="">Seleccione</option>
                    <option>Gato</option>
                    <option>Perro</option>
                  </select>
                  {errors.tipo && <p className="error" style={{ color: 'red' }}>{errors.tipo}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza de su Mascota</label>
                  <select
                    className="small-select"
                    name="raza"
                    value={datosMascota.raza}
                    onChange={manejadorInput}
                  >
                    <option value="">Seleccione</option>
                    <option>Indeterminada</option>
                  </select>
                  {errors.raza && <p className="error" style={{ color: 'red' }}>{errors.raza}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Seleccione el Sexo de su Mascota</label>
                  <select
                    className='Mascota'
                    name="sexo"
                    value={datosMascota.sexo}
                    onChange={manejadorInput}
                  >
                    <option value="">Seleccione</option>
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                  {errors.sexo && <p className="error" style={{ color: 'red' }}>{errors.sexo}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el Color de su Mascota</label>
                  <input
                    type="text"
                    placeholder="Negro"
                    className='Mascota'
                    name="color"
                    value={datosMascota.color}
                    onChange={manejadorInput}
                  />
                  {errors.color && <p className="error" style={{ color: 'red' }}>{errors.color}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el Tamaño de su mascota</label>
                  <input
                    type="number"
                    placeholder="1.25 m"
                    className='Mascota'
                    name="tamano"
                    value={datosMascota.tamano}
                    onChange={manejadorInput}
                  />
                  {errors.tamano && <p className="error" style={{ color: 'red' }}>{errors.tamano}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa la Personalidad de su Mascota</label>
                  <input
                    type="text"
                    placeholder="Feliz"
                    className='Mascota'
                    name="personalidad"
                    value={datosMascota.personalidad}
                    onChange={manejadorInput}
                  />
                  {errors.personalidad && <p className="error" style={{ color: 'red' }}>{errors.personalidad}</p>}
                </div>
                <div className="form-group">
                  <label>Describa los rasgos distintivos de su Mascota</label>
                  <input
                    type="text"
                    placeholder="Ojo morado"
                    className='Mascota'
                    name="rasgosDistintivos"
                    value={datosMascota.rasgosDistintivos}
                    onChange={manejadorInput}
                  />
                  {errors.rasgosDistintivos && <p className="error" style={{ color: 'red' }}>{errors.rasgosDistintivos}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Ingrese la Foto de su Mascota</label>
                  <input
                    type="file"
                    className='Mascota'
                    onChange={selectedImage}
                  />
                </div>
                {mostrarFoto()}
              </div>
            </div>
            <button type="submit" className="guardar">Enviar</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RegistrarMascota;
