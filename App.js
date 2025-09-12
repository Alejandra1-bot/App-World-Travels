import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import AppNavegacion from './Src/Navegation/AppNavegacion';
// import Inicio from './Screen/Inicio/inicio';
import AppNavegacion from './Src/Navegation/AppNavegacion';

export default function App() {
  return (
   <>
      <StatusBar style="auto" />
      <AppNavegacion/>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2647',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
  },


});
