import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { listarMunicipios, eliminarMunicipios } from "../../Src/Navegation/Service/MunicipiosService";
import { useNavigation } from "@react-navigation/native";
import MunicipioCard from "../../Components/MunicipiosCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function ListarMunicipios() {
  const { colors, texts, userRole } = useAppContext();

  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Cargar lista de municipios
  const handleMunicipios = async () => {
    setLoading(true);
    try {
      const result = await listarMunicipios();
      if (result.success) {
        setMunicipios(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los municipios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los municipios");
    } finally {
      setLoading(false);
    }
  };

  // Recargar al volver al enfoque de la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleMunicipios);
    return unsubscribe;
  }, [navigation]);

  // Navegar a editar
  const handleEditar = (municipio) => {
    navigation.navigate("editarMunicipio", { municipio });
  };

  // Navegar a crear
  const handleCrear = () => {
    navigation.navigate("editarMunicipio");
  };

  // Eliminar municipio
  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este municipio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarMunicipios(id);
              if (result.success) {
                handleMunicipios();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el municipio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el municipio");
            }
          },
        },
      ]
    );
  };

  // Mostrar carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Municipios</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={municipios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <MunicipioCard
            municipio={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onViewDetails={() =>
              navigation.navigate("detalleMunicipio", {
                municipio: item,
              })
            }
            userRole={userRole}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay municipios registrados.</Text>
        }
      />

      {/* Botón Crear */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nuevo Municipio</Text>
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
