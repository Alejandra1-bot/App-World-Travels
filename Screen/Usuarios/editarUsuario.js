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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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
  const [Contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState(usuario ? String(usuario.rol || usuario.Rol) : "");
  const [Fecha_Registro, setFechaRegistro] = useState(usuario ? usuario.Fecha_Registro || usuario.Fecha_Registro : new Date().toISOString().split('T')[0]);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!usuario;

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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>
            {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
          </Text>

          {/* Formulario */}
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
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Usuario"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    marginTop: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 500,
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
