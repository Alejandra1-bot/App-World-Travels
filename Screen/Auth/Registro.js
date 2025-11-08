import { useState, useEffect } from 'react';
import { loginUser, registerUser } from '../../Src/Navegation/Service/AuthService';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { Picker } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import BottonComponent from '../../Components/BottonComponents';

export default function Registro({ navigation }) {
  const [Nombre, setName] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Email, setEmail] = useState('');
  const [Nacionalidad, setNacionalidad] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRol] = useState('usuario');
  const [NombreEmpresa, setNombreEmpresa] = useState('');
  const [DireccionEmpresa, setDireccionEmpresa] = useState('');
  const [TelefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  // No se necesitan datos adicionales para este formulario
const handleRegister = async () => {
  // Validación de contraseña
  if (password.length < 8) {
    Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  // Validación de email
  if (!Email.endsWith('@gmail.com')) {
    Alert.alert("Error", "El correo electrónico debe terminar con @gmail.com.");
    return;
  }

  // Validación de códigos de acceso para roles restringidos
  const validCodes = {
    administrador: 'ADMIN2025',
    empresa: 'EMPRESA2025'
  };

  if (roles === 'administrador' || roles === 'empresa') {
    if (!accessCode) {
      Alert.alert("Error", `Se requiere un código de acceso único para el rol de ${roles === 'administrador' ? 'Administrador' : 'Empresa'}.`);
      return;
    }
    if (accessCode !== validCodes[roles]) {
      Alert.alert("Error", `Código de acceso incorrecto para el rol de ${roles === 'administrador' ? 'Administrador' : 'Empresa'}.`);
      return;
    }
  }

  const requiredFields = roles === 'administrador'
    ? [Nombre, Apellido, Telefono, Email, password, roles]
    : roles === 'empresa'
    ? [NombreEmpresa, DireccionEmpresa, TelefonoEmpresa, Email, password, roles]
    : [Nombre, Apellido, Telefono, Email, Nacionalidad, password, roles];

  if (requiredFields.some(field => !field)) {
    Alert.alert("Error", "Por favor, completa todos los campos requeridos, incluyendo el rol.");
    return;
  }
  setLoading(true);
  const userData = {
    ...(roles === 'empresa' ? {
      NombreEmpresa,
      DireccionEmpresa,
      TelefonoEmpresa,
      Email,
      password,
      roles,
    } : {
      Nombre,
      Apellido,
      Telefono,
      Email,
      Nacionalidad,
      password,
      roles,
    }),
  };

  try {
    const result = await registerUser(userData);
    if (result.success) {
      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } else {
      let errorMessage =typeof result.message === "string"? result.message : result.message?.message || JSON.stringify(result.message);
      Alert.alert("Error", errorMessage || "Ocurrió un error en el registro");
    }
  } catch (error) {
    Alert.alert("Error", "Error inesperado en el registro");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView  //Contenedor que ajusta su comportamiento cuando aparece el teclado.
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
        <Text style={styles.title}>✈️ Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Regístrate en <Text style={styles.appName}>WorldTravels</Text> y descubre el mundo de los viajes 🗺️.
        </Text>

       
        <TextInput
          style={styles.input}
          placeholder=" Nombre"
          value={Nombre}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={Apellido}
          onChangeText={setApellido}
        />


        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={Email}
          onChangeText={setEmail}

          autoCapitalize="none"
        />

        {roles === 'usuario' && (
          <TextInput
            style={styles.input}
            placeholder="Nacionalidad"
            value={Nacionalidad}
            onChangeText={setNacionalidad}
          />
        )}

        {roles === 'empresa' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la Empresa"
              value={NombreEmpresa}
              onChangeText={setNombreEmpresa}
            />

            <TextInput
              style={styles.input}
              placeholder="Dirección de la Empresa"
              value={DireccionEmpresa}
              onChangeText={setDireccionEmpresa}
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono de la Empresa"
              value={TelefonoEmpresa}
              onChangeText={setTelefonoEmpresa}
              keyboardType="phone-pad"
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder=" Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />


        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={roles}
            onValueChange={(itemValue) => setRol(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Usuario" value="usuario" />
            <Picker.Item label="Empresa" value="empresa" />
            <Picker.Item label="Administrador" value="administrador" />
          </Picker>
        </View>

        {(roles === 'administrador' || roles === 'empresa') && (
          <TextInput
            style={styles.input}
            placeholder="Código de acceso"
            secureTextEntry
            value={accessCode}
            onChangeText={setAccessCode}
          />
        )}


        {/* Botones */}
        <BottonComponent title="Registrarse"  onPress={handleRegister} disabled={loading} />

        <BottonComponent
          title="¿Ya tienes cuenta? Inicia Sesión"
          onPress={() => navigation.navigate('Login')}
          style={{ backgroundColor: '#0A2647' }}
        />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cfd9e6',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 50,
  },
});
