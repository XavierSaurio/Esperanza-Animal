import React from 'react';
import { ReactComponent as IconoSVG } from '../icons/icono-usuario.svg'; 
import imagen from '../Imagenes/icono2.jpg';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import logo from '../Imagenes/logo.webp'


function HeaderEspacio () {
  return (
    <div>
        <header>
            <div className="user-section">
                <p><IconoSVG className="icon" />Usuario</p>
            </div>
            <h1>ESPERANZA ANIMAL 
                <img src={logo} className='esperanzaImg' alt="Imagen de Esperanza Animal"/>
            </h1>
    </header>
    <hr />
    </div>
  );
};

export default HeaderEspacio;


