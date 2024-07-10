import React, { useState } from "react";
import imgMascota1 from '../Imagenes/img-mascota-1.webp';
import imgMascota2 from '../Imagenes/img-mascota-2.webp';
import imgMascota3 from '../Imagenes/img-mascota-3.webp';
import imgMascota4 from '../Imagenes/img-mascota-4.webp';
import editar from '../assets/ico-editar.svg'
import mas from '../assets/icono-mas.png'
import logo from '../assets/logo.webp'
import { useNavigate } from "react-router-dom";
// import '../Estilos/InterfazUser.css'
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
///
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
// import logoo from '../Imagenes/logo.webp'
import imgPr from '../Imagenes/espacio.png'


function TuEspacio() {
    
    const navigate = useNavigate();

    const handleReportar = () => {
        navigate(`/espacio/agregar/${id}`);
    };
    const handleVisualizar = () => {
        navigate('/espacio/editar');
    };
    // navbar
    const [active, setActive] = useState('Registar Mascota');
    const handleClick = (item) => {
        if (item === 'Home') {
            navigate('/login/menu'); // Reemplaza '/home' con la ruta a la que quieres navegar
        } else {
            setActive(item);
        }
    };
    
    const { id } = useParams();
    const [nombre, setNombre] = useState('');

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


    //---------------------------------
    //Capturar los datos de la mascota 
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/mascotas');
                setMascotas(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMascotas();
    }, []);
    // filtrar solo las mascotas de mi usuario
    const filteredMascotas = mascotas.filter((mascota) => mascota.id_duenio === id);
    
    


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
            <div className="Animales">
                <div className="Animal">
                    <img src={imgMascota1} alt="Mascota 1" className="ImagenMascota" />
                    <div className="InfoMascota">
                        <h2 className="informacion"><img src={editar} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Poncho</h3>
                        <span style={{ color: 'black' }}>Sexo: Macho</span>
                        <span style={{ color: 'black' }}>Color: Marron</span>
                        <span style={{ color: 'black' }}>Altura: 2 años</span>
                    </div>
                </div>
                <div className="Animal">
                    <img src={imgMascota2} alt="Mascota 1" className="ImagenMascota" />
                    <div className="InfoMascota">
                        <h2 className="informacion"><img src={editar} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Colon</h3>
                        <span style={{ color: 'black' }}>Sexo: Hembra</span>
                        <span style={{ color: 'black' }}>Color: Gris</span>
                        <span style={{ color: 'black' }}>Altura: 0.60 m</span>
                    </div>
                </div>
                <div className="Animal">
                    <img src={imgMascota3} alt="Mascota 1" className="ImagenMascota" />
                    <div className="InfoMascota">
                        <h2 className="informacion"><img src={editar} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Goofy</h3>
                        <span style={{ color: 'black' }}>Sexo: Macho</span>
                        <span style={{ color: 'black' }}>Color: Blanco</span>
                        <span style={{ color: 'black' }}>Altura: 1 m</span>

                    </div>
                </div>
                <div className="Animal">
                    <img src={imgMascota4} alt="Mascota 1" className="ImagenMascota" />
                    <div className="InfoMascota">
                        <h2 className="informacion"><img src={editar} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                        <h3>Nala</h3>
                        <span style={{ color: 'black' }}>Sexo: Hembra</span>
                        <span style={{ color: 'black' }}>Color: Marrón</span>
                        <span style={{ color: 'black' }}>Altura: 0.80 m</span>
                    </div>
                </div>
                <div className="Animal">
                    <div className="InfoMascota">
                        <div className="Mas">
                            <a ><img style={{ cursor: 'pointer' }} onClick={handleReportar} src={mas} alt="Mascota 1" className="mas" /></a>

                        </div>
                        <h2 className="informacion">Agregar Mascota </h2>
                    </div>
                </div>
            </div>
           
        {/* {mascotas.map((mascota) => (
            <div className="Animal" key={mascota.id}>
                <img src={mascota.imagen} alt={mascota.nombre} className="ImagenMascota" />
                <div className="InfoMascota">
                    <h2 className="informacion"><img src={editar} alt="ojo" className="Ojo" onClick={handleVisualizar} /></h2>
                    <h3>{mascota.nombre}</h3>
                    <span style={{ color: 'black' }}>Sexo: {mascota.sexo}</span>
                    <span style={{ color: 'black' }}>Color: {mascota.color}</span>
                    <span style={{ color: 'black' }}>Altura: {mascota.altura}</span>
                </div>
            </div>
        ))} */}



        </div>
    );
}

export default TuEspacio;