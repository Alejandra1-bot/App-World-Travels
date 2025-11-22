import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ComentarioCard({ comentario, onEdit, onDelete, userRole }) {
  const navigation = useNavigation();
  const inicial = comentario.usuario?.Nombre ? comentario.usuario.Nombre.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate("detalleComentario", { comentario })}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inicial}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nombre}>Comentario</Text>
            
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detalle}>Usuario: {comentario.usuario?.Nombre || `ID: ${comentario.idUsuario}`}</Text>
          <Text style={styles.detalle}>Actividad: {comentario.actividad?.Nombre_Actividad || 'Sin nombre'}</Text>
          <Text style={styles.detalle}>Comentario: {comentario.Contenido}</Text>
          <View style={[styles.detalle, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text>Calificación: </Text>
            {Array.from({ length: 5 }, (_, i) => (
              <Ionicons
                key={i}
                name={i < comentario.Calificacion ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.detalle}>Fecha: {comentario.Fecha_Comentario}</Text>
        </View>
      </TouchableOpacity>
      {userRole === 'administrador' && (
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
