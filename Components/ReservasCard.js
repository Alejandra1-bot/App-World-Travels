import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ReservaCard({ reserva, onCancel, userRole, onPress }) {
  const navigation = useNavigation();
  const inicial = reserva.nombreUsuario ? reserva.nombreUsuario.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onPress || (() => navigation.navigate("detalleReserva", { reserva }))}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nombre}>Reserva de {reserva.nombreUsuario} #{reserva.id}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detalle}>Usuario: {reserva.nombreUsuario}</Text>
          <Text style={styles.detalle}>Fecha: {reserva.Fecha_Reserva}</Text>
          <Text style={styles.detalle}>Actividad: {reserva.nombreActividad}</Text>
          <Text style={styles.detalle}>Estado: {reserva.Estado === 'Cancelada' ? 'Cancelada por el usuario' : reserva.Estado}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelBtn]}>
          <Ionicons name="close-circle" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
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
  cancelBtn: { backgroundColor: "#ff6b35" },
});

