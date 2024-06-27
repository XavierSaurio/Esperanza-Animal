import React from "react";
import img2 from '../Imagenes/img2.webp';
import img3 from '../Imagenes/img3.webp';
import img4 from '../Imagenes/img4.webp';
import img6 from '../Imagenes/img6.webp';
import '../Estilos/estilos_portada2.css'

function Portada2() {
    return (
        <div>
            <div className="Servicios">
                <div className="A">
                    <h1>Nuestros servicios</h1>
                    <img className="img2" src={img2} alt="img" />
                </div>
                <div className="B">
                    <h2> <span className="n">01</span> REGISTRO DE MASCOTAS</h2>
                    <p> Registra tu mascota en nuestro sistema para crearle un perfil de presentación propio. </p>
                    <h2> <span className="n">02</span> ALERTA DE ABANDONO </h2>
                    <p>En caso de conocer animales en estado de abandono, crea un reporte y da a conocer el caso.</p>
                    <h2> <span className="n">03</span> ALERTA DE MALTRATO</h2>
                    <p>En caso de conocer o presenciar maltrato hacia animales, reporta este caso entre nuestra Comunidad para que se tomen medidas en contra de estas personas.</p>
                    <h2> <span className="n">04</span> BRINDAR APOYO</h2>
                    <p>Si deseas puedes llegar a dar apoyo a los diferentes animales que lo necesitan, dales un hogar o recursos para subsistir de una forma digna.</p>
                </div>
            </div>
            <div className="Usuarios">
                <div className="container">
                    <div className="nuestros-usuarios">
                        <h1> Nuestros Usuarios</h1>
                        <p>
                            Desde nuestros inicios, nuestro objetivo ha sido simple pero claro, brindar apoyo a los animales,
                            <br />
                            por esta misma razón es que la aplicación puede ser utilizada por cualquier tipo de usuario.
                        </p>
                    </div>

                    <div className="user-cards">
                        <div className="card">
                            <img className="img3" src={img3} alt="Dueños de una mascota" />
                            <p>DUEÑOS DE UNA <br />MASCOTA</p>
                        </div>
                        <div className="card">
                            <img className="img3" src={img4}alt="Personas con ganas de ayudar" />
                            <p>PERSONAS CON <br />GANAS DE AYUDAR</p>
                        </div>
                        <div className="card">
                            <img className="img3" src={img6} alt="Personas amantes de los animales" />
                            <p>PERSONAS AMANTES <br />DE LOS ANIMALES</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );


}

export default Portada2;