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
  Modal,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { crearReservas, actualizarReservas } from "../../Src/Navegation/Service/ReservasService";
import { listarUsuarios } from "../../Src/Navegation/Service/UsuariosService";
import { listarActividades } from "../../Src/Navegation/Service/ActividadService";

import { useAppContext } from "../Configuracion/AppContext";

export default function EditarReserva() {
  const navigation = useNavigation();
  const route = useRoute();

  const reserva = route.params?.reserva;
  const { colors, texts, userRole } = useAppContext();

  const [fecha_Reserva, setFechaReserva] = useState(
    reserva ? reserva.Fecha_Reserva || "" : ""
  );
  const [Numero_Personas, setNumeroPersonas] = useState(
    reserva ? String(reserva.Numero_Personas) : ""
  );
  const [Estado, setEstado] = useState(reserva ? (reserva.Estado ? reserva.Estado.toLowerCase() : "pendiente") : "pendiente");
  const [idUsuario, setIdUsuario] = useState(reserva ? reserva.idUsuario : "");
  const [idActividad, setIdActividad] = useState(
    reserva ? reserva.idActividad : ""
  );

  const [usuarios, setUsuarios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const esEdicion = !!reserva;

  // Cargar usuarios y actividades
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await listarUsuarios();
        if (resUsuarios.success) setUsuarios(resUsuarios.data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
      try {
        const resActividades = await listarActividades();
        if (resActividades.success) setActividades(resActividades.data);
      } catch (error) {
        console.error("Error cargando actividades:", error);
      }
    };
    fetchData();
  }, []);

  // Guardar o actualizar
  const handleGuardar = async () => {
    if (!fecha_Reserva || !Numero_Personas || !idUsuario || !idActividad) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      const data = {
        Fecha_Reserva: fecha_Reserva,
        Numero_Personas: parseInt(Numero_Personas),
        Estado,
        idUsuario,
        idActividad,
      };

      if (esEdicion) {
        result = await actualizarReservas(reserva.id, data);
      } else {
        result = await crearReservas(data);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Reserva actualizada" : "Reserva creada correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar la reserva");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la reserva");
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
              {esEdicion ? "Editar Reserva" : "Crear Nueva Reserva"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Fecha de la Reserva (YYYY-MM-DD)"
              value={fecha_Reserva}
              onChangeText={setFechaReserva}
            />

            <TextInput
              style={styles.input}
              placeholder="Número de Personas"
              value={Numero_Personas}
              keyboardType="numeric"
              onChangeText={setNumeroPersonas}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Estado</Text>
              <TouchableOpacity
                style={styles.pickerTouchable}
                onPress={() => {
                  setModalType('estado');
                  setModalVisible(true);
                }}
              >
                <Text style={styles.pickerText}>
                  {Estado === 'pendiente' ? 'Pendiente' : Estado === 'confirmada' ? 'Confirmada' : 'Cancelada'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Usuario</Text>
              <TouchableOpacity
                style={styles.pickerTouchable}
                onPress={() => {
                  setModalType('usuario');
                  setModalVisible(true);
                }}
              >
                <Text style={styles.pickerText}>
                  {idUsuario ? usuarios.find(u => u.id === idUsuario)?.Nombre || 'Usuario seleccionado' : 'Seleccionar Usuario'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Actividad</Text>
              <TouchableOpacity
                style={styles.pickerTouchable}
                onPress={() => {
                  setModalType('actividad');
                  setModalVisible(true);
                }}
              >
                <Text style={styles.pickerText}>
                  {idActividad ? actividades.find(a => a.id === idActividad)?.Nombre_Actividad || 'Actividad seleccionada' : 'Seleccionar Actividad'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Ionicons name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>
                {esEdicion ? "Actualizar Reserva" : "Guardar Reserva"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Seleccionar {modalType === 'usuario' ? 'Usuario' : modalType === 'actividad' ? 'Actividad' : 'Estado'}
          </Text>
          <FlatList
            data={
              modalType === 'usuario'
                ? [{ id: '', label: 'Seleccionar Usuario' }, ...usuarios.map(u => ({ id: u.id, label: u.Nombre || u.nombre }))]
                : modalType === 'actividad'
                ? [{ id: '', label: 'Seleccionar Actividad' }, ...actividades.map(a => ({ id: a.id, label: a.Nombre_Actividad || a.nombre_actividad }))]
                : [
                    { id: 'pendiente', label: 'Pendiente' },
                    { id: 'confirmada', label: 'Confirmada' },
                    { id: 'cancelada', label: 'Cancelada' }
                  ]
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  if (modalType === 'usuario') setIdUsuario(item.id);
                  else if (modalType === 'actividad') setIdActividad(item.id);
                  else setEstado(item.id);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
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
    zIndex: 10,
  },
  pickerTouchable: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
  modalClose: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
