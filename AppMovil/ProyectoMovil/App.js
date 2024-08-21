import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Portada from './Componentes/Portada';
import Registro from './Componentes/Registro';
import Login  from './Componentes/Login';
import Menu from './Componentes/Menu';
import TuEspacio from './Componentes/TuEspacio';
const Tab = createNativeStackNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Portada} /> 
        <Stack.Screen name="Registro" component={Registro} /> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="TuEspacio" component={TuEspacio} />

      </Stack.Navigator>
    </NavigationContainer>


  );
}


