import React, { useState } from 'react';

import { Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

const Registro = () => {
    const [login, setLogin] = useState({
        nombre: '',
        email: '',
        password: '',
        celular: '',
        provincia: '',
        canton: '',
        parroquia: '',
        fotoPerfil: null,
      });
      const manejadorInput = (name, value) => {
        setLogin((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const manejadorSubmit = async () => {
        const formData = new FormData();
        Object.keys(login).forEach((key) => {
          formData.append(key, login[key]);
          
        });
        try {
            const res = await axios.post(PETICIONPOST, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if (res.status === 201 || res.status === 200) {
              console.log('Datos enviados con éxito');
              navigation.navigate('Login');
            } else {
              console.error('Error al enviar datos');
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¡Se parte de Nosotros!</Text>
      <Text style={styles.subtitle}>REGÍSTRATE Y APOYANOS</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su Nombre"
        value={login.nombre}
        onChangeText={(value) => manejadorInput('nombre', value)} // <-- Se debe pasar la función
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese su Correo"
        value={login.email}
        keyboardType="email-address"
        onChangeText={(value) => manejadorInput('email', value)} // <-- Se debe pasar la función
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        value={login.password}
        secureTextEntry
        onChangeText={(value) => manejadorInput('password', value)} // <-- Se debe pasar la función
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese su Número Celular"
        value={login.celular}
        keyboardType="numeric"
        onChangeText={(value) => manejadorInput('celular', value)} // <-- Se debe pasar la función
      />

        {/* Select for Provincia */}
      <Text style={styles.label}>Provincia</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => manejadorInput('provincia', 'Pichincha')}
      >
        <Text style={styles.optionText}>Pichincha</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => manejadorInput('provincia', 'Tungurahua')}
      >
        <Text style={styles.optionText}>Tungurahua</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => manejadorInput('canton', 'Pillaro')}
      >
        <Text style={styles.optionText}>Pillaro</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Parroquia</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => manejadorInput('parroquia', 'Pusuqui')}
      >
        <Text style={styles.optionText}>Pusuqui</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => manejadorInput('parroquia', 'Urbina')}
      >
        <Text style={styles.optionText}>Urbina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageButton} onPress={() => selectedImage()}>
        <Image source={require('../Imagenes/icono_usuario.png')} style={styles.image} />
        <Text style={styles.imageText}>Foto de Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={manejadorSubmit}>
        <Text style={styles.registerText}>REGISTRARSE</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#efe7dd',
    alignItems: 'center',
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
    width: '100%',
    height: 40,
    borderColor: '#754a36',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  imageText: {
    color: '#754a36',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#754a36',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Registro;
