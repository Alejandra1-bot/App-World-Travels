import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import BottonComponent from '../../Components/BottonComponents';
import { registerUser } from '../../Src/Navegation/Service/AuthService';

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [rol, setRol] = useState('usuario');
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    if (!nombre || !apellido || !email || !password) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    setLoading(true);
    const userData = {
      nombre,
      apellido,
      email,
      telefono,
      password,
      nacionalidad,
      fechaRegistro,
      roles: rol
    };
    const result = await registerUser(userData);
    setLoading(false);
    if (result.success) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigation.navigate('Login');
    } else {
      alert('Error en el registro: ' + result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        

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
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChangeText={setNacionalidad}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder=" Fecha de registro (YYYY-MM-DD)"
          value={fechaRegistro}
          onChangeText={setFechaRegistro}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Rol (usuario, paciente, medico, administrador)"
          value={rol}
          onChangeText={setRol}
          editable={!loading}
        />

        {/* Botones */}
        <BottonComponent title={loading ? "Registrando..." : "Registrarse"} onPress={handleRegistro} />

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
