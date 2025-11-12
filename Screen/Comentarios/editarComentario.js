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

import {
  crearComentarios,
  actualizarComentarios,
  listarUsuarios,
  listarActividades,
} from "../../Src/Navegation/Service/ComentariosService";

import { useAppContext } from "../Configuracion/AppContext";

export default function EditarComentario() {
  const navigation = useNavigation();
  const route = useRoute();

  const comentario = route.params?.comentario;
  const { colors, texts, userRole } = useAppContext();

  const [Contenido, setContenido] = useState(comentario ? comentario.Contenido || "" : "");
  const [Calificacion, setCalificacion] = useState(comentario ? String(comentario.Calificacion) : "");
  const [Fecha_Comentario, setFechaComentario] = useState(comentario ? comentario.Fecha_Comentario || "" : "");
  const [idUsuario, setIdUsuario] = useState(comentario ? comentario.idUsuario : "");
  const [idActividad, setIdActividad] = useState(comentario ? comentario.idActividad : "");

  const [usuarios, setUsuarios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!comentario;

  // Cargar usuarios y actividades
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await listarUsuarios();
        const resActividades = await listarActividades();

        if (resUsuarios.success) setUsuarios(resUsuarios.data);
        if (resActividades.success) setActividades(resActividades.data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos relacionados.");
      }
    };
    fetchData();
  }, []);

  // Guardar o actualizar
  const handleGuardar = async () => {
    if (!Contenido || !Calificacion || !Fecha_Comentario || !idUsuario || !idActividad) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      const data = {
        Contenido,
        Calificacion: parseFloat(Calificacion),
        Fecha_Comentario,
        idUsuario,
        idActividad,
      };

      if (esEdicion) {
        result = await actualizarComentarios(comentario.id, data);
      } else {
        result = await crearComentarios(data);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Comentario actualizado" : "Comentario creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el comentario");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el comentario");
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
            <Text style={styles.cardTitle}>
              {esEdicion ? "Editar Comentario" : "Crear Nuevo Comentario"}
            </Text>

            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Escribe tu comentario..."
              multiline
              numberOfLines={5}
              value={Contenido}
              onChangeText={setContenido}
            />

            <TextInput
              style={styles.input}
              placeholder="Calificación (1-5)"
              keyboardType="numeric"
              value={Calificacion}
              onChangeText={setCalificacion}
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha del Comentario (YYYY-MM-DD)"
              value={Fecha_Comentario}
              onChangeText={setFechaComentario}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Usuario</Text>
              <Picker
                selectedValue={idUsuario}
                onValueChange={(v) => setIdUsuario(v)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar Usuario" value="" />
                {usuarios.map((u) => (
                  <Picker.Item key={u.id} label={u.nombre} value={u.id} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Actividad</Text>
              <Picker
                selectedValue={idActividad}
                onValueChange={(v) => setIdActividad(v)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar Actividad" value="" />
                {actividades.map((a) => (
                  <Picker.Item
                    key={a.id}
                    label={a.Nombre_Actividad || a.nombre_actividad}
                    value={a.id}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Ionicons name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>
                {esEdicion ? "Actualizar Comentario" : "Guardar Comentario"}
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
