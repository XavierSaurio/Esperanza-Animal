import React, { useState } from 'react';
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import { useNavigate } from 'react-router-dom';
import imgPresentacion from '../Imagenes/Img4.png'

function NavBar() {
  const [active, setActive] = useState('Mascotas en Abandono');
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
        {['Mascotas en Abandono', 'Registrar Mascota en Abandono', 'Brindar Ayuda a un Animal', 'Home'].map((item) => (
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

  );
};

export default NavBar;

