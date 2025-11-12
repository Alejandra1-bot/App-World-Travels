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
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "../Configuracion/AppContext";

export default function EditarAdministrador() {
  const navigation = useNavigation();
  const route = useRoute();

  const administrador = route.params?.administrador;
  const { colors, texts } = useAppContext();

  const [Nombre, setNombre] = useState(administrador ? administrador.nombre || administrador.Nombre : "");
  const [Apellido, setApellido] = useState(administrador ? administrador.apellido || administrador.Apellido : "");
  const [Email, setCorreo] = useState(administrador ? administrador.Email || administrador.email : "");
  const [Telefono, setTelefono] = useState(administrador ? administrador.telefono || administrador.Telefono : "");
  const [Contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!administrador;

  const handleGuardar = async () => {
    const camposRequeridos = [Nombre, Apellido, Email, Telefono];
    if (!esEdicion) camposRequeridos.push(Contrasena);

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        // TODO: implement actualizarAdministrador
        // result = await actualizarAdministrador(administrador.id, { Nombre, Apellido, Email, Telefono });
        Alert.alert("Info", "Función de actualización no implementada aún");
      } else {
        // TODO: implement crearAdministrador
        // result = await crearAdministrador({ Nombre, Apellido, Email, Telefono, Contrasena });
        Alert.alert("Info", "Función de creación no implementada aún");
      }

      // if (result.success) {
      //   Alert.alert("Éxito", esEdicion ? "Administrador actualizado" : "Administrador creado correctamente");
      //   navigation.goBack();
      // } else {
      //   Alert.alert("Error", result.message || "No se pudo guardar el administrador");
      // }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el administrador");
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
            <Text style={styles.cardTitle}>{esEdicion ? "Editar Administrador" : "Crear Nuevo Administrador"}</Text>

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
              <Text style={styles.saveButtonText}>Guardar Administrador</Text>
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