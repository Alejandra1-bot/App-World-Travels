import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../Configuracion/AppContext";

export default function DetalleEmpresa() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, userRole } = useAppContext();

  const empresa = route.params?.empresa;

  if (!empresa) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Empresa no encontrada</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleEditar = () => {
    navigation.navigate("editarEmpresa", { empresa });
  };

  const handleEliminar = () => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta empresa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // TODO: implement eliminarEmpresa
              // const result = await eliminarEmpresa(empresa.id);
              // if (result.success) {
              //   navigation.goBack();
              // } else {
              //   Alert.alert("Error", result.message || "No se pudo eliminar la empresa");
              // }
              Alert.alert("Info", "Función no implementada aún");
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la empresa");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(empresa.nombre || empresa.Nombre_Empresa || empresa.nombre_empresa || "?").charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.nombre}>
                {empresa.nombre || empresa.Nombre_Empresa || empresa.nombre_empresa}
              </Text>
              <Text style={styles.rol}>Empresa</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#007bff" />
              <Text style={styles.infoText}>{empresa.Email || empresa.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color="#007bff" />
              <Text style={styles.infoText}>{empresa.Telefono || empresa.telefono}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#007bff" />
              <Text style={styles.infoText}>{empresa.Direccion || empresa.direccion}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="business-outline" size={20} color="#007bff" />
              <Text style={styles.infoText}>NIT: {empresa.NIT || empresa.nit}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="map-outline" size={20} color="#007bff" />
              <Text style={styles.infoText}>Ciudad: {empresa.Ciudad || empresa.ciudad}</Text>
            </View>
          </View>

          {(userRole === 'administrador') && (
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.button, styles.editBtn]} onPress={handleEditar}>
                <Ionicons name="create-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={handleEliminar}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e1f5fe",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  headerText: {
    flex: 1,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  rol: {
    fontSize: 16,
    color: "#666",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  editBtn: {
    backgroundColor: "#28a745",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});