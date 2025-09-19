import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import BottonComponent from '../../Components/BottonComponents';

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Imagen ilustrativa */}
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png' }}
          style={styles.image}
        />

        <Text style={styles.title}>Regístrate</Text>
        <Text style={styles.subtitle}>
          Únete a <Text style={styles.appName}>World Travels</Text> y empieza a planear tus aventuras.
        </Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChangeText={setNacionalidad}
        />

        <TextInput
          style={styles.input}
          placeholder=" Fecha de registro (YYYY-MM-DD)"
          value={fechaRegistro}
          onChangeText={setFechaRegistro}
        />

        {/* Botones */}
        <BottonComponent title="Registrarse" />

        <BottonComponent
          title="¿Ya tienes cuenta? Inicia Sesión"
          onPress={() => navigation.navigate('Login')}
          style={{ backgroundColor: '#0A2647' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF', // Fondo como en Login
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#003366',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  appName: {
    fontWeight: 'bold',
    color: '#0A74DA',
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#cfd9e6',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
