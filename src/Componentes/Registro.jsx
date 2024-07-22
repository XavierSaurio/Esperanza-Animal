import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import registro from '../Imagenes/registro.png';
import usuario from '../Imagenes/icono_usuario.png';

function Registro() {
    const navigate = useNavigate();
    // usando db.json-------------------
    /*
    const url = "http://localhost:5000/login/";

    const [login, setLogin] = useState({
        nombre: "",
        email: "",
        password: "",
        celular: "",
        provincia: "",
        canton: "",
        parroquia: "",
    });

    const manejadorInput = (event) => {
        const { name, value } = event.target;
        setLogin(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const manejadorSubmit = async (e) => {
        e.preventDefault();
        console.log(login); // Verificar el contenido del objeto login
        try {
            const res = await axios.post(url, login, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.status === 201 || res.status === 200) {
                console.log('Datos enviados con éxito');
                navigate('/login');
            } else {
                console.error('Error al enviar datos');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };*/

    //Usando mySQL-----
    const PETICIONPOST = "http://localhost:5000/usuarios/new"
    const [login, setLogin] = useState({
        nombre: "",
        email: "",
        password: "",
        celular: "",
        provincia: "",
        canton: "",
        parroquia: "",
        fotoPerfil: null
    });

    //const [fotoPerfil, setfotoPerfil] = useState(null);

    const selectedImage = (e) =>{

        //setfotoPerfil(e.target.files[0])
        setLogin(prevState => ({
            ...prevState,
            fotoPerfil: e.target.files[0]
        }));
    }

    /*const sendImage = (e) =>{
        e.preventDefault();
        if(!fotoPerfil){
            alert("No se ha seleccionado una imagen")
            return
        }

        const formdata = new FormData()
        formdata.append("fotoPerfil", fotoPerfil)

        fetch(PETICIONPOST, {
            method: "POST",
            body: formdata
        })

        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))

        setfotoPerfil(null)

        

    }*/

    const manejadorInput = (event) => {
        const { name, value } = event.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const manejadorSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(login).forEach(key => {
            formData.append(key, login[key]);
            
        });

        try {
            const res = await axios.post(PETICIONPOST, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201 || res.status === 200) {
                console.log('Datos enviados con éxito');
                navigate('/login');
            } else {
                console.error('Error al enviar datos');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            console.log(error)
        } 
    };


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                style={{ backgroundColor: '#754a36' }}
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${registro})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#754a36',
                    backgroundSize: '800px',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} elevation={6} square style={{ backgroundColor: '#efe7dd' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" color="#754a36" sx={{ textAlign: 'center' }}>
                        ¡Se parte de Nosotros!
                    </Typography>
                    <Typography variant="h5" color="#754a36" sx={{ textAlign: 'center', marginTop: '1rem' }}>
                        REGÍSTRATE Y APOYANOS
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={manejadorSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Ingrese su Nombre"
                            name="nombre"
                            autoComplete="nombre"
                            onChange={manejadorInput}
                            value={login.nombre}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Ingrese su Correo"
                            name="email"
                            autoComplete="email"
                            onChange={manejadorInput}
                            value={login.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Ingrese su contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={manejadorInput}
                            value={login.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="celular"
                            label="Ingrese su Número Celular"
                            name="celular"
                            type="number"
                            autoComplete="celular"
                            onChange={manejadorInput}
                            value={login.celular}
                        />
                        <TextField
                            select
                            margin="normal"
                            required
                            fullWidth
                            id="provincia"
                            label="Provincia"
                            name="provincia"
                            autoComplete="provincia"
                            onChange={manejadorInput}
                            value={login.provincia}
                        >
                            <MenuItem value="Pichincha">Pichincha</MenuItem>
                            <MenuItem value="Tungurahua">Tungurahua</MenuItem>
                        </TextField>
                        <TextField
                            select
                            margin="normal"
                            required
                            fullWidth
                            id="canton"
                            label="Cantón"
                            name="canton"
                            autoComplete="canton"
                            onChange={manejadorInput}
                            value={login.canton}
                        >
                            <MenuItem value="Quito">Quito</MenuItem>
                            <MenuItem value="Pillaro">Pillaro</MenuItem>
                        </TextField>
                        <TextField
                            select
                            margin="normal"
                            required
                            fullWidth
                            id="parroquia"
                            label="Parroquia"
                            name="parroquia"
                            autoComplete="parroquia"
                            onChange={manejadorInput}
                        >
                            <MenuItem value="Pusuqui">Pusuqui</MenuItem>
                            <MenuItem value="Urbina">Urbina</MenuItem>
                        </TextField>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#754a36", color: "white" }}
                        >
                            <Box
                                component="img"
                                src={usuario} // Reemplaza con la ruta de tu imagen
                                alt="icono de subir foto"
                                sx={{ width: 50, height: 50, mr: 1 }}
                            />
                            Foto de Perfil
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={selectedImage}
                            />
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#754a36", color: "white" }}
                            
                        >
                            REGISTRARSE
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Registro;
