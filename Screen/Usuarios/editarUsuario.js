import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { crearUsuarios, actualizarUsuarios } from "../../Src/Navegation/Service/UsuariosService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarUsuario() {
  const navigation = useNavigation();
  const route = useRoute();

  const usuario = route.params?.usuario;
  const { colors, texts, userRole } = useAppContext();

  const [Nombre, setNombre] = useState(usuario ? usuario.nombre || usuario.Nombre : "");
  const [Apellido, setApellido] = useState(usuario ? usuario.apellido || usuario.Apellido : "");
  const [Email, setCorreo] = useState(usuario ? usuario.Email || usuario.Correo : "");
  const [Telefono, setTelefono] = useState(usuario ? usuario.telefono || usuario.Telefono : "");
  const [Nacionalidad, setNacionalidad] = useState(usuario ? usuario.Nacionalidad || usuario.Nacionalidad : "");
  const [Foto_Perfil, setFotoPerfil] = useState(usuario ? usuario.Foto_Perfil || usuario.foto_perfil : "");
  const [Contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState(usuario ? String(usuario.rol || usuario.Rol) : "");
  const [Fecha_Registro, setFechaRegistro] = useState(usuario ? usuario.Fecha_Registro || usuario.Fecha_Registro : new Date().toISOString().split('T')[0]);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!usuario;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoPerfil(uri);
      await AsyncStorage.setItem('userPhoto', uri);
    }
  };

  useEffect(() => {
    // Comentado hasta que se implemente listarRoles
    // const cargarDatos = async () => {
    //   try {
    //     const rolesResult = await listarRoles();
    //     if (rolesResult.success) {
    //       setRoles(rolesResult.data);
    //     }
    //   } catch (error) {
    //     console.error("Error cargando roles:", error);
    //   }
    // };
    // cargarDatos();

    // Setear fecha de registro actual para nuevos usuarios
    if (!esEdicion) {
      const fechaActual = new Date().toISOString().split('T')[0];
      setFechaRegistro(fechaActual);
    }
  }, [esEdicion]);

  const handleGuardar = async () => {
    const camposRequeridos = [Nombre, Email, Telefono, Nacionalidad, Fecha_Registro];
    // La contraseña es requerida solo al crear
    if (!esEdicion) camposRequeridos.push(Contrasena);

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await actualizarUsuarios(usuario.id, {
          Nombre,
          Apellido,
          Email,
          Telefono,
          Nacionalidad,
        });
      } else {
        result = await crearUsuarios({
          Nombre,
          Apellido,
          Email,
          Telefono,
          Contrasena,
          Nacionalidad,
          Fecha_Registro,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Usuario actualizado" : "Usuario creado correctamente");
        if (esEdicion) {
          navigation.goBack({ updated: true });
        } else {
          navigation.goBack();
        }
      } else {
        Alert.alert(esEdicion ? "Error al editar el usuario" : "Error al crear el usuario", JSON.stringify(result.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{esEdicion ? "Editar " : "Crear Nuevo Usuario"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={Nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={Apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={Email}
              onChangeText={setCorreo}
              keyboardType="email-address"
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
              placeholder="Nacionalidad"
              value={Nacionalidad}
              onChangeText={setNacionalidad}
            />
            <TouchableOpacity style={styles.input} onPress={pickImage}>
              <Text style={{ color: Foto_Perfil ? '#000' : '#999' }}>
                {Foto_Perfil ? 'Imagen seleccionada' : 'Seleccionar Foto de Perfil'}
              </Text>
            </TouchableOpacity>
            {Foto_Perfil && (
              <Image source={{ uri: Foto_Perfil }} style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 10, borderRadius: 150 }} />
            )}
            <TextInput
              style={styles.input}
              placeholder="Fecha de Registro"
              value={Fecha_Registro}
              onChangeText={setFechaRegistro}
              editable={false}
            />

            {!esEdicion && (
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={Contrasena}
                onChangeText={setContrasena}
                secureTextEntry
              />
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Ionicons name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>Guardar Usuario</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e1f5fe",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1f5fe",
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingTop: 10, // Para notch
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: "serif",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    transform: [{ translateY: -2 }],
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#e1f5fe",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 60,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    transform: [{ translateY: -5 }],
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "serif",
    textShadowColor: "rgba(0, 123, 255, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    transform: [{ translateY: -2 }],
  },
});

