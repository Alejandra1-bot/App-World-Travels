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

import { crearEmpresas, actualizarEmpresas } from "../../Src/Navegation/Service/EmpresaService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarEmpresa() {
  const navigation = useNavigation();
  const route = useRoute();

  const empresa = route.params?.empresa;
  const { colors, texts } = useAppContext();

  const [Nombre_Empresa, setNombreEmpresa] = useState(empresa ? empresa.nombre || "" : "");
  const [Email, setCorreo] = useState(empresa ? empresa.email || "" : "");
  const [Telefono, setTelefono] = useState(empresa ? empresa.telefono || "" : "");
  const [Direccion, setDireccion] = useState(empresa ? empresa.direccion || "" : "");
  const [NIT, setNit] = useState(empresa ? empresa.nit || "" : "");
  const [Ciudad, setCiudad] = useState(empresa ? empresa.ciudad || "" : "");
  const [Contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!empresa;

  const handleGuardar = async () => {
    const camposRequeridos = [Nombre_Empresa, Email, Telefono, Direccion, NIT, Ciudad];
    if (!esEdicion) camposRequeridos.push(Contrasena);

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await actualizarEmpresas(empresa.id, { nombre: Nombre_Empresa, email: Email, telefono: Telefono, direccion: Direccion, nit: NIT, ciudad: Ciudad });
      } else {
        result = await crearEmpresas({ nombre: Nombre_Empresa, email: Email, telefono: Telefono, direccion: Direccion, nit: NIT, contraseña: Contrasena, ciudad: Ciudad });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Empresa actualizada" : "Empresa creada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar la empresa");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la empresa");
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
            <Text style={styles.cardTitle}>{esEdicion ? "Editar Empresa" : "Crear Nueva Empresa"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre de la Empresa"
              value={Nombre_Empresa}
              onChangeText={setNombreEmpresa}
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
              placeholder="Dirección"
              value={Direccion}
              onChangeText={setDireccion}
            />
            <TextInput
              style={styles.input}
              placeholder="NIT"
              value={NIT}
              onChangeText={setNit}
            />
            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              value={Ciudad}
              onChangeText={setCiudad}
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
              <Text style={styles.saveButtonText}>Guardar Empresa</Text>
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