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
import * as ImagePicker from 'expo-image-picker';

import { crearActividades, actualizarActividades } from "../../Src/Navegation/Service/ActividadService";
import { listarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { listarMunicipios } from "../../Src/Navegation/Service/MunicipiosService";
import { listarEmpresas } from "../../Src/Navegation/Service/EmpresaService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarActividad() {
  const navigation = useNavigation();
  const route = useRoute();

  const actividad = route.params?.actividad;
  const { colors, texts, userRole, userId } = useAppContext();

  const [nombre, setNombre] = useState(actividad ? actividad.Nombre_Actividad || actividad.nombre || actividad.Nombre : "");
  const [descripcion, setDescripcion] = useState(actividad ? actividad.Descripcion || actividad.descripcion : "");
  const [ubicacion, setUbicacion] = useState(actividad ? actividad.Ubicacion || actividad.ubicacion : "");
  const [precio, setPrecio] = useState(actividad ? String(actividad.Precio || actividad.precio) : "");
  const [fecha, setFecha] = useState(() => {
    const f = actividad ? actividad.Fecha_Actividad || actividad.fecha || actividad.Fecha : "";
    if (f && f.length === 8 && /^\d{8}$/.test(f)) {
      return f.slice(0, 4) + '-' + f.slice(4, 6) + '-' + f.slice(6);
    }
    return String(f);
  });
  const [idCategoria, setIdCategoria] = useState(actividad ? String(actividad.idCategoria) : "");
  const [idMunicipio, setIdMunicipio] = useState(actividad ? String(actividad.idMunicipio) : "");
  const [hora, setHora] = useState(() => {
    const h = actividad ? actividad.Hora_Actividad || actividad.hora || "" : "";
    if (h && h.length === 4 && /^\d{4}$/.test(h)) {
      return h.slice(0, 2) + ':' + h.slice(2);
    }
    return String(h);
  });
  const [cupoMaximo, setCupoMaximo] = useState(actividad ? String(actividad.Cupo_Maximo || actividad.cupoMaximo) : "");

  const [categorias, setCategorias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(actividad ? String(actividad.idEmpresa) : "");
  const [imagen, setImagen] = useState(actividad && actividad.Imagen && actividad.Imagen !== 'default.jpg' ? { uri: actividad.Imagen } : null);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!actividad;

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0]);
    }
  };

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
      try {
        const municipiosResult = await listarMunicipios();
        if (municipiosResult.success) {
          setMunicipios(municipiosResult.data);
        }
      } catch (error) {
        console.error("Error cargando municipios:", error);
      }
      try {
        const empresasResult = await listarEmpresas();
        if (empresasResult.success) {
          setEmpresas(empresasResult.data);
        }
      } catch (error) {
        console.error("Error cargando empresas:", error);
      }
    };
    cargarDatos();
  }, []);

  const validarHora = (hora) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(hora);
  };

  const validarFecha = (fecha) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) return false;
    const date = new Date(fecha);
    return date instanceof Date && !isNaN(date);
  };

  const handleGuardar = async () => {
    const camposRequeridos = [nombre, descripcion, ubicacion, precio, fecha, idCategoria, idMunicipio, hora, cupoMaximo, selectedEmpresaId];

    if (camposRequeridos.some((campo) => !campo || campo === "")) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        const updateData = {
          Nombre_Actividad: nombre,
          Descripcion: descripcion,
          Ubicacion: ubicacion,
          Precio: precio,
          Fecha_Actividad: fecha,
          Hora_Actividad: hora,
          Cupo_Maximo: cupoMaximo,
          idCategoria,
          idMunicipio,
        };
        if (imagen) {
          updateData.Imagen = imagen.uri;
        }
        result = await actualizarActividades(actividad.id, updateData);
      } else {
        const formData = new FormData();
        formData.append('Nombre_Actividad', nombre);
        formData.append('Descripcion', descripcion);
        formData.append('Ubicacion', ubicacion);
        formData.append('Precio', precio);
        formData.append('Fecha_Actividad', fecha);
        formData.append('Hora_Actividad', hora);
        formData.append('Cupo_Maximo', cupoMaximo);
        formData.append('idCategoria', idCategoria);
        formData.append('idMunicipio', idMunicipio);
        formData.append('idEmpresa', selectedEmpresaId);

        if (imagen) {
          formData.append('Imagen', imagen.uri);
        } else {
          formData.append('Imagen', 'default.jpg');
        }

        result = await crearActividades(formData);
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
              onChangeText={(text) => {
                // Formatear automáticamente a YYYY-MM-DD
                let formatted = text.replace(/[^0-9]/g, '');
                if (formatted.length >= 5) {
                  formatted = formatted.slice(0, 4) + '-' + formatted.slice(4, 6) + '-' + formatted.slice(6, 8);
                } else if (formatted.length >= 3) {
                  formatted = formatted.slice(0, 4) + '-' + formatted.slice(4, 6);
                }
                setFecha(formatted.slice(0, 10));
              }}
              keyboardType="numeric"
              maxLength={10}
            />
             <TextInput
              style={styles.input}
              placeholder="Hora (HH:MM)"
              value={hora}
              onChangeText={(text) => {
                // Formatear para mostrar HH:MM, pero almacenar HHMM
                let formatted = text.replace(/[^0-9]/g, '');
                if (formatted.length >= 3) {
                  formatted = formatted.slice(0, 2) + ':' + formatted.slice(2, 4);
                }
                setHora(formatted.slice(0, 5));
              }}
              
              maxLength={5}
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
                      label={`${municipio.Nombre_Municipio}`}
                      value={String(municipio.id)}
                    />
                  ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Empresa</Text>
              <Picker
                selectedValue={selectedEmpresaId}
                onValueChange={(itemValue) => setSelectedEmpresaId(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una empresa" value="" />
                {empresas &&
                  empresas.length > 0 &&
                  empresas.map((empresa) => (
                    <Picker.Item
                      key={empresa.id}
                      label={`${empresa.id} - ${empresa.nombre || empresa.Nombre || empresa.Nombre_Empresa || empresa.nit || 'Sin nombre'}`}
                      value={String(empresa.id)}
                    />
                  ))}
              </Picker>
            </View>
            

            <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
              <Ionicons name="image" size={24} color="#fff" />
              <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            {imagen && (
              <View style={styles.imagePreview}>
                <Text style={styles.imageText}>Imagen seleccionada</Text>
              </View>
            )}



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
    paddingBottom: 100,
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
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 18,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imagePreview: {
    alignItems: "center",
    marginBottom: 15,
  },
  imageText: {
    fontSize: 14,
    color: "#666",
  },
});
