import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import img2 from '../Imagenes/img2.webp';
import img3 from '../Imagenes/img3.webp';
import img4 from '../Imagenes/img4.webp';
import img6 from '../Imagenes/img6.webp';
const Portada = ({navigation}) => {

  
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={require('../Imagenes/Portada_Fondo.webp')} style={styles.portada}>
                <View style={styles.portadaTexto}>
                    <Text style={styles.heading}>Un camino hacia</Text>
                    <Text style={styles.heading}>el bienestar</Text>
                    <Text style={styles.heading}>animal</Text>
                    <Text style={styles.subheading}>Responsabilidad. Compromiso. Valor</Text>
                </View>
            </ImageBackground>

            <View style={styles.esperanza}>
                <Image source={require('../Imagenes/img1.webp')} style={styles.imagenInicio} />
                <View style={styles.esperanzaAnimal}>
                    <View style={styles.esperanzaLogo}>
                        <Text style={styles.logoText}>Esperanza Animal</Text>
                        <Image source={require('../Imagenes/logo.webp')} style={styles.logo} />
                    </View>
                    <Text style={styles.paragraph}>
                        La finalidad de este sitio web es brindar ayuda y apoyo, ya sea para aquellas mascotas con hogar
                        que lleguen a extraviarse, o sufran de maltrato ya sea por parte de sus dueños o por otros
                        individuos, y para todos aquellos animales en estado de abandono que no tienen un hogar propio y
                        necesitan de la ayuda de la gente a tener una mejor vida.
                    </Text>
                    <Text style={styles.linkText}>Únete a nosotros</Text>
                    
                    
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Registro')}}>
                        <Text style={styles.buttonText}>Regístrate Ahora</Text>
                    </TouchableOpacity>
                    <Text style={styles.linkText}>Ya tienes cuenta, genial !!!</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={styles.buttonText}>Ingresa Ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

            


            <View style={styles.servicios2}>
        <View style={styles.sectionA2}>
          <Text style={styles.title2}>Nuestros servicios</Text>
          <Image source={img2} style={styles.img2} />
        </View>
        <View style={styles.sectionB2}>
          <Text style={styles.serviceTitle2}>01 REGISTRO DE MASCOTAS</Text>
          <Text style={styles.text2}>
            Registra tu mascota en nuestro sistema para crearle un perfil de
            presentación propio.
          </Text>
          <Text style={styles.serviceTitle2}>02 ALERTA DE ABANDONO</Text>
          <Text style={styles.text2}>
            En caso de conocer animales en estado de abandono, crea un reporte y
            da a conocer el caso.
          </Text>
          <Text style={styles.serviceTitle2}>03 ALERTA DE MALTRATO</Text>
          <Text style={styles.text2}>
            En caso de conocer o presenciar maltrato hacia animales, reporta
            este caso entre nuestra Comunidad para que se tomen medidas en
            contra de estas personas.
          </Text>
          <Text style={styles.serviceTitle2}>04 BRINDAR APOYO</Text>
          <Text style={styles.text2}>
            Si deseas puedes llegar a dar apoyo a los diferentes animales que lo
            necesitan, dales un hogar o recursos para subsistir de una forma
            digna.
          </Text>
        </View>
      </View>
      <View style={styles.usuarios2}>
        <Text style={styles.title2}>Nuestros Usuarios</Text>
        <Text style={styles.text2}>
          Desde nuestros inicios, nuestro objetivo ha sido simple pero claro,
          brindar apoyo a los animales, por esta misma razón es que la aplicación puede ser utilizada por cualquier tipo de usuario.
        </Text>
        <View style={styles.userCards2}>
          <View style={styles.card2}>
            <Image source={img3} style={styles.img3} />
            <Text style={styles.cardText2}>DUEÑOS DE UNA MASCOTA</Text>
          </View>
          <View style={styles.card2}>
            <Image source={img4} style={styles.img3} />
            <Text style={styles.cardText}>PERSONAS CON GANAS DE AYUDAR</Text>
          </View>
          <View style={styles.card2}>
            <Image source={img6} style={styles.img3} />
            <Text style={styles.cardText2}>PERSONAS AMANTES DE LOS ANIMALES</Text>
          </View>
        </View>
      </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Permite que el contenedor crezca y permita desplazamiento
    },
    portada: {
        width: '100%',
        height: 300, // Ajusta según el diseño que prefieras
        justifyContent: 'center',
        alignItems: 'center',
    },
    portadaTexto: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 0,
    },
    subheading: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
    },
    esperanza: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    imagenInicio: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    esperanzaAnimal: {
        padding: 30,
    },
    esperanzaLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 24,
        color: '#764b37',
        fontWeight: 'bold',
    },
    logo: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 20,
    },
    linkText: {
        color: '#b39a8c',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#764b37',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    container2: {
        flexGrow: 1,
        padding: 20,
      },
      servicios2: {
        marginBottom: 20,
      },
      sectionA2: {
        alignItems: 'center',
        marginBottom: 20,
      },
      title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      img2: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
      },
      sectionB2: {
        marginBottom: 20,
      },
      serviceTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      text2: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
      },
      usuarios2: {
        marginBottom: 20,
      },
      userCards2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      card2: {
        alignItems: 'center',
        width: '30%',
      },
      img3: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
      },
      cardText2: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 5,
      },
});

export default Portada;
