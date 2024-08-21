import React, { useState } from "react";
<<<<<<< HEAD
import editar from '../Imagenes/cerrar.png'
import mas from '../Imagenes/icono-mas.png'
import logo from '../Imagenes/logo.webp'
=======
import mas from '../assets/icono-mas.png'
import logo from '../assets/logo.webp'
>>>>>>> a5f37adf2b46ae35241a2601df15d1ab1da1f06e
import { useNavigate } from "react-router-dom";
// import '../Estilos/InterfazUser.css'
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
///
<<<<<<< HEAD

=======
import '../Estilos/StyleUI4.css'
import '../Estilos/StyleInformacion.css'
import '../Estilos/StyleRegistrar.css'
import '../Estilos/InterfazUser.css'
>>>>>>> a5f37adf2b46ae35241a2601df15d1ab1da1f06e
// import logoo from '../Imagenes/logo.webp'
import imgPr from '../Imagenes/espacio.png'
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


function TuEspacio() {

    const navigate = useNavigate();

    const handleReportar = () => {
        navigate(`/espacio/agregar/${usuario.id}`);
    };
    const handleVisualizar = (id_mascota) => {
        navigate(`/espacio/editar/${usuario.id}/${id_mascota}`);
    };


    // Barra de Navegacion
    const [active, setActive] = useState('Registar Mascota');
    const handleClick = (item) => {
        if (item === 'Home') {
            navigate('/login/menu/11'); // Reemplaza '/home' con la ruta a la que quieres navegar
        } else {
            setActive(item);
        }
    };

    //Recuperar el Usuario
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

    //--------------------------------
    //Capturar los datos de la mascota 
    const [mascotas, setMascotas] = useState([]);
    const [filteredMascotas, setFilteredMascotas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/mascotas')
            .then(response => {
                console.log("Datos de mascotas recibidos:", response.data);
                setMascotas(response.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);
    // filtrar solo las mascotas de mi usuario
    useEffect(() => {
        console.log("Mascotas antes de filtrar:", mascotas);
        console.log("ID de usuario:", id);

        // Filtrar solo las mascotas que pertenecen al usuario actual
        const filteredMascotas = mascotas.filter((mascota) => mascota.userId === parseInt(id));

        console.log("Mascotas filtradas:", filteredMascotas);
        setFilteredMascotas(filteredMascotas); // Asegúrate de guardar el resultado filtrado en un estado
    }, [mascotas, id]);



    return (
        <div className="Container">
            <header style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <div className="user-section">
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={`http://localhost:5000${usuario.fotoPerfil}`} alt="Imagen" style={{ borderRadius: '50%', width: '40px', height: '40px', marginLeft:'1rem' }} />
                        {usuario.nombre}
                    </p>
                </div>
                <h1 style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>ESPERANZA ANIMAL
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
                <img style={{width:'100%', height:'220px'}} src={imgPr} className='presentacionImg' alt="Imagen de Presentación" ></img>

            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="Animales">

                <div className="ScrollContainer" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                    {filteredMascotas.map((mascota) => (
                        <Card key={mascota.id} style={{ width: 300 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`http://localhost:5000${mascota.fotoMascotaUs}`}
                                alt={mascota.nombre}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {mascota.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sexo: {mascota.sexo}<br />
                                    Color: {mascota.color}<br />
                                    Altura: {mascota.tamano}
                                </Typography>
                                <IconButton onClick={() => handleVisualizar(mascota.id)}>
                                    <EditIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="Final">
                    <div className="InfoMascota">
                        <div className="Mas">
                            <img style={{ cursor: 'pointer' }} onClick={handleReportar} src={mas} alt="Mascota 1" className="mas" />
                        </div>
                        <div className="Mas">
                            <h2 >Agregar</h2>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default TuEspacio;