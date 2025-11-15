import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReservaCard({ reserva, onEdit, onDelete, userRole, onPress }) {
  const inicial = reserva.nombreUsuario ? reserva.nombreUsuario.charAt(0).toUpperCase() : "?";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre}>Reserva #{reserva.id}</Text>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {reserva.nombreUsuario}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {reserva.fecha_Reserva}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {reserva.hora}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Actividad ID: {reserva.idActividad}</Text>
        </View>
      </View>

      {userRole === "administrador" && (
        <View style={styles.actions}>
          <Pressable onPress={onEdit} style={[styles.button, styles.editBtn]}>
            <Ionicons name="create-outline" size={18} color="#fff" />
          </Pressable>
          <Pressable onPress={onDelete} style={[styles.button, styles.deleteBtn]}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
          </Pressable>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9fbff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0a74da",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  info: { flex: 1 },
  nombre: { fontSize: 17, fontWeight: "bold", marginBottom: 6, color: "#222" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  detalle: { fontSize: 14, color: "#444", marginLeft: 4 },
  actions: { flexDirection: "column", marginLeft: 8 },
  button: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: { backgroundColor: "#0a18d6" },
  deleteBtn: { backgroundColor: "#f20c0c" },
});
