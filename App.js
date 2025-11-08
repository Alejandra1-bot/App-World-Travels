import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppProvider } from './Screen/Configuracion/AppContext';
import AppNavegacion from './Src/Navegation/AppNavegacion';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <AppNavegacion/>
    </AppProvider>
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
