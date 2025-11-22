import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { listarReservas, eliminarReservas } from "../../Src/Navegation/Service/ReservasService";
import { listarUsuarios } from "../../Src/Navegation/Service/UsuariosService";
import { useNavigation } from "@react-navigation/native";
import ReservaCard from "../../Components/ReservasCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListarReservas() {
  const { colors, texts, userRole, userEmail } = useAppContext();

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Cargar lista de reservas
  const handleReservas = async () => {
    setLoading(true);
    try {
      const result = await listarReservas();
      if (result.success) {
        let filteredReservas = result.data;
        if (userRole === 'usuario' && userEmail) {
          // Para usuarios regulares, filtrar solo sus reservas
          const usuariosResult = await listarUsuarios();
          if (usuariosResult.success) {
            const currentUsuario = usuariosResult.data.find(u => u.Email === userEmail);
            if (currentUsuario) {
              filteredReservas = result.data.filter(r => r.idUsuario === currentUsuario.id);
            }
          }
        }

        // Filtrar por estado desde AsyncStorage
        const filter = await AsyncStorage.getItem('reservaFilter');
        if (filter) {
          filteredReservas = filteredReservas.filter(r => r.Estado.toLowerCase() === filter.toLowerCase());
          await AsyncStorage.removeItem('reservaFilter'); // Limpiar el filtro
        }


        // Asignar numeración secuencial
        filteredReservas = filteredReservas.sort((a, b) => a.id - b.id);
        filteredReservas = filteredReservas.map((r, index) => ({ ...r, numeroReserva: index + 1 }));

        setReservas(filteredReservas);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las reservas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  // Recargar cuando la pantalla vuelva al enfoque o cambien los parámetros
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleReservas);
    return unsubscribe;
  }, [navigation]);


  // Editar
  const handleEditar = (reserva) => {
    navigation.navigate("editarReservas", { reserva });
  };

  // Crear
  const handleCrear = () => {
    navigation.navigate("editarReservas");
  };

  // Eliminar
  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Deseas eliminar esta reserva?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarReservas(id);
              if (result.success) {
                handleReservas();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la reserva");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la reserva");
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
        <Text style={styles.headerTitle}>Lista de Reservas</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ReservaCard
            reserva={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
            onPress={() =>
              navigation.navigate("detalleReserva", {
                reserva: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay reservas registradas.</Text>
        }
      />

      {/* Botón Crear */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>Nueva Reserva</Text>
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
    backgroundColor: "#007bff",
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
  listContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 80 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" },
});
