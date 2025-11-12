import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { listarComentarios, eliminarComentarios } from "../../Src/Navegation/Service/ComentariosService";
import { useNavigation } from "@react-navigation/native";
import ComentarioCard from "../../Components/ComentariosCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function ListarComentarios() {
  const { colors, texts, userRole } = useAppContext();

  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Cargar lista de comentarios
  const handleComentarios = async () => {
    setLoading(true);
    try {
      const result = await listarComentarios();
      if (result.success) {
        setComentarios(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los comentarios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los comentarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleComentarios);
    return unsubscribe;
  }, [navigation]);

  // Editar
  const handleEditar = (comentario) => {
    navigation.navigate("editarComentario", { comentario });
  };

  // Crear
  const handleCrear = () => {
    navigation.navigate("editarComentario");
  };

  // Eliminar
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Comentario",
      "¿Deseas eliminar este comentario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarComentarios(id);
              if (result.success) {
                handleComentarios();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el comentario");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el comentario");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Comentarios</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ComentarioCard
            comentario={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() =>
              navigation.navigate("DetalleComentario", {
                comentario: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay comentarios registrados.</Text>
        }
      />

      {/* Botón Crear */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nuevo Comentario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    marginLeft: -90,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: "#0284C7",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  header: {
    backgroundColor: "#e0f2fe",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: { fontSize: 24, fontWeight: "600", color: "#333", textAlign: "center" },
  listContainer: { paddingHorizontal: 16, paddingTop: 10 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" },
});
