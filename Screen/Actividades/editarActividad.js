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

import { crearActividad, editarActividad } from "../../Src/Navegation/Service/ActividadService";
import { listarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarActividad() {
  const navigation = useNavigation();
  const route = useRoute();

  const actividad = route.params?.actividad;
  const { colors, texts, userRole } = useAppContext();

  const [nombre, setNombre] = useState(actividad ? actividad.nombre || actividad.Nombre : "");
  const [descripcion, setDescripcion] = useState(actividad ? actividad.descripcion || actividad.Descripcion : "");
  const [ubicacion, setUbicacion] = useState(actividad ? actividad.ubicacion || actividad.Ubicacion : "");
  const [precio, setPrecio] = useState(actividad ? String(actividad.precio || actividad.Precio) : "");
  const [fecha, setFecha] = useState(actividad ? actividad.fecha || actividad.Fecha : "");
  const [idCategoria, setIdCategoria] = useState(actividad ? String(actividad.idCategoria) : "");

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!actividad;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const categoriasResult = await listarCategorias();
        if (categoriasResult.success) {
          setCategorias(categoriasResult.data);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    const camposRequeridos = [nombre, descripcion, ubicacion, precio, fecha, idCategoria];

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarActividad(actividad.id, {
          nombre,
          descripcion,
          ubicacion,
          precio,
          fecha,
          idCategoria,
        });
      } else {
        result = await crearActividad({
          nombre,
          descripcion,
          ubicacion,
          precio,
          fecha,
          idCategoria,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Actividad actualizada" : "Actividad creada correctamente");
        if (esEdicion) {
          navigation.goBack({ updated: true });
        } else {
          navigation.goBack();
        }
      } else {
        Alert.alert(esEdicion ? "Error al editar la actividad" : "Error al crear la actividad", JSON.stringify(result.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la actividad");
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
            {esEdicion ? "Editar Actividad" : "Nueva Actividad"}
          </Text>

          {/* Formulario */}
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Ubicación"
            value={ubicacion}
            onChangeText={setUbicacion}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha (YYYY-MM-DD)"
            value={fecha}
            onChangeText={setFecha}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Categoría</Text>
            <Picker
              selectedValue={idCategoria}
              onValueChange={(itemValue) => setIdCategoria(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una categoría" value="" />
              {categorias &&
                categorias.length > 0 &&
                categorias.map((categoria) => (
                  <Picker.Item
                    key={categoria.id}
                    label={`${categoria.nombre || categoria.Nombre}`}
                    value={String(categoria.id)}
                  />
                ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Actividad"}
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
