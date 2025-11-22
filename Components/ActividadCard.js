import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ActividadCard({ actividad, onEdit, onDelete, userRole, onPress }) {
  const navigation = useNavigation();
  const nombre = actividad.Nombre_Actividad || actividad.nombre;
  const inicial = nombre ? nombre.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress || (() => navigation.navigate("detalleActividad", { actividad }))}
      >
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nombre}>{nombre}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detalle}>Descripción: {actividad.Descripcion || actividad.descripcion}</Text>
          <Text style={styles.detalle}>Ubicación: {actividad.Ubicacion || actividad.ubicacion}</Text>
          <Text style={styles.detalle}>Precio: ${actividad.Precio || actividad.precio}</Text>
          <Text style={styles.detalle}>Fecha: {actividad.Fecha_Actividad || actividad.fecha}</Text>
        </View>
      </TouchableOpacity>
      {(userRole === 'administrador' || userRole === 'empresa') && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={[styles.button, styles.editBtn]}>
            <Ionicons name="create" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={[styles.button, styles.deleteBtn]}>
            <Ionicons name="trash" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  cardContent: {
    padding: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  nameContainer: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: "bold", color: "#333" },
  details: {
    marginBottom: 10,
  },
  detalle: { fontSize: 14, color: "#666", marginBottom: 3 },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  editBtn: { backgroundColor: "#007bff" },
  deleteBtn: { backgroundColor: "#dc3545" },
});
