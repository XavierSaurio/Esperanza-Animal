import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import logo from '../assets/logo.webp'
import imgPresentacion from '../Imagenes/Img4.png';
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

  const handleClick = (path) => {
    navigate(path);
  };

  const handleReportarPerdida = () => {
    setModalIsOpen(true);
  };

  const handleVisualizar = (mascota) => {
    setSelectedMascota(mascota);
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

  return (
    <div>
      <header>
        <h1>
          ESPERANZA ANIMAL
          <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
        </h1>
        <div className="user-section">
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <img
              style={{ borderRadius: '50%', width: '40px', height: '40px' }}
              src={`http://localhost:5000${imagenId}`}
              alt="Foto"
            />
            <Typography sx={{ color: '#754a36', marginLeft: '0.5rem' }}>
              {nombre}
            </Typography>
          </div>
        </div>
      </header>
      <img src={imgPresentacion} className="presentacionImg" alt="Imagen de Presentación" />
      <nav>
        <button className='nav-button' onClick={handleReportarPerdida}>Reportar Pérdida de mascota</button>
        <button className='nav-button' onClick={handleReportar}>Reportar Animal en Abandono</button>
        <button className='nav-button'>Administrar Registros de pérdida y de abandono</button>
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

            {/* <div className="AnimalesNecesitados"> */}

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
          {/* </div> */}
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
          <h2>Reportar Mascota Perdida</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label>
              Mascota:
              <select value={selectedMascota} onChange={(e) => setSelectedMascota(e.target.value)}>
                <option value="">Selecciona una mascota</option>
                {mascotas.map((mascota) => (
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
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <button type="submit">Publicar Alerta</button>
          </form>
        </Modal>
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal">
          {mascotaPerdida && (
            <div>
              <h2>{mascotaPerdida.nombre}</h2>
              <img src={mascotaPerdida.fotoMascota} alt={mascotaPerdida.nombre} />
              <p><strong>Sexo:</strong> {mascotaPerdida.sexo}</p>
              <p><strong>Raza:</strong> {mascotaPerdida.raza}</p>
              <p><strong>Color:</strong> {mascotaPerdida.color}</p>
              <p><strong>Tamaño:</strong> {mascotaPerdida.tamaño}</p>
              <p><strong>Personalidad:</strong> {mascotaPerdida.personalidad}</p>
              <p><strong>Rasgos Distintivos:</strong> {mascotaPerdida.rasgosDistintivos}</p>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

export default InterfazUser;
