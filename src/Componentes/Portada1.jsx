import React from "react";
import Portada_Fondo from '../Imagenes/Portada_Fondo.webp'
import '../Estilos/estilo_portada1.css'
import img1 from '../Imagenes/img1.webp'
import logo from '../Imagenes/logo.webp'
import { Button } from "@mui/material";
import { Link} from "react-router-dom";


function Portada1() {

    return (
        
        <div className="Portada">
            <div className="portada" style={{ backgroundImage: `url(${Portada_Fondo})` }}>
                <div className="portada_texto">
                    <h1 style={{ fontSize: '50px', margin: '0px' }}>Un camino hacia </h1>
                    <h1 style={{ fontSize: '50px', margin: '0px' }}>el bienestar</h1>
                    <h1 style={{ fontSize: '50px', margin: '0px' }}>animal</h1>
                    <p style={{ fontWeight: 'normal', marginTop: '2rem' }}>Responsabilidad. Compromiso. Valor</p>
                </div>
            </div>

            <div className="esperanza">
                <div className="ImagenInicio">
                    <img style={{ width: '100%' }} src={img1} alt="ImagenInicio" />
                </div>
                <div className="EsperanzaAnimal" style={{padding: '3rem'}}>
                    <div className="Esperanza_logo">
                        <div className="Logoprincp1">
                            <h2 style={{ color: '#764b37', fontWeight: 'bold' }}>Esperanza Animal</h2>
                        </div>
                        <div className="Logoprincp2">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="Esperanza_Texto">
                        <p style={{textAlign:'justify'}}>La finalidad de este sitio web es brindar ayuda y apoyo, ya sea para aquellas mascotas con hogar que lleguen a extraviarse, o sufran de maltrato ya sea por parte de sus dueños o por otros individuos, y para todos aquellos animales en estado de abandono que no tienen un hogar propio y necesitan de la ayuda de la gente a tener una mejor vida. </p>
                        <p style={{ color: '#b39a8c' }}>Únete a nosotros</p>
                        <Link to={"/registrarse"}><Button className="buton" variant="contained"  >
                        Regístrate Ahora
                        </Button></Link>
                        <p style={{ color: '#b39a8c' }} >Ya tienes cuenta, genial !!!</p>
                        <Link to={"/login"}><Button className="buton" variant="contained">Ingresa Ahora</Button></Link>
                    </div>
                    
                </div>


            </div>

        </div>

    );







}

export default Portada1;