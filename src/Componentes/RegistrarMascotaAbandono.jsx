/*import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../Estilos/StyleUI4.css';
import '../Estilos/StyleInformacion.css';
import '../Estilos/RegistrarAbandonos.css';
import logo from '../Imagenes/logo.webp';
import imgPr from '../Imagenes/espacio.png';
import perroperfil from '../Imagenes/perro_perfil.webp';

function RegistrarMascotaAbandono() {
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
    tamano: '',
    provincia:'',
    canton:'',
    parroquia:'',
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
    tempErrors.tamano = datosMascota.tamano ? "" : "Este campo es obligatorio.";
    tempErrors.provincia = datosMascota.provincia ? "" : "Este campo es obligatorio.";
    tempErrors.canton = datosMascota.canton ? "" : "Este campo es obligatorio.";
    tempErrors.parroquia = datosMascota.parroquia ? "" : "Este campo es obligatorio.";
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
  const handleReportar = () => {
    navigate(`/espacio/abandonado/${id}`);
  };
  return (
    <div className="Container" onSubmit={handleSubmit}>
      <header>
      <h1>ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
        <div className="user-section">
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={imagenId} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            {nombre}
          </p>
        </div>
        
      </header>
      <img src={imgPr} className='presentacionImg' alt="Imagen de Presentación" />
      <hr />
      <div>
        <nav>
        <button className='nav-button' >Reportar Pérdida de mascota</button>
          <button className='nav-button' onClick={handleReportar}>Reportar Animal en Abandono</button>
          <button className='nav-button'>Administrar Registros de pérdida y de abandono</button>
          <button className='nav-button'>Home</button>
          
        </nav>
      </div>
      <div className='containerT'>
        <h2>Registrar Animal en Abandono</h2>
        <section className="form-section">
          <form>
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <div className='form-group1'>
                    <div>
                      <label>Ingrese el nombre en caso de ser un animal
                        encontrado y tenga un nombre, caso contrario
                        no llenar este campo</label>
                      <input type="text" placeholder="Fred" className='Mascota' id="nombre" value={datosMascota.nombre} onChange={handleChange} />
                      {errors.nombre && <p className="error" style={{ color: 'red' }}>{errors.nombre}</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione la especie del animal</label>
                  <select className="small-select" id="tipo" value={datosMascota.tipo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Gato</option>
                    <option>Perro</option>
                  </select>
                  {errors.tipo && <p className="error" style={{ color: 'red' }}>{errors.tipo}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza del animal</label>
                  <select className="small-select" id="raza" value={datosMascota.raza} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Indeterminada</option>
                  </select>
                  {errors.raza && <p className="error" style={{ color: 'red' }}>{errors.raza}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione el Sexo del animal</label>
                  <select className='Mascota' id="sexo" value={datosMascota.sexo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                  {errors.sexo && <p className="error" style={{ color: 'red' }}>{errors.sexo}</p>}
                </div>
              </div>
              <div className="form-group-container">

                <div className="form-group">
                  <label>Ingrese el Color del animal</label>
                  <input type="text" placeholder="Negro" className='Mascota' id="color" value={datosMascota.color} onChange={handleChange} />
                  {errors.color && <p className="error" style={{ color: 'red' }}>{errors.color}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el tamano del animal</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' id="tamano" value={datosMascota.tamano} onChange={handleChange} />
                  {errors.tamano && <p className="error" style={{ color: 'red' }}>{errors.tamano}</p>}
                </div>
                <div className="form-group">
                  <label>Registre la Dirección del animal en Abandono</label>
                  <label>Provincia</label>
                  <select className='Mascota' id="provincia" value={datosMascota.provincia} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Pichincha</option>
                    <option>Los Rios</option>
                  </select>
                  {errors.provincia && <p className="error" style={{ color: 'red' }}>{errors.provincia}</p>}
                  <label>Cantón</label>
                  <select className='Mascota' id="canton" value={datosMascota.canton} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Quito</option>
                    <option>Babahoyo</option>
                  </select>
                  {errors.canton && <p className="error" style={{ color: 'red' }}>{errors.canton}</p>}
                  <label>Parroquia</label>
                  <select className='Mascota' id="parroquia" value={datosMascota.parroquia} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Pichincha</option>
                    <option>GYE</option>
                  </select>
                  {errors.parroquia && <p className="error" style={{ color: 'red' }}>{errors.parroquia}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa el estado de salud del animal</label>
                  <input type="text" placeholder="Es una mascota..." className="estado" id="personalidad" value={datosMascota.personalidad} onChange={handleChange} />
                  {errors.personalidad && <p className="error" style={{ color: 'red' }}>{errors.personalidad}</p>}
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos del animal</label>
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

export default RegistrarMascotaAbandono;
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../Estilos/StyleUI4.css';
import '../Estilos/StyleInformacion.css';
import '../Estilos/RegistrarAbandonos.css';
import logo from '../Imagenes/logo.webp';
import imgPr from '../Imagenes/espacio.png';
import perroperfil from '../Imagenes/perro_perfil.webp';
import Button from '@mui/material/Button';
import usuario from '../Imagenes/icono_usuario.png';
import Box from '@mui/material/Box';
import imgPresentacion from '../Imagenes/Img4.png';



function RegistrarMascotaAbandono() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
    tamano: '',
    provincia: '',
    canton: '',
    parroquia: '',
    personalidad: '',
    rasgosDistintivos: '',
    id_duenio: id,
    fotoMascota: null
  });
  const handleChange = (e) => {
    setDatosMascota({
      ...datosMascota,
      [e.target.id]: e.target.value
    });
  };
  // const selectedImage = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = function () {
  //     const base64data = reader.result;
  //     setDatosMascota((prevMascota) => ({
  //       ...prevMascota,
  //       fotoMascota: base64data
  //     }));
  //   };
  // };
  const selectedImage = (e) => {

    //setfotoPerfil(e.target.files[0])
    setDatosMascota(prevState => ({
      ...prevState,
      fotoMascota: e.target.files[0]
    }));
  }

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = datosMascota.nombre ? "" : "Este campo es obligatorio.";
    tempErrors.tipo = datosMascota.tipo ? "" : "Este campo es obligatorio.";
    tempErrors.raza = datosMascota.raza ? "" : "Este campo es obligatorio.";
    tempErrors.sexo = datosMascota.sexo ? "" : "Este campo es obligatorio.";
    tempErrors.color = datosMascota.color ? "" : "Este campo es obligatorio.";
    tempErrors.tamano = datosMascota.tamano ? "" : "Este campo es obligatorio.";
    tempErrors.provincia = datosMascota.provincia ? "" : "Este campo es obligatorio.";
    tempErrors.canton = datosMascota.canton ? "" : "Este campo es obligatorio.";
    tempErrors.parroquia = datosMascota.parroquia ? "" : "Este campo es obligatorio.";
    tempErrors.personalidad = datosMascota.personalidad ? "" : "Este campo es obligatorio.";
    tempErrors.rasgosDistintivos = datosMascota.rasgosDistintivos ? "" : "Este campo es obligatorio.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     try {
  //       await axios.post("http://localhost:5000/animal", datosMascota);
  //       navigate(`/espacio/${id}`);
  //       console.log("Data sent successfully!");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      for (const key in datosMascota) {
        formData.append(key, datosMascota[key]);
      }
      try {
        const response = await axios.post("http://localhost:5000/animal", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // navigate(`/espacio/${id}`);
        navigate(`/animales/${id}`);
        console.log("Data sent successfully!", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
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
  const handleReportar = () => {
    navigate(`/espacio/abandonado/${id}`);
  };
  const handleReportarPerdida = () => {
    navigate(`/animales/${id}`);
  };
  const handleClick = () => {
    navigate(`/login/menu/${id}`); // Reemplaza '/home' con la ruta a la que quieres navegar
  };
  return (
    <div className="Container" onSubmit={handleSubmit}>
      <header>
        <h1>ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
        <div className="user-section">
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={imagenId} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            {nombre}
          </p>
        </div>
      </header>
      <img src={imgPresentacion} className='presentacionImg' alt="Imagen de Presentación" />
      <hr />
      <div>
        <nav>
          <button className='nav-button' onClick={handleReportarPerdida}>Reportar Pérdida de mascota</button>
          <button className='nav-button' onClick={handleReportar}>Reportar Animal en Abandono</button>
          <button className='nav-button'>Administrar Registros de pérdida y de abandono</button>
          <button className='nav-button' onClick={handleClick}>Home</button>
        </nav>
      </div>
      <hr />
      <div className='containerT'>
        <h2>Registrar Animal en Abandono</h2>
        <section className="form-section">
          <form>
            <div className="form-container">
              <div className="form-group-container">
                <div className="form-group">
                  <div className='form-group1'>
                    <div>
                      <label>Ingrese el nombre en caso de ser un animal
                        encontrado y tenga un nombre, caso contrario
                        no llenar este campo</label>
                      <input type="text" placeholder="Fred" className='Mascota' id="nombre" value={datosMascota.nombre} onChange={handleChange} />
                      {errors.nombre && <p className="error" style={{ color: 'red' }}>{errors.nombre}</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione la especie del animal</label>
                  <select className="small-select" id="tipo" value={datosMascota.tipo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Gato</option>
                    <option>Perro</option>
                  </select>
                  {errors.tipo && <p className="error" style={{ color: 'red' }}>{errors.tipo}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione la Raza del animal</label>
                  <select className="small-select" id="raza" value={datosMascota.raza} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Indeterminada</option>
                  </select>
                  {errors.raza && <p className="error" style={{ color: 'red' }}>{errors.raza}</p>}
                </div>
                <div className="form-group">
                  <label>Seleccione el Sexo del animal</label>
                  <select className='Mascota' id="sexo" value={datosMascota.sexo} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                  {errors.sexo && <p className="error" style={{ color: 'red' }}>{errors.sexo}</p>}
                </div>
              </div>
              <div className="form-group-container">

                <div className="form-group">
                  <label>Ingrese el Color del animal</label>
                  <input type="text" placeholder="Negro" className='Mascota' id="color" value={datosMascota.color} onChange={handleChange} />
                  {errors.color && <p className="error" style={{ color: 'red' }}>{errors.color}</p>}
                </div>
                <div className="form-group">
                  <label>Ingrese el tamano del animal</label>
                  <input type="text" placeholder="1.25 m" className='Mascota' id="tamano" value={datosMascota.tamano} onChange={handleChange} />
                  {errors.tamano && <p className="error" style={{ color: 'red' }}>{errors.tamano}</p>}
                </div>
                <div className="form-group">
                  <label>Registre la Dirección del animal en Abandono</label>
                  <label>Provincia</label>
                  <select className='Mascota' id="provincia" value={datosMascota.provincia} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Pichincha</option>
                    <option>Los Rios</option>
                  </select>
                  {errors.provincia && <p className="error" style={{ color: 'red' }}>{errors.provincia}</p>}
                  <label>Cantón</label>
                  <select className='Mascota' id="canton" value={datosMascota.canton} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Quito</option>
                    <option>Babahoyo</option>
                  </select>
                  {errors.canton && <p className="error" style={{ color: 'red' }}>{errors.canton}</p>}
                  <label>Parroquia</label>
                  <select className='Mascota' id="parroquia" value={datosMascota.parroquia} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option>Pichincha</option>
                    <option>GYE</option>
                  </select>
                  {errors.parroquia && <p className="error" style={{ color: 'red' }}>{errors.parroquia}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Describa el estado de salud del animal</label>
                  <input type="text" placeholder="Es una mascota..." className="estado" id="personalidad" value={datosMascota.personalidad} onChange={handleChange} />
                  {errors.personalidad && <p className="error" style={{ color: 'red' }}>{errors.personalidad}</p>}
                </div>
                <div className="form-group">
                  <label>Describa Rasgos Distintivos del animal</label>
                  <input type="text" placeholder="Manchas blancas..." className="estado" id="rasgosDistintivos" value={datosMascota.rasgosDistintivos} onChange={handleChange} />
                  {errors.rasgosDistintivos && <p className="error" style={{ color: 'red' }}>{errors.rasgosDistintivos}</p>}
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group photo-section">
                  {/* <label htmlFor="fotoMascota">Foto de la Mascota (URL):</label>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={selectedImage}
                />

                {/* <label htmlFor="fotoMascota">Foto de la Mascota (URL):</label>
                <input type="text" id="fotoMascota" value={datosMascota.fotoMascota} onChange={handleChange} className="form-control" />
                 *
                {errors.fotoMascota && <p className="error">{errors.fotoMascota}</p>} */}
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#754a36", color: "white" }}
                  >
                    <Box
                      component="img"
                      src={usuario} // Reemplaza con la ruta de tu imagen
                      alt="icono de subir foto"
                      sx={{ width: 50, height: 50, mr: 1 }}
                    />
                    Foto de Mascota
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={selectedImage}
                    />
                  </Button>
                </div>
                <div className="form-column">
                  <div className="foto-container">
                    {mostrarFoto()}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} type="submit" className="submit-button">Añadir <span className="check-icon">✔</span></button>
          </form>
        </section >
      </div >
    </div >
  );
}

export default RegistrarMascotaAbandono;
