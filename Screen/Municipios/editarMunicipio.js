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
import { SafeAreaView } from "react-native-safe-area-context";

import { crearMunicipios, actualizarMunicipios } from "../../Src/Navegation/Service/MunicipiosService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarMunicipio() {
  const navigation = useNavigation();
  const route = useRoute();

  const municipio = route.params?.municipio;
  const { colors, texts, userRole } = useAppContext();

  const [Nombre_Municipio, setNombreMunicipio] = useState(municipio ? municipio.Nombre_Municipio || municipio.nombre_municipio : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!municipio;


  // Guardar o actualizar
  const handleGuardar = async () => {
    if (!Nombre_Municipio) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await actualizarMunicipios(municipio.id, {
          Nombre_Municipio,
        });
      } else {
        result = await crearMunicipios({
          Nombre_Municipio,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Municipio actualizado" : "Municipio creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el municipio");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el municipio");
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
            <Text style={styles.cardTitle}>{esEdicion ? "Editar Municipio" : "Crear Nuevo Municipio"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del Municipio"
              value={Nombre_Municipio}
              onChangeText={setNombreMunicipio}
            />


            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Ionicons name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>
                {esEdicion ? "Actualizar Municipio" : "Guardar Municipio"}
              </Text>
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  pickerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    padding: 8,
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
