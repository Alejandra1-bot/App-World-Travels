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
  crearReservas,
  actualizarReservas,
  listarUsuarios,
  listarActividades,
} from "../../Src/Navegation/Service/ReservasService";

import { useAppContext } from "../Configuracion/AppContext";

export default function EditarReserva() {
  const navigation = useNavigation();
  const route = useRoute();

  const reserva = route.params?.reserva;
  const { colors, texts, userRole } = useAppContext();

  const [Fecha_Reserva, setFechaReserva] = useState(
    reserva ? reserva.Fecha_Reserva || "" : ""
  );
  const [Numero_Personas, setNumeroPersonas] = useState(
    reserva ? String(reserva.Numero_Personas) : ""
  );
  const [Estado, setEstado] = useState(reserva ? reserva.Estado : "Pendiente");
  const [idUsuario, setIdUsuario] = useState(reserva ? reserva.idUsuario : "");
  const [idActividad, setIdActividad] = useState(
    reserva ? reserva.idActividad : ""
  );

  const [usuarios, setUsuarios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!reserva;

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
    if (!Fecha_Reserva || !Numero_Personas || !idUsuario || !idActividad) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      const data = {
        Fecha_Reserva,
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
              value={Fecha_Reserva}
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
              <Picker
                selectedValue={Estado}
                onValueChange={(v) => setEstado(v)}
                style={styles.picker}
              >
                <Picker.Item label="Pendiente" value="Pendiente" />
                <Picker.Item label="Confirmada" value="Confirmada" />
                <Picker.Item label="Cancelada" value="Cancelada" />
              </Picker>
            </View>

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
                {esEdicion ? "Actualizar Reserva" : "Guardar Reserva"}
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
