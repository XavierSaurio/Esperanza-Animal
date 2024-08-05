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
  const [mascotaPerdida, setMascotaPerdida] = useState(null); // Estado para la mascota seleccionada
  const [celularDuenio, setCelularDuenio] = useState(''); // Estado para el celular del dueño
  const [showAvistamientoModal, setShowAvistamientoModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/login/${id}`);
        setNombre(response.data.nombre);
        setImagenId(response.data.fotoPerfil);
        setCelularDuenio(response.data.celular); // Guardar el celular del dueño
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [id]);
  //inicialmente para animales perdidos
  // useEffect(() => {
  //   const fetchMascotas = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/mascota');
  //       setMascotas(response.data.filter(mascota => mascota.id_duenio === id));
  //     } catch (error) {
  //       console.error('Error fetching mascotas:', error);
  //     }
  //   };
  //   fetchMascotas();
  // }, [id]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/animales');
        setMascotas(response.data.filter(mascota => mascota.id_duenio === id && mascota.estado === 'abandono'));
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

  const handleVisualizar = (mascota) => {
    // navigate(`/animales/visualizar/${id}`);
    setMascotaPerdida(mascota);
    setShowModal(true);
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
      // Guardar la alerta en la tabla 'registro'
      await axios.post('http://localhost:5000/registro', nuevaAlerta);

      // Actualizar el estado de la mascota a 'perdida'
      await axios.patch(`http://localhost:5000/animales/${selectedMascota}`, {
        estado: 'perdida',
        alerta: nuevaAlerta
      });

      // await axios.post('http://localhost:5000/registro', nuevaAlerta);
      // await axios.patch(`http://localhost:5000/animales/${selectedMascota}`, nuevaAlerta);

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
      <div>
        <header>
          <h1>
            ESPERANZA ANIMAL
            <img src={imagen} className='esperanzaImg' alt="Imagen de Esperanza Animal" />
          </h1>
          <div className="user-section">
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={imagenId} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
              {nombre}
            </p>
          </div>
        </header>
        <img src={imgPresentacion} className='presentacionImg' alt="Imagen de Presentación" />
        <nav>
          {/*           
          {['Reportar Pérdida de mascota', 'Reportar Animal en Abandono', 'Administrar Registros de pérdida y de abandono', 'Home'].map((item) => (
            <button
              key={item}
              className={`nav-button ${active === item ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))} */}
          <button className='nav-button' onClick={() => handleClick(handleReportarPerdida)}>Reportar Pérdida de mascota</button>
          <button className='nav-button' onClick={handleReportar}>Reportar Animal en Abandono</button>
          <button className='nav-button'>Administrar Registros de pérdida y de abandono</button>
          <button className='nav-button'>Home</button>
          {/* {['Reportar Pérdida de mascota', 'Reportar Animal en Abandono', 'Administrar Registros de pérdida y de abandono', 'Home'].map((item) => (
            <button
              key={item}
              className={`nav-button ${active === item ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))} */}
        </nav>
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
            {/* <div className="AnimalesNecesitados">

              <div className="Animales">
                {mascotas.map((mascota) => (
                  <div key={mascota.id} className={`Animal ${mascota.estado === 'perdida' ? 'perdida' : ''}`}>
                    <img src={mascota.fotoMascota} alt={mascota.nombre} className="ImagenMascota" />
                    <div className="MascotaInfo">
                      <h2 className="informacion1">
                        Informar <img src={ojo} alt="ojo" className="Ojo" onClick={() => handleVisualizar(mascota)} />
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
            </div> */}
            <div className="AnimalesNecesitados">
              <div className="Animales">
                {mascotas.map((mascota) => (
                  <div key={mascota.id} className={`Animal ${mascota.estado === 'abandono' ? 'abandono' : ''}`}>
                    <img src={mascota.fotoMascota} alt={mascota.nombre} className="ImagenMascota" />
                    <div className="MascotaInfo">
                      <h2 className="informacion1">
                        Informar <img src={ojo} alt="ojo" className="Ojo" onClick={() => handleVisualizar(mascota)} />
                      </h2>
                      <h3>Nombre: <strong className="nombre">{mascota.nombre}</strong></h3>
                      <h3>Sexo: {mascota.sexo}</h3>
                      {mascota.estado === 'abandono' && <span className="EtiquetaAbandono">Abandonado</span>}
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
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal">
          {mascotaPerdida && (
            <div>
              <h2>{mascotaPerdida.nombre}</h2>
              <img src={mascotaPerdida.fotoMascota} alt={mascotaPerdida.nombre} className="Animal" />
              <p>Raza: {mascotaPerdida.raza}</p>
              <p>Sexo: {mascotaPerdida.sexo}</p>
              <p>Color: {mascotaPerdida.color}</p>
              <p>tamano: {mascotaPerdida.tamano}</p>
              <p>Personalidad: {mascotaPerdida.personalidad}</p>
              <p>Rasgos distintivos: {mascotaPerdida.rasgosDistintivos}</p>
              {mascotaPerdida.alerta && (
                <>
                  <p>Ubicación: {mascotaPerdida.alerta.provincia}, {mascotaPerdida.alerta.canton}, {mascotaPerdida.alerta.parroquia}</p>
                  <p>Descripción del lugar: {mascotaPerdida.alerta.descripcion}</p>
                  <button onClick={() => setShowAvistamientoModal(true)}>Comunicar Avistamiento</button>
                </>
              )}
            </div>
          )}
        </Modal>
        <Modal isOpen={showAvistamientoModal} onRequestClose={() => setShowAvistamientoModal(false)} className="modal-avistamiento">
          <h2>Favor comunicarse al siguiente número:</h2>
          <p>{celularDuenio}</p>
          <button onClick={() => setShowAvistamientoModal(false)}>Cerrar</button>
        </Modal>
      </main>
    </div>
  );
}

export default InterfazUser;
