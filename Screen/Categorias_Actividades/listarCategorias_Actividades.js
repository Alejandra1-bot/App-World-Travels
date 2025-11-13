import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { listarCategorias, eliminarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { useNavigation } from "@react-navigation/native";
import CategoriaActividadCard from "../../Components/CategoriasCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function ListarCategoria_Actividad() {
  const { colors, texts, userRole } = useAppContext();

  const [categoriasActividad, setCategoriasActividad] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCategoriasActividad = async () => {
    setLoading(true);
    try {
      const result = await listarCategorias();
      if (result.success) {
        setCategoriasActividad(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las categorías");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las categorías de actividad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCategoriasActividad);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (categoria) => {
    navigation.navigate("editarCategoria_Actividad", { categoria });
  };

  const handleCrear = () => {
    navigation.navigate("editarCategoria_Actividad");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta categoría?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarCategorias(id);
              if (result.success) {
                handleCategoriasActividad();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la categoría");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la categoría");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Categorías</Text>
      </View>
      <FlatList
        data={categoriasActividad}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CategoriaActividadCard
            categoria={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() =>
              navigation.navigate("detalleCategoria_Actividad", {
                categoria: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Categorías de Actividad Registradas.</Text>
        }
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nueva Categoría</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    left: '50%',
    marginLeft: -80, // Ajustar según el ancho aproximado
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#e8f4fd",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
