import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const Menu = ({navigation}) => {
    
  const [usuario, setUsuario] = useState({
    id:'',
    nombre: '',
    fotoPerfil: '',
  });
  const route = useRoute();
  const {id} = route.params || {}; // Obtén el id desde los parámetros de la ruta

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

  const PETICION_GET_USUARIO = `http://172.29.32.113:5000/usuarios/${id}`;

  const handleNavigate = () => {
    navigation.navigate('TuEspacio', { idEnvio: usuario.id });
  };

 
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.fotoPerfil}
          source={{ uri: `http://172.29.32.113:5000${usuario.fotoPerfil}` }}
        />
        <Text style={styles.nombre}>{usuario.nombre}</Text>
      </View>
      <Text style={styles.title}>Esperanza Animal</Text>
      <Image
        style={styles.logo}
        source={require('../Imagenes/logo.webp')}
      />
      <Text style={styles.welcome}>BIENVENIDO!!!</Text>
      <Text style={styles.chooseOption}>ELIGE UNA OPCIÓN</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.card} onPress={()=>{handleNavigate()}} >
          <Text style={styles.cardTitle}>Tu Espacio</Text>
          <Image
            style={styles.cardImage}
            source={require('../Imagenes/menu-opcion-1.webp')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} >
          <Text style={styles.cardTitle}>Animales Necesitados</Text>
          <Image
            style={styles.cardImage}
            source={require('../Imagenes/menu-opcion-2.webp')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Foro y Alertas</Text>
          <Image
            style={styles.cardImage}
            source={require('../Imagenes/menu-opcion-3.webp')}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Menu')}>
        <Image
          style={styles.logoutIcon}
          source={require('../Imagenes/icono_cerrar_sesion.png')}
        />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>@Eperanza Animal</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#efe7dd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nombre: {
    fontSize: 18,
    color: '#754a36',
  },
  title: {
    fontSize: 24,
    color: '#754a36',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: '40%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    color: '#784d39',
    textAlign: 'center',
    marginBottom: 5,
  },
  chooseOption: {
    fontSize: 18,
    color: '#784d39',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    width: 100,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#754a36',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#e1c1b0',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#754a36',
  },
  footer: {
    fontSize: 14,
    color: '#8f6b58',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Menu;
