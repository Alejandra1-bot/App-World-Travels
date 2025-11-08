import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ActividadCard({ actividad, onEdit, onDelete, userRole, onPress }) {
  const navigation = useNavigation();
  const inicial = actividad.nombre ? actividad.nombre.charAt(0).toUpperCase() : "?";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress || (() => navigation.navigate("DetalleActividad", { actividad }))}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre}>{actividad.nombre}</Text>

        <View style={styles.row}>
          <Ionicons name="information-circle-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {actividad.descripcion}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {actividad.ubicacion}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="pricetag-outline" size={16} color="#555" />
          <Text style={styles.detalle}> ${actividad.precio}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {actividad.fecha}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="albums-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Categoría ID: {actividad.idCategoria}</Text>
        </View>
      </View>

      {(userRole === 'administrador') && (
        <View style={styles.actions}>
          <Pressable onPress={onEdit} style={({ pressed }) => [styles.button, styles.editBtn, pressed && styles.pressed]}>
            <Ionicons name="create-outline" size={18} color="#fff" />
          </Pressable>
          <Pressable onPress={onDelete} style={({ pressed }) => [styles.button, styles.deleteBtn, pressed && styles.pressed]}>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
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
    elevation: 2,
  },
  editBtn: { backgroundColor: "#0a18d6" },
  deleteBtn: { backgroundColor: "#f20c0c" },
  pressed: { opacity: 0.7, transform: [{ scale: 0.95 }] },
});
