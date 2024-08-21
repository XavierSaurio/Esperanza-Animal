import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

// Imágenes locales
import editar from '../Imagenes/ico-editar.svg'; // Usa PNG para React Native en lugar de SVG
import mas from '../Imagenes/icono-mas.png';
import logo from '../Imagenes/logo.webp';
import imgPr from '../Imagenes/espacio.png';

function TuEspacio({navigation}) {
  const route = useRoute();
  const {idEnvio} = route.params || {}; 
  const [usuario, setUsuario] = useState({
    id:'',
    nombre: '',
    fotoPerfil: '',
  });
  // Obtén el id desde los parámetros de la ruta
  useEffect(() => {
    const fetchUsuario = async () => {
        try {
            const response = await axios.get(PETICION_GET_USUARIO);
            setUsuario(response.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener el usuario');
        }
    };

    fetchUsuario();
}, []);

  const PETICION_GET_USUARIO = `http://172.29.32.113:5000/usuarios/${idEnvio}`;
//capturar tengo todos los datos de mi usuario -------------------------------------------------------


  // const route2 = useRoute();
  // const { id } = route.params; // Obtiene el ID del parámetro de la ruta

  // const [nombre, setNombre] = useState('');
  // const [imagenId, setImagenId] = useState('');
    const [mascotas, setMascotas] = useState([]);
     const [active, setActive] = useState('Registrar Mascota');

    useEffect(() => {
        axios.get('http://172.29.32.113:5000/mascota')
        .then(response=>{
            console.log(response.data);
            setMascotas(response.data);
        }).catch(err=>{
            console.log(err);
        })
    }, []);
    // filtrar solo las mascotas de mi usuario
    const filteredMascotas = mascotas.filter((mascota) => mascota.id_duenio === id);



  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userSection}>
        
          <Text style={styles.userName}>{usuario.nombre}</Text>
        </View>
        <Text style={styles.title}>ESPERANZA ANIMAL</Text>
        <Image source={logo} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.navbar}>
          {['Tus Mascotas', 'Registrar Mascota', 'Editar Información', 'Home'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.navButton, active === item && styles.activeButton]}
              onPress={() => {
                if (item === 'Home') {
                  navigation.navigate('Home')
                } else {
                  setActive(item);
                }
              }}
            >
              <Text style={styles.navButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Image source={imgPr} style={styles.presentacionImg} />
        <View style={styles.mascotasContainer}>
          {filteredMascotas.map((mascota) => (
            <View key={mascota.id} style={styles.mascotaContainer}>
              <Image source={{ uri: mascota.fotoMascota }} style={styles.imagenMascota} />
              <View style={styles.infoMascota}>
                <TouchableOpacity >
                  <Image source={editar} style={styles.editarIcon} />
                </TouchableOpacity>
                <Text style={styles.mascotaNombre}>{mascota.nombre}</Text>
                <Text style={styles.mascotaInfo}>Sexo: {mascota.sexo}</Text>
                <Text style={styles.mascotaInfo}>Color: {mascota.color}</Text>
                <Text style={styles.mascotaInfo}>Altura: {mascota.tamaño}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity >
            <Image source={mas} style={styles.masIcon} />
          </TouchableOpacity>
          <Text style={styles.footerText}>Agregar</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8e2',
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  navbar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  navButton: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: '#dcb29e',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#754a36',
  },
  navButtonText: {
    color: '#fff',
  },
  presentacionImg: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  mascotasContainer: {
    width: '100%',
  },
  mascotaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imagenMascota: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoMascota: {
    flex: 1,
  },
  editarIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mascotaInfo: {
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  masIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  footerText: {
    fontSize: 18,
  },
});

export default TuEspacio;
