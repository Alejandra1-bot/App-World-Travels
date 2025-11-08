import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function UsuarioCard({ usuario, onEdit, onDelete, userRole, onPress }) {
  const navigation = useNavigation();
  const inicial = usuario.Nombre ? usuario.Nombre.charAt(0).toUpperCase() : "?";

  return (
     <TouchableOpacity
          style={styles.card}
          onPress={onPress || (() => navigation.navigate("DetalleUsuario", { actividad }))}
        >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.Nombre}>{usuario.Nombre}</Text>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {usuario.Email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Nacionalidad: {usuario.Nacionalidad}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Telefono: {usuario.Telefono}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {/* {userRole === "administrador" && ( */}
          <>
            <Pressable onPress={onEdit} style={[styles.button, styles.editBtn]}>
              <Ionicons name="create-outline" size={18} color="#fff" />
            </Pressable>
            <Pressable onPress={onDelete} style={[styles.button, styles.deleteBtn]}>
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </Pressable>
          </>
        {/* )} */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
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
  Nombre: { fontSize: 17, fontWeight: "bold", marginBottom: 4, color: "#222" },
  row: { flexDirection: "row", alignItems: "center" },
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
