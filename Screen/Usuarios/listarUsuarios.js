import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { listarUsuarios, eliminarUsuarios } from "../../Src/Navegation/Service/UsuariosService";
import { useNavigation } from "@react-navigation/native";
import UsuariosCard from "../../Components/UsuariosCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function ListarUsuarios() {
  const { colors, texts, userRole } = useAppContext();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleUsuarios = async () => {
    setLoading(true);
    try {
      const usuariosResult = await listarUsuarios();

      if (usuariosResult.success) {
        setUsuarios(usuariosResult.data);
      } else {
        Alert.alert("Error", JSON.stringify(usuariosResult.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleUsuarios);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (usuario) => {
    navigation.navigate("editarUsuario", { usuario });
  };

  const handleCrear = () => {
    navigation.navigate("editarUsuario");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarUsuarios(id);
              if (result.success) {
                handleUsuarios();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el usuario");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el usuario");
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
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UsuariosCard
            usuario={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() => navigation.navigate("detalleUsuario", { usuario: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Usuarios Registrados.</Text>
        }
      />

      {/* {(userRole === 'administrador') && ( */}
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+Nuevo Usuario</Text>
        </TouchableOpacity>
      {/* )} */}
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
