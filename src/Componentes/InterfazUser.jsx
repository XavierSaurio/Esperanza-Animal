import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import logo from '../assets/logo.webp'
import imgPresentacion from '../Imagenes/Img4.png';
import ayudaAnimal from '../Imagenes/ayudaAnimal.jpg';
import adopcionAnimal from '../Imagenes/adopcionAnimal.jpg';
import brindarAyuda from '../icons/icono-ayuda.svg';
import lupa from '../assets/icono-lupa.svg';
import ojo from '../assets/icono-ojo.svg';
import '../Estilos/InterfazUser.css';
import { Typography } from "@mui/material";
import perroperfil from '../Imagenes/perro_perfil.webp';

Modal.setAppElement('#root');

function InterfazUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mascotas, setMascotas] = useState([]);
  const [abandonos, setAbandonos] = useState([]); // Nuevo estado para abandonos
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState('');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState('Registrar Mascota');
  const [nombre, setNombre] = useState('');
  const [imagenId, setImagenId] = useState('');
  const [mascotaPerdida, setMascotaPerdida] = useState(null);
  const [celularDuenio, setCelularDuenio] = useState('');
  const [showAvistamientoModal, setShowAvistamientoModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/usuarios/${id}`);
        setNombre(response.data.nombre);
        setImagenId(response.data.fotoPerfil);
        setCelularDuenio(response.data.celular);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/animal');
        setMascotas(response.data.filter(mascota => mascota.id_duenio === id));
      } catch (error) {
        console.error('Error fetching mascotas:', error);
      }
    };
    fetchMascotas();
  }, [id]);
  // Nuevo useEffect para obtener abandonos
  useEffect(() => {
    const fetchAbandonos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/animal'); // Cambia según tu endpoint
        setAbandonos(response.data.filter(mascota => mascota.estado === 'abandonado'));
      } catch (error) {
        console.error('Error fetching abandonos:', error);
      }
    };
    fetchAbandonos();
  }, []);

  const handleClick = () => {
    navigate('/login/menu/11');
  };

  const handleReportarPerdida = () => {
    setModalIsOpen(true);
  };

  const handleVisualizar = (mascota) => {
    setMascotaPerdida(mascota);
    setShowModal(true);
  };

  const mostrarFoto = (mascota) => {
    if (!mascota.fotoMascota) {
      return <img src={perroperfil} alt="Imagen" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />;
    } else {
      return <img src={`http://localhost:5000${mascota.fotoMascota}`} alt={mascota.nombreAbandonado} className="ImagenMascota" />;
    }
  };

  const handleSubmit = async () => {
    try {
      const selected = mascotas.find(mascota => mascota.id === selectedMascota);
      if (selected && selected.estado === 'perdida') {
        alert('Esta mascota ya está reportada como perdida.');
        return;
      }

      const nuevaAlerta = {
        mascotaId: selectedMascota,
        provincia,
        canton,
        parroquia,
        descripcion,
        estado: 'perdida'
      };

      await axios.post('http://localhost:5000/registro', nuevaAlerta);
      await axios.patch(`http://localhost:5000/animales/${selectedMascota}`, {
        estado: 'perdida',
        alerta: nuevaAlerta
      });

      const updatedMascotas = mascotas.map(mascota => {
        if (mascota.id === selectedMascota) {
          return {
            ...mascota,
            estado: 'perdida',
            alerta: nuevaAlerta
          };
        }
        return mascota;
      });
      setMascotas(updatedMascotas);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const handleReportar = () => {
    navigate(`/espacio/abandonado/${id}`);
  };
  // Modal Brindar Ayuda
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  //MODAL PARA REGISTRO DE MASCOTAS
  const [isModalROpen, setIsModalROpen] = useState(false);
  const openRModal = () => setIsModalROpen(true);
  const closeRModal = () => setIsModalROpen(false);

  //MODAL PARA AVISTAMIENTO DE LA MASCOTA
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const openAModal = () => setIsModalAOpen(true);
  const closeAModal = () => setIsModalAOpen(false);

  //AYUDA PARA HISTORIAL DE ABANDONO
  const [isModalHOpen, setIsModalHOpen] = useState(false);
  const openHModal = () => setIsModalHOpen(true);
  const closeHModal = () => setIsModalHOpen(false);

  const sightingsData = [
    { street: 'Calle Búho 223', place: 'Cerca de una panadería' },
    { street: 'Calle Gallinall 3', place: 'Cerca del parque' },
    { street: 'Calle 24 de mayo', place: 'Durmiendo en un basurero' },
    { street: 'Calle la independencia', place: 'Corriendo por el parque' }
  ];

  return (
    <div>
      <header style={{marginBottom:'0rem', padding:'0rem'}}>
        <div className="user-section">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{ borderRadius: '50%', width: '40px', height: '40px', marginLeft: '1rem' }}
              src={`http://localhost:5000${imagenId}`}
              alt="Foto"
            />
            <Typography sx={{ color: '#754a36', marginLeft: '0.5rem' }}>
              {nombre}
            </Typography>
          </div>
        </div>
        <h1 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
      </header>
      <img src={imgPresentacion} className="presentacionImg" alt="Imagen de Presentación" />
      <nav>
        <button className='nav-button' onClick={handleReportarPerdida}>Reportar Pérdida de mascota</button>
        <button className='nav-button' onClick={handleReportar}>Reportar Animal en Abandono</button>
        <button className='nav-button' onClick={openRModal}>Administrar Registros de pérdida y de abandono</button>
        <button className='nav-button' onClick={() => handleClick()}>Home</button>
      </nav>
      <main>
        <div className="container">
          <div className="cajaA">
            <h2 className="FiltroInput">Filtro de Búsqueda</h2>
            <div className="FiltroBusqueda">
              <div className="FB">
                <h4 className="Filtrar">Filtrar Busqueda</h4>
              </div>
              <select className="Select">
                <option>Seleccione Provincia</option>
              </select>
              <select className="Select">
                <option>Seleccione Cantón</option>
              </select>
              <select className="Select">
                <option>Seleccione Parroquia</option>
              </select>
              <button className="BotonBusqueda"><img src={lupa} alt="lupa" className="Lupa" /></button>
            </div>
          </div>
          <div className="cajaB">

            {abandonos.length > 0 ? (
              <div className="Animales">
                {abandonos.map((mascota) => (
                  <div key={mascota.id} className={`Animal ${mascota.estado === 'abandonado' ? 'abandonado' : ''}`}>
                    {mascota.estado === 'abandonado' && <span className="EtiquetaAbandono">Abandono</span>}
                    {mostrarFoto(mascota)}
                    <div className="MascotaInfo">
                      <h2 className="informacion1">
                        Brindar Ayuda <img src={ojo} alt="ojo" className="Ojo" onClick={() => handleVisualizar(mascota)} />
                      </h2>
                      <h3>Situación: {mascota.situacion}</h3>
                      <h3>Ubicación de abandono: {mascota.provincia}, {mascota.canton}, {mascota.parroquia}</h3>
                      <h3>Sexo: {mascota.sexo}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay animales en abandono.</p>
            )}

          </div>
        </div>
        {/*MODAL PARA MOSTRAR LOS DATOS DE LA MASCOTA*/}
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal">
          {mascotaPerdida && (
            <div>
              <h2>Necesito de tu ayuda !!!!</h2>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <h3>Fotografía</h3>
                  <img src={`http://localhost:5000${mascotaPerdida.fotoMascota}`} alt={mascotaPerdida.nombreAbandonado} />
                  <button className="botonAyuda">
                    <img src={brindarAyuda} alt="Brindar Ayuda" type="button" onClick={openModal} />
                    Brindar Ayuda
                  </button>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <p><strong>Ubicación del animal en abandono:</strong> {mascotaPerdida.provincia} | {mascotaPerdida.canton} | {mascotaPerdida.parroquia}</p>
                  <p><strong>Raza:</strong> {mascotaPerdida.raza}</p>
                  <p><strong>Sexo:</strong> {mascotaPerdida.sexo}</p>
                  <p><strong>Color:</strong> {mascotaPerdida.color}</p>
                  <p><strong>Tamaño:</strong> {mascotaPerdida.tamano} m</p>
                  <p><strong>Situación de la mascota:</strong>
                    <span style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>
                      {mascotaPerdida.situacion}
                    </span>
                  </p>
                  <p><strong>Rasgos Distintivos:</strong> {mascotaPerdida.rasgosDistintivos}</p>
                  <p><strong>Estado de salud del animal:</strong> {mascotaPerdida.personalidad}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
        {/*MODAL PARA BRINDAR AYUDA */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Brindar Ayuda" className="modal-contenedor2">
          <h2 className="modal-Titulo">Brindar Ayuda</h2>
          <div className="cuerpo-modal">
            <div className="header-section">
              <img src={ayudaAnimal} alt="ImagenBrindarAyuda" className="modal-image" />
              <img src={adopcionAnimal} alt="ImagenAdopcionAnimal" className="modal-image" />
            </div>
            <div className="info-section">
              <div className="info-titles">
                <span>Ayudas Materiales</span>
                <span>Adopción</span>
                <span>Animal perdido</span>
              </div>
              <div className="info-descriptions">
                <span>Comida, medicina, vacunas, entre otros.</span>
                <span>Dale un hogar a un animal necesitado.</span>
                <span>Animal con hogar, pero sin información sobre su procedencia y hogar.</span>
              </div>
            </div>
            <label htmlFor="helpType" className="select-label">Seleccione el tipo de Ayuda a Brindar:</label>
            <select id="helpType" name="tipoAyuda" className="select-input">
              <option value="comida">Comida</option>
              <option value="comida">Medicina</option>
              <option value="comida">Vacunas</option>
            </select>
            <br />
            <label htmlFor="contacto" className="contact-label">Contacto de Ayuda: 0912345678</label>
            <button type="button" className="modal-button" onClick={closeModal}>
              Aceptar
            </button>
          </div>
        </Modal>
        {/*MODAL DE REPORTAR PERDIDA */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Reportar Mascota Perdida"
          className="ModalContent"
          overlayClassName="ModalOverlay"
        >
          <h2>Reportar Pérdida de Mascota</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Selecciona tu mascota:
              <select value={selectedMascota} onChange={(e) => setSelectedMascota(e.target.value)}>
                <option value="">Selecciona una mascota</option>
                {mascotas.map(mascota => (
                  <option key={mascota.id} value={mascota.id}>
                    {mascota.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Provincia:
              <input type="text" value={provincia} onChange={(e) => setProvincia(e.target.value)} />
            </label>
            <label>
              Cantón:
              <input type="text" value={canton} onChange={(e) => setCanton(e.target.value)} />
            </label>
            <label>
              Parroquia:
              <input type="text" value={parroquia} onChange={(e) => setParroquia(e.target.value)} />
            </label>
            <label>
              Descripción:
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
            </label>
            <button type="submit">Reportar</button>
          </form>
        </Modal>
        {/*MODAL DE REGISTRO DE MASCOTA */}
        {/*<button className="open-modal-button" onClick={openRModal} type="button"> Abrir Ayuda </button>*/}
        <Modal
          isOpen={isModalROpen}
          onRequestClose={closeRModal}
          contentLabel="Brindar Ayuda"
          className="modal-contenedor1"
          overlayClassName="modal-overlay1"
        >
          <div className="modal-content">
            <h2>Tus registros de mascotas perdidas y animales en abandono</h2>

            <div className="section">
              <h3>Registros por pérdida:</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Mascota</th>
                      <th>Estado de la mascota</th>
                      <th>Cantidad de avistamientos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Goofy</td>
                      <td>
                        <div className="estado">
                          <label>
                            <input type="radio" name="goofy" />
                            <span className="no-encontrado">No encontrado</span>
                          </label>
                          <label>
                            <input type="radio" name="goofy" />
                            <span className="encontrado">Encontrado</span>
                          </label>
                        </div>
                      </td>
                      <td>
                        4 <a href="#" onClick={openAModal}>Ver historial</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Nala</td>
                      <td>
                        <div className="estado">
                          <label>
                            <input type="radio" name="nala" />
                            <span className="no-encontrado">No encontrado</span>
                          </label>
                          <label>
                            <input type="radio" name="nala" />
                            <span className="encontrado">Encontrado</span>
                          </label>
                        </div>
                      </td>
                      <td>
                        0 <a href="#">Ver historial</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="update-button">Actualizar estado de la mascota</button>
            </div>
            <div className="section">
              <h3>Registros de abandono:</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Ubicación del caso</th>
                      <th>Estado del animal en abandono</th>
                      <th>Cantidad de ayuda recibida</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sector el Arenal, calle Josefa tinajero</td>
                      <td>
                        <span className="no-adoptado">No adoptado</span>
                      </td>
                      <td>
                        4 <a href="#" onClick={openHModal}>Ver historial</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Sector Tumbaco, calle Eugenio Espejo</td>
                      <td>
                        <span className="adoptado">Adoptado/Encontrado</span>
                      </td>
                      <td>
                        6 <a href="#">Ver historial</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="close-modal-button" onClick={closeRModal}>
              Cerrar
            </button>
          </div>
        </Modal>
        {/*MODAL PARA AVISTAMIENTO */}
        {/*<button onClick={openAModal}>Ver Historial de Avistamientos</button>*/}
        <Modal
          isOpen={isModalAOpen}
          onRequestClose={closeAModal}
          contentLabel="Historial de Avistamientos"
          className="sightings-modal-container"
          overlayClassName="sightings-modal-overlay"
        >
          <h2 className="sightings-modal-title">Historial avistamientos:</h2>
          <div className="sightings-table-container">
            <table className="sightings-table">
              <thead>
                <tr>
                  <th>Avistamiento</th>
                  <th>Calle de avistamiento</th>
                  <th>Lugar de avistamiento</th>
                </tr>
              </thead>
              <tbody>
                {sightingsData.map((sighting, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sighting.street}</td>
                    <td>{sighting.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="sightings-modal-close-button" onClick={closeAModal}> Volver </button>
        </Modal>
        {/*MODAL PARA hISTORIAL DE ABANDONO */}
        <Modal
          isOpen={isModalHOpen}
          onRequestClose={closeHModal}
          contentLabel="Brindar Ayuda"
          className="modal-contenedor3"
          overlayClassName="modal-overlay3"
        >
          <div className="ayuda-form">
            <h2>Sector el Arenal, calle Josefa Tinajero</h2>
            <h3>Historial de ayudas:</h3>
            <table>
              <thead>
                <tr>
                  <th>No. Ayuda</th>
                  <th>Tipo de ayuda</th>
                  <th>Fecha de ayuda</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Comida</td>
                  <td>2024/06/10</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Vacunas</td>
                  <td>2024/06/15</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Casa</td>
                  <td>2024/07/15</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Adoptado</td>
                  <td>2024/10/10</td>
                </tr>
              </tbody>
            </table>
            <button onClick={closeHModal}>Volver</button>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default InterfazUser;
