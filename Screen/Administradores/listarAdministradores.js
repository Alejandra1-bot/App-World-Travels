import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";
import AdministradoresCard from "../../Components/AdministradoresCard";
import { listarAdministradores, eliminarAdministrador } from "../../Src/Navegation/Service/AdministradoresService";

export default function ListarAdministradores() {
  const { colors, texts, userRole } = useAppContext();

  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleAdministradores = async () => {
    setLoading(true);
    try {
      const result = await listarAdministradores();
      if (result.success) {
        setAdministradores(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los administradores");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los administradores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleAdministradores);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (administrador) => {
    navigation.navigate("editarAdministrador", { administrador });
  };

  const handleCrear = () => {
    navigation.navigate("editarAdministrador");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este administrador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarAdministrador(id);
              if (result.success) {
                handleAdministradores();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el administrador");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el administrador");
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
        <Text style={styles.headerTitle}>Lista de Administradores</Text>
      </View>
      <FlatList
        data={administradores}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <AdministradoresCard
            administrador={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() => navigation.navigate("detalleAdministrador", { administrador: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Administradores Registrados.</Text>
        }
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nuevo Administrador</Text>
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
    marginLeft: -80,
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