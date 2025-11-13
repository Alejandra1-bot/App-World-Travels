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

import { crearCategorias, actualizarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarCategoria_Actividad() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoria = route.params?.categoria;
  const { colors } = useAppContext();

  const [nombre, setNombre] = useState(categoria ? categoria.Nombre_Categoria || categoria.nombre || categoria.Nombre : "");
  const [descripcion, setDescripcion] = useState(categoria ? categoria.Descripcion || categoria.descripcion : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!categoria;

  const handleGuardar = async () => {
    if (!nombre || !descripcion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await actualizarCategorias(categoria.id, { Nombre_Categoria: nombre, Descripcion: descripcion });
      } else {
        result = await crearCategorias({ Nombre_Categoria: nombre, Descripcion: descripcion });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Categoría actualizada" : "Categoría creada correctamente");
        navigation.goBack();
      } else {
        Alert.alert(
          esEdicion ? "Error al editar la categoría" : "Error al crear la categoría",
          JSON.stringify(result.message)
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la categoría");
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
            <Text style={styles.cardTitle}>{esEdicion ? "Editar Categoría" : "Crear Nueva Categoría"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre de la Categoría"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Ionicons name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>
                {esEdicion ? "Guardar Cambios" : "Crear Categoría"}
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
