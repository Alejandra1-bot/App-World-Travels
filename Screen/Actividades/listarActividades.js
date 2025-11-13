import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { listarActividades, eliminarActividad } from "../../Src/Navegation/Service/ActividadService";
import { listarCategorias } from "../../Src/Navegation/Service/CategoriasService";
import { useNavigation } from "@react-navigation/native";
import ActividadCard from "../../Components/ActividadCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function ListarActividades() {
  const { colors, texts, userRole } = useAppContext();

  const [actividades, setActividades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleActividades = async () => {
    setLoading(true);
    try {
      const [actividadesResult, categoriasResult] = await Promise.all([
        listarActividades(),
        listarCategorias()
      ]);

      if (actividadesResult.success) {
        setActividades(actividadesResult.data);
        if (categoriasResult.success) setCategorias(categoriasResult.data);
      } else {
        Alert.alert("Error", JSON.stringify(actividadesResult.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las actividades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleActividades);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (actividad) => {
    navigation.navigate("editarActividad", { actividad });
  };

  const handleCrear = () => {
    navigation.navigate("editarActividad");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta actividad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarActividad(id);
              if (result.success) {
                handleActividades();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la actividad");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la actividad");
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
        <Text style={styles.headerTitle}>Lista de Actividades</Text>
      </View>
      <FlatList
        data={actividades}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ActividadCard
            actividad={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() => navigation.navigate("detalleActividad", {
              actividad: item,
              categorias: categorias,
            })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Actividades Registradas.</Text>
        }
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nueva Actividad</Text>
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
    marginLeft: -90, // Ajustar según el ancho aproximado
    paddingVertical: 12,
    paddingHorizontal: 24,
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
