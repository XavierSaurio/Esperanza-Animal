import React, { useState } from "react";
import imgMascota1 from '../Imagenes/img-mascota-1.webp';
import imgMascota2 from '../Imagenes/img-mascota-2.webp';
import imgMascota3 from '../Imagenes/img-mascota-3.webp';
import imgMascota4 from '../Imagenes/img-mascota-4.webp';
import animalesR from '../assets/animalesR.jpg'
import user from '../assets/icono-usuario.svg'
import lupa from '../assets/icono-lupa.svg'
import editar from '../assets/ico-editar.svg'
import mas from '../assets/icono-mas.png'
import logo from '../assets/logo.webp'
import { useNavigate } from "react-router-dom";
// import '../Estilos/InterfazUser.css'
import { colors } from "@mui/material";
import axios from "axios";
///
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg';
import imagen from '../Imagenes/icono2.jpg';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
// import logoo from '../Imagenes/logo.webp'
import imgPr from '../Imagenes/espacio.png'


function TuEspacio() {

    const navigate = useNavigate();
    const url = "http://localhost:5000/mascota/";

    const handleReportar = () => {
        navigate('/espacio/agregar');
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

    return (
        <div className="Container">
            <header>
                <div className="user-section">
                    <p><IconoSVG className="icon" />Usuario</p>
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
        </div>


    );
}

export default TuEspacio;