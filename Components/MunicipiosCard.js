import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MunicipioCard({ municipio, onEdit, onDelete, onViewDetails, userRole }) {
  const inicial = municipio.Nombre_Municipio ? municipio.Nombre_Municipio.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onViewDetails}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nombre}>{municipio.Nombre_Municipio}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <Pressable onPress={onViewDetails} style={[styles.button, styles.viewBtn]}>
          <Ionicons name="eye" size={16} color="#fff" />
        </Pressable>
        <Pressable onPress={onEdit} style={[styles.button, styles.editBtn]}>
          <Ionicons name="create" size={16} color="#fff" />
        </Pressable>
        <Pressable onPress={onDelete} style={[styles.button, styles.deleteBtn]}>
          <Ionicons name="trash" size={16} color="#fff" />
        </Pressable>
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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  viewBtn: { backgroundColor: "#28a745" },
  editBtn: { backgroundColor: "#007bff" },
  deleteBtn: { backgroundColor: "#dc3545" },
});
