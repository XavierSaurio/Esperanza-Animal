import React from "react";
import { Card, CardMedia, Container, Typography, Grid, Box } from "@mui/material";
import menu1 from '../Imagenes/menu-opcion-1.webp'
import menu2 from '../Imagenes/menu-opcion-2.webp'
import menu3 from '../Imagenes/menu-opcion-3.webp'
import logo from '../Imagenes/logo.webp'
import usuario from '../Imagenes/icono_usuario.png'
import cerrar from '../Imagenes/icono_cerrar_sesion.png'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import db from '../db.json';

function Menu() {

  const navigate = useNavigate();

  const handleTuEspacio = () => {
    navigate(`/espacio/${usuario.id}`);
  };

  const handleAnimales = () => {
    navigate('/animales');
  };

  const cerrarSesion = () => {
    navigate('/login');
  };

  // ... RECUPERAR LA IMAGEN con db.json//
  /*const { id } = useParams();
  const persona = db.login.find((p) => p.id === id);

  // ...

  // recuperar la imagen
  const getBase64Image = () => {
    if (persona && persona.fotoPerfil) {
      return `${persona.fotoPerfil}`;
    }
    return null;
  };
  const dataURL = getBase64Image();*/

  //----- Recuperando Imagen de Usuario al Menu con MySQL----
  const PETICION_GET_USUARIO = "http://localhost:5000/usuarios/"
  const [usuario, setUsuario] = useState({
    nombre: null,
    fotoPerfil: null
  })
  const { id } = useParams();

  useEffect(() => {
    axios.get(PETICION_GET_USUARIO + id)
      .then(respuesta => {
        const userData = respuesta.data;
        setUsuario(userData);
      })
      .catch(err => console.log(err));
  }, [id]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Container maxWidth={true} sx={{ width: '100vw', background: 'radial-gradient(#be9f8d, #dfbba8, #ebddd1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  src={`http://localhost:5000${usuario.fotoPerfil}`}
                  alt="Foto"
                />
              <Typography sx={{ color: '#754a36', marginLeft: '0.5rem' }}>
                {usuario.nombre}
              </Typography>
            </div>
            <Typography
              sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
              <h1 style={{ color: '#754a36', textAlign: 'center' }}>Esperanza Animal</h1>
              <img style={{ width: '8.3%' }} src={logo} alt="tuespacio" />
              <p style={{ color: '#784d39', textDecoration: 'underline solid 2px', textAlign: 'center' }}>BIENVENIDO!!!</p>
              <p style={{ marginTop: '0rem', color: '#784d39', textDecoration: 'underline solid 2px', textAlign: 'center' }}>ELIGE UNA OPCIÓN</p>
            </Typography>
          </Grid>
          <Grid container sx={{ flex: '2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '1rem', margin: '0.5rem' }}>
            <Card sx={{ maxWidth: 235, margin: '0.8rem' }}>
              <Typography sx={{ color: '#754a36', textAlign: 'center', background: '#e1c1b0' }}>
                Tu Espacio
              </Typography>
              <CardMedia
                component="img"
                alt="green iguana"
                width="100%"
                image={menu1}
                onClick={handleTuEspacio}
                sx={{ cursor: 'pointer' }}
              />
            </Card>
            <Card sx={{ maxWidth: 235, margin: '0.8rem' }}>
              <Typography sx={{ color: '#754a36', textAlign: 'center', background: '#dcb29e' }}>
                Animales Necesitados
              </Typography>
              <CardMedia
                component="img"
                alt="green iguana"
                width="100%"
                image={menu2}
                onClick={handleAnimales}
                sx={{ cursor: 'pointer' }}
              />
            </Card>
            <Card sx={{ maxWidth: 235, margin: '0.8rem' }}>
              <Typography sx={{ color: '#754a36', textAlign: 'center', background: '#e0bfad' }}>
                Foro y Alertas
              </Typography>
              <CardMedia
                component="img"
                alt="green iguana"
                width="100%"
                image={menu3}
                sx={{ cursor: 'pointer' }}
              />
            </Card>
          </Grid>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginLeft: '1rem', marginTop: '0rem' }}>
            <img style={{ width: '6%', cursor: 'pointer' }} src={cerrar} alt="usuario" onClick={cerrarSesion} /> Cerrar Sesión
          </Grid>
          <p style={{ color: '#8f6b58' }}>@Eperanza Animal</p>
        </Container>
      </div>
    </div>


  );
}
export default Menu;