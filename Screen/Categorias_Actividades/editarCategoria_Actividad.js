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

import { crearCategorias, actualizarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarCategoria_Actividad() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoria = route.params?.categoria;
  const { colors } = useAppContext();

  const [nombre, setNombre] = useState(categoria ? categoria.nombre || categoria.Nombre : "");
  const [descripcion, setDescripcion] = useState(categoria ? categoria.descripcion || categoria.Descripcion : "");
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
        result = await actualizarCategorias(categoria.id, { nombre, descripcion });
      } else {
        result = await crearCategorias({ nombre, descripcion });
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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>
            {esEdicion ? "Editar Categoría" : "Nueva Categoría"}
          </Text>

          {/* Formulario */}
          <TextInput
            style={styles.input}
            placeholder="Nombre de la Categoría"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Categoría"}
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
});
