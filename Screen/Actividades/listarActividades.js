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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={actividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ActividadCard
            actividad={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() => navigation.navigate("DetalleActividad", {
              actividad: item,
              categorias: categorias,
            })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay Actividades Registradas.</Text>
        }
      />

      {/* {(userRole === 'administrador' || userRole === 'empresa') && ( */}
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+Nueva Actividad</Text>
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
