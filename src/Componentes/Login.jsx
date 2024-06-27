import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import login from '../Imagenes/img_mascotas_3.webp'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Login(props) {

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login/menu');
    };

    const handleSignUp = () => {
        navigate('/registrarse');
    };
//-------------------------------------------------------------------------------------
const url = "http://localhost:5000/login/";
const [listaLogs, setlistaLogs] = useState([]);

useEffect(() => {
    axios.get(url)
      .then(response => {
          setlistaLogs(response.data);
      }).catch(err=>{ 
          console.log(err);
      })

  }, []);

    
    const [capturarCorreo, setcapturarCorreo]=useState("");
    const [capturarContraseña, setcampturarContraseña]=useState("");
    let encontrado = false;

    const comparar = () => {
        listaLogs.forEach((log) => {
            if (log.password === capturarContraseña && log.email === capturarCorreo) {
                navigate('/login/menu');
                encontrado=true;
            } 
            
        });
        if (encontrado==false) {
            alert("El correo y/o la contraseña ingresadas no estan asociados a ninguna cuenta");
            }
    };

//-------------------------------------------------------------------------------------
    return (


        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid style={{ backgroundColor: '#754a36' }}
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${login})`,
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
                        alignItems: 'center'
                    }}
                >

                    <Typography variant="h3"
                        color="#754a36">
                        Login
                    </Typography>
                    <Typography variant="h5"
                        color="#754a36">
                        INICIA SESIÓN PARA CONTINUAR
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Ingrese su correo electrónico "
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setcapturarCorreo(e.target.value)}
                            autoFocus
                            
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
                            onChange={(e) => setcampturarContraseña(e.target.value)}
                            />
                        <FormControlLabel
                            control={<Checkbox value="remember" />}
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#754a36",
                                color: "white"
                            }}
                            onClick={comparar}
                        >
                            INICIA SESIÓN
                        </Button>
                        <Grid container>
                            <Typography
                                id="compareButton"
                                variant="body1"
                                onClick={handleSignUp}
                                sx={{ cursor: 'pointer', color: '#754a36', textAlign:'center' }} 
                            >
                                No tienes una Cuenta !!! Regístrate Ahora !!!
                            </Typography>


                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>


    );

}

export default Login;