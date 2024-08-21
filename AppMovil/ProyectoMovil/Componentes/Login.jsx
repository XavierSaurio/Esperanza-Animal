import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {

  const [capCorreo, setCapCorreo] = useState('');
  const [capContraseña, setCapContraseña] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const PETICIONGET = 'http://172.29.32.113:5000/usuarios';

  useEffect(() => {
    axios.get(PETICIONGET)
      .then(response => {
        setListaUsuarios(response.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const ingresarUsuario = () => {
    let found = false;
    listaUsuarios.forEach((log) => {
      if (log.password === capContraseña && log.email === capCorreo) {
        navigation.navigate('Menu', { userId: log.id });
        found = true;
        handleNavigate(log)
      }
    });

    if (!found) {
      Alert.alert('Error', 'El correo y/o la contraseña ingresadas no están asociados a ninguna cuenta');
    }
  };

 
  const handleNavigate = (log) => {
    navigation.navigate('Menu', {
      id: log.id,
    });
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>INICIA SESIÓN PARA CONTINUAR</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo electrónico"
        value={capCorreo}
        onChangeText={setCapCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        value={capContraseña}
        onChangeText={setCapContraseña}
        secureTextEntry
      />

      <Button
        title="INICIA SESIÓN"
        color="#754a36"
        onPress={ingresarUsuario}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.signUpText}>
          No tienes una Cuenta? ¡Regístrate Ahora!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#efe7dd',
  },
  title: {
    fontSize: 28,
    color: '#754a36',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#754a36',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#754a36',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  signUpText: {
    color: '#754a36',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
