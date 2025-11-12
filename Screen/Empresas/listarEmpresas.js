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
import EmpresasCard from "../../Components/EmpresasCard";

export default function ListarEmpresas() {
  const { colors, texts, userRole } = useAppContext();

  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleEmpresas = async () => {
    setLoading(true);
    try {
      // TODO: implement service
      // const result = await listarEmpresas();
      // if (result.success) {
      //   setEmpresas(result.data);
      // } else {
      //   Alert.alert("Error", result.message || "No se pudieron cargar las empresas");
      // }
      setEmpresas([]); // Placeholder
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las empresas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleEmpresas);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (empresa) => {
    navigation.navigate("editarEmpresa", { empresa });
  };

  const handleCrear = () => {
    navigation.navigate("editarEmpresa");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta empresa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // TODO: implement service
              // const result = await eliminarEmpresa(id);
              // if (result.success) {
              //   handleEmpresas();
              // } else {
              //   Alert.alert("Error", result.message || "No se pudo eliminar la empresa");
              // }
              Alert.alert("Info", "Función no implementada aún");
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la empresa");
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
        <Text style={styles.headerTitle}>Lista de Empresas</Text>
      </View>
      <FlatList
        data={empresas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <EmpresasCard
            empresa={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() => navigation.navigate("detalleEmpresa", { empresa: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Empresas Registradas.</Text>
        }
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nueva Empresa</Text>
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