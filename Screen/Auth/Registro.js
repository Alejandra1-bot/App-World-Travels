import { useState } from 'react';
import { loginUser, registerUser } from '../../Src/Services/AuthService';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottonComponent from '../../Components/BottonComponents';

export default function Registro({ navigation }) {
  const [Nombre, setName] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Nacionalidad, setNacionalidad] = useState('');
  const [Fecha_Registro, setFecha_Registro] = useState('');
 
  const [roles, setRol] = useState('');
  const [loading, setLoading] = useState(false);

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

  const requiredFields = roles === 'Empresa'
    ? [Nombre, Apellido, Documento, Telefono, Email, password, roles] // flata por completar en el laravel y en base de datos 
    : [Nombre, Apellido, Documento, Telefono, Email, Fecha_Registro,  , Nacionalidad, password, roles];

  if (requiredFields.some(field => !field)) {
    Alert.alert("Error", "Por favor, completa todos los campos requeridos, incluyendo el rol.");
    return;
  }
  if (roles === 'medico' && (!idConsultorio || !idEspecialidad)) {
    Alert.alert("Error", "Para médicos, completa ID Consultorio e ID Especialidad.");  // falta por modificar 
    return;
  }
  setLoading(true);
  const userData = {
    Nombre,
    Apellido,
    Documento,
    Telefono,
    Email,
    ...((roles !== 'Empresa') && {
      Fecha_nacimiento,
      Genero,
      RH,
      Nacionalidad, // falta por modificar 
    }),
    password,
    roles,
    ...(roles === 'medico' && { idConsultorio, idEspecialidad }),
    ...(roles === 'recepcionista' && { Turno }),  // falta por modificar 
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
        <Text style={styles.title}>🌍 Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Regístrate en <Text style={styles.appName}>WORLD TRAVELS</Text> Distruta viajar con nosotros seguros y vvir una experiencia involvidable.
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
        <TextInput
              style={styles.input}
              placeholder="Nacionalidad"
              value={Nacionalidad}
              onChangeText={setNacionalidad}
            />



        <TextInput
          style={styles.input}
          placeholder=" Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {roles === 'recepcionista' && (
          <TextInput
            style={styles.input}
            placeholder="Turno"
            value={Turno}
            onChangeText={setTurno}
          />
        )}

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={roles}
            onValueChange={(itemValue) => setRol(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un rol" value="" />
            <Picker.Item label="Usuario" value="Usuario" />
            <Picker.Item label="Empresa" value="Empresa" />
            
          </Picker>
        </View>

       
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
