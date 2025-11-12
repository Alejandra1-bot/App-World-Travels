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

import { crearActividades, actualizarActividades } from "../../Src/Navegation/Service/ActividadService";
import { listarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { listarMunicipios } from "../../Src/Navegation/Service/MunicipiosService";
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
  const [idMunicipio, setIdMunicipio] = useState(actividad ? String(actividad.idMunicipio) : "");
  const [hora, setHora] = useState(actividad ? actividad.hora || actividad.Hora_Actividad : "");
  const [cupoMaximo, setCupoMaximo] = useState(actividad ? String(actividad.cupoMaximo || actividad.Cupo_Maximo) : "");

  const [categorias, setCategorias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!actividad;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [categoriasResult, municipiosResult] = await Promise.all([
          listarCategorias(),
          listarMunicipios()
        ]);
        if (categoriasResult.success) {
          setCategorias(categoriasResult.data);
        }
        if (municipiosResult.success) {
          setMunicipios(municipiosResult.data);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    const camposRequeridos = [nombre, descripcion, ubicacion, precio, fecha, idCategoria, idMunicipio, hora, cupoMaximo];

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await actualizarActividades(actividad.id, {
          Nombre_Actividad: nombre,
          Descripcion: descripcion,
          Ubicacion: ubicacion,
          Precio: precio,
          Fecha_Actividad: fecha,
          Hora_Actividad: hora,
          Cupo_Maximo: cupoMaximo,
          idCategoria,
          idMunicipio,
        });
      } else {
        result = await crearActividades({
          Nombre_Actividad: nombre,
          Descripcion: descripcion,
          Ubicacion: ubicacion,
          Precio: precio,
          Fecha_Actividad: fecha,
          Hora_Actividad: hora,
          Cupo_Maximo: cupoMaximo,
          idCategoria,
          idMunicipio,
          idUsuario: 1, // TODO: get from context
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{esEdicion ? "Editar Actividad" : "Crear Nueva Actividad"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
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
             <TextInput
              style={styles.input}
              placeholder="Hora (HH:MM)"
              value={hora}
              onChangeText={setHora}
            />

            <TextInput
              style={styles.input}
              placeholder="Cupo Máximo"
              value={cupoMaximo}
              onChangeText={setCupoMaximo}
              keyboardType="numeric"
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
                      label={`${categoria.Nombre_Categoria}`}
                      value={String(categoria.id)}
                    />
                  ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Municipio</Text>
              <Picker
                selectedValue={idMunicipio}
                onValueChange={(itemValue) => setIdMunicipio(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona un municipio" value="" />
                {municipios &&
                  municipios.length > 0 &&
                  municipios.map((municipio) => (
                    <Picker.Item
                      key={municipio.id}
                      label={`${municipio.nombre || municipio.Nombre}`}
                      value={String(municipio.id)}
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
                {esEdicion ? "Guardar Cambios" : "Crear Actividad"}
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
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
