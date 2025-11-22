import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function UsuarioCard({ usuario, onEdit, onDelete, onBlock, userRole, onPress }) {
  const navigation = useNavigation();
  const inicial = usuario.Nombre ? usuario.Nombre.charAt(0).toUpperCase() : "?";

  return (
    <View style={[styles.card, usuario.is_blocked && styles.blockedCard]}>
      <TouchableOpacity style={styles.cardContent} onPress={onPress || (() => navigation.navigate("DetalleUsuario", { actividad }))}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.Nombre}>{usuario.Nombre}</Text>
            {usuario.is_blocked && <View style={styles.blockedBadge}><Text style={styles.blockedText}>Bloqueado</Text></View>}
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detalle}>Email: {usuario.Email}</Text>
          <Text style={styles.detalle}>Nacionalidad: {usuario.Nacionalidad}</Text>
          <Text style={styles.detalle}>Teléfono: {usuario.Telefono}</Text>
        </View>
      </TouchableOpacity>
      {userRole === 'administrador' && (
        <View style={styles.actions}>
          <Pressable onPress={onEdit} style={[styles.button, styles.editBtn]}>
            <Ionicons name="create" size={16} color="#fff" />
          </Pressable>
          <Pressable onPress={onBlock} style={[styles.button, styles.blockBtn]}>
            <Ionicons name={usuario.is_blocked ? "lock-closed" : "lock-open"} size={16} color="#fff" />
          </Pressable>
          <Pressable onPress={onDelete} style={[styles.button, styles.deleteBtn]}>
            <Ionicons name="trash" size={16} color="#fff" />
          </Pressable>
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
  blockedCard: {
    backgroundColor: "#ffeaea",
    borderColor: "#ffcccc",
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
  nameContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  Nombre: { fontSize: 18, fontWeight: "bold", color: "#333" },
  blockedBadge: { backgroundColor: "#dc3545", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginLeft: 10 },
  blockedText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  editBtn: { backgroundColor: "#007bff" },
  blockBtn: { backgroundColor: "#ff6b35" },
  deleteBtn: { backgroundColor: "#dc3545" },
});
