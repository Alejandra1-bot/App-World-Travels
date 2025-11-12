import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardComponents from "../../components/CardComponent";
import { useAppContext } from "../Configuracion/AppContext";

export default function Inicio({ navigation }) {
  const { colors, texts, userRole } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Ionicons name="earth-outline" size={60} color="#FACC15" />
        <Text style={styles.headerTitle}>🌍 World Travels</Text>
        <Text style={styles.cloudText}>Explora, descubre y reserva experiencias únicas</Text>
        <Text style={styles.status}>✨ Plataforma activa</Text>
        <Text style={styles.subtitle}>Selecciona una opción para continuar</Text>
      </View>

      {/* ================= GRID DE TARJETAS ================= */}
      <View style={styles.gridContainer}>
        {userRole === "administrador" ? (
          <>
            <CardComponents
              key="usuarios"
              tittle="Usuarios"
              description="Gestión de usuarios del sistema."
              icon="people-outline"
              color="#2563EB"
              onPress={() => navigation.navigate("UsuariosFlow")}
            />

            <CardComponents
              key="actividades"
              tittle="Actividades"
              description="Administrar las actividades turísticas."
              icon="map-outline"
              color="#10B981"
              onPress={() => navigation.navigate("ActividadesFlow")}
            />

            <CardComponents
              key="categorias"
              tittle="Categorías"
              description="Clasifica las actividades por tipo."
              icon="pricetags-outline"
              color="#F59E0B"
              onPress={() => navigation.navigate("CategoriasFlow")}
            />

            <CardComponents
              key="municipios"
              tittle="Municipios"
              description="Gestiona los municipios turísticos."
              icon="business-outline"
              color="#8B5CF6"
              onPress={() => navigation.navigate("MunicipiosFlow")}
            />

            <CardComponents
              key="reservas"
              tittle="Reservas"
              description="Gestión completa de reservas."
              icon="calendar-outline"
              color="#EF4444"
              onPress={() => navigation.navigate("ReservasFlow")}
            />

            <CardComponents
              key="comentarios"
              tittle="Comentarios"
              description="Moderar y gestionar opiniones de usuarios."
              icon="chatbubbles-outline"
              color="#06B6D4"
              onPress={() => navigation.navigate("ComentariosFlow")}
            />
          </>
        ) : userRole === "guia" ? (
          <>
            <CardComponents
              key="actividades"
              tittle="Mis Actividades"
              description="Gestiona las experiencias que ofreces."
              icon="map-outline"
              color="#10B981"
              onPress={() => navigation.navigate("ActividadesFlow")}
            />

            <CardComponents
              key="reservas"
              tittle="Reservas"
              description="Consulta las reservas de tus actividades."
              icon="calendar-outline"
              color="#F59E0B"
              onPress={() => navigation.navigate("ReservasFlow")}
            />

            <CardComponents
              key="comentarios"
              tittle="Comentarios"
              description="Lee los comentarios de los turistas."
              icon="chatbubbles-outline"
              color="#06B6D4"
              onPress={() => navigation.navigate("ComentariosFlow")}
            />
          </>
        ) : userRole === "turista" ? (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>🌴 Explora Colombia con World Travels</Text>

            <View style={styles.servicesGrid}>
              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>🗺️</Text>
                </View>
                <Text style={styles.serviceTitle}>Actividades</Text>
                <Text style={styles.serviceText}>
                  Descubre tours y aventuras inolvidables en todo el país.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>🏙️</Text>
                </View>
                <Text style={styles.serviceTitle}>Municipios</Text>
                <Text style={styles.serviceText}>
                  Explora los destinos más bellos de cada región.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>📝</Text>
                </View>
                <Text style={styles.serviceTitle}>Comentarios</Text>
                <Text style={styles.serviceText}>
                  Lee experiencias reales de otros viajeros.
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>🎫</Text>
                </View>
                <Text style={styles.serviceTitle}>Reservas</Text>
                <Text style={styles.serviceText}>
                  Gestiona tus próximas aventuras y reservas activas.
                </Text>
              </View>
            </View>

            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>💡 Consejos para tu viaje</Text>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipItem}>• Lleva ropa cómoda y ligera.</Text>
                <Text style={styles.tipItem}>• Respeta las culturas locales.</Text>
                <Text style={styles.tipItem}>• Hidrátate constantemente.</Text>
                <Text style={styles.tipItem}>• Reserva con anticipación.</Text>
                <Text style={styles.tipItem}>• Captura cada momento 📸</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#0284C7",
    paddingVertical: 55,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff", marginTop: 10 },
  cloudText: { fontSize: 14, color: "#E0F2FE", textAlign: "center", marginVertical: 5 },
  status: { fontSize: 16, color: "#BAE6FD", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#F0F9FF", marginTop: 2 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  infoSection: { width: "100%", paddingHorizontal: 20, marginTop: 20 },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 25,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  serviceIcon: {
    backgroundColor: "#0284C7",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  iconText: { fontSize: 28 },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  serviceText: { fontSize: 12, color: "#6B7280", textAlign: "center", lineHeight: 18 },
  tipsSection: {
    backgroundColor: "#E0F2FE",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
    textAlign: "center",
  },
  tipItem: { fontSize: 14, color: "#374151", marginBottom: 8, lineHeight: 20 },
});
