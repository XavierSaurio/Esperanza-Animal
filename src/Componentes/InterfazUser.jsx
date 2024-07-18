import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import imagen from '../Imagenes/icono2.jpg';
import imgPresentacion from '../Imagenes/Img4.png';
import brindarAyuda from '../icons/icono-ayuda.svg';
import lupa from '../assets/icono-lupa.svg';
import ojo from '../assets/icono-ojo.svg';
import '../Estilos/InterfazUser.css';

Modal.setAppElement('#root');

function InterfazUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mascotas, setMascotas] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/login/${id}`);
        setNombre(response.data.nombre);
        setImagenId(response.data.fotoPerfil);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mascota');
        setMascotas(response.data.filter(mascota => mascota.id_duenio === id));
      } catch (error) {
        console.error('Error fetching mascotas:', error);
      }
    };
    fetchMascotas();
  }, [id]);

  const handleClick = (item) => {
    if (item === 'Home') {
      navigate('/login/menu');
    } else {
      setActive(item);
    }
  };

  const handleReportarPerdida = () => {
    setModalIsOpen(true);
  };

  const handleVisualizar = () => {
    navigate(`/animales/visualizar/${id}`);
  };

  const handleSubmit = async () => {
    try {
      const nuevaAlerta = {
        mascotaId: selectedMascota,
        provincia,
        canton,
        parroquia,
        descripcion,
        estado: 'perdida'
      };

      await axios.post('http://localhost:5000/registro', nuevaAlerta);

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

  return (
    <div>
      <div>
        <header>
          <div className="user-section">
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={imagenId} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
              {nombre}
            </p>
          </div>
          <h1>
            ESPERANZA ANIMAL
            <img src={imagen} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
          </h1>
        </header>
        <nav>
          {['Mascotas en Abandono', 'Registrar Mascota en Abandono', 'Brindar Ayuda a un Animal', '', 'Home'].map((item) => (
            <button
              key={item}
              className={`nav-button ${active === item ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <img src={imgPresentacion} className='presentacionImg' alt="Imagen de Presentación" />
      </div>
      <main>
        <div className="container">
          <div className="cajaB">
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
            <div className="AnimalesNecesitados">
              <div className="encabezado">
                <div className="contenedor-logo">
                  <span className="logo">Necesitamos tu ayuda</span>
                  <img src={brindarAyuda} className="icono-manos" />
                </div>
                <div className="contenedor-botones">
                  <button className="boton">Reportar Animal en Abandono</button>
                  <button className="boton" onClick={handleReportarPerdida}>Reportar Pérdida</button>
                  <div className="desplegable">
                    <select className="boton boton-desplegable">Administrar Registros
                      <option>Administrar Registros</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="Animales">
                {mascotas.map((mascota) => (
                  <div key={mascota.id} className={`Animal ${mascota.estado === 'perdida' ? 'perdida' : ''}`}>
                    <img src={mascota.fotoMascota} alt={mascota.nombre} className="ImagenMascota" />
                    <div className="MascotaInfo">
                      <h2 className="informacion1">
                        Informar <img src={ojo} alt="ojo" className="Ojo" onClick={handleVisualizar} />
                      </h2>
                      <h3>Nombre: <strong className="nombre">{mascota.nombre}</strong></h3>
                      {mascota.estado === 'perdida' && mascota.alerta && (
                        <h3>Ubicación: {mascota.alerta.provincia}, {mascota.alerta.canton}, {mascota.alerta.parroquia}</h3>
                      )}
                      <h3>Sexo: {mascota.sexo}</h3>
                      {mascota.estado === 'perdida' && <span className="EtiquetaPerdida">Perdida</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
      </main>
    </div>
  );
}

export default InterfazUser;
