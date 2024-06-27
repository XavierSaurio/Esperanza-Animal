import React, { useState } from 'react';
import imgPr from '../Imagenes/espacio.png'
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import { useNavigate } from 'react-router-dom';

function NavBarRegistro() {
  const [active, setActive] = useState('Registar Mascota');
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item === 'Home') {
      navigate('/login/menu'); // Reemplaza '/home' con la ruta a la que quieres navegar
    } else {
      setActive(item);
    }
  };

  return (
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
  );

};

export default NavBarRegistro;

