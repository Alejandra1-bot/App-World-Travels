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
    navigation.navigate("EditarCategoria_Actividad", { categoria });
  };

  const handleCrear = () => {
    navigation.navigate("EditarCategoria_Actividad");
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={categoriasActividad}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoriaActividadCard
            categoria={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() =>
              navigation.navigate("DetalleCategoria_Actividad", {
                categoria: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Categorías de Actividad Registradas.</Text>
        }
      />

      {(userRole === 'administrador' || userRole === 'empresa') && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+Nueva Categoría</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  botonCrear: {
    backgroundColor: "#0a18d6ff",
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
