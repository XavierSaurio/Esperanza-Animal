import React from "react";
import '../Estilos/estilos_portada3.css'
import img5 from '../Imagenes/img5.webp'

function Portada3() {

    return (
        <div>
            <div className="respetar">
                <p>"Respetar a los animales es una <br />obligación, amarlos es un privilegio".</p>
            </div>
            <div className="Trabajemos">
                <div className='secundario'>
                    <h1 className='trabajemos'>Trabajemos juntos por su bienestar.</h1>
                    <img className="fotoPerro" src={img5} ></img>
                </div>
                <div className='secundario' id='sec2'>
                    <div className='Espacio'></div>
                    <div className='opcio3'>
                        <h3>DIRECCIÓN POSTAL</h3>
                        <p>Escuela Politécnica Nacional</p>
                        <h3>NÚMERO TELEFÓNICO</h3>
                        <p>(55) 1234567890</p>
                        <h3>DIRECCIÓN DE CORREO ELECTRONICO</h3>
                        <p>hola@sitioincreible.mx</p>
                    </div>

                </div>
            </div>

        </div>

    );


}

export default Portada3;