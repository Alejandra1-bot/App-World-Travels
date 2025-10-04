import { Text, View, StyleSheet, ScrollView } from "react-native";
import BottonComponent from "../../Components/BottonComponents";

export default function Bienvenida({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text style={styles.emoji}>✈️</Text> */}
          <Text style={styles.titulo}>🌍 World Travels</Text>
          <Text style={styles.emoji}>🏔️</Text>
        </View>

        <Text style={styles.subtitulo}>
          ¡Descubre el mundo con World Travels! Nuestra app te conecta con las mejores experiencias de viaje en Boyacá y más allá. Planifica aventuras inolvidables, desde explorar pueblos coloniales hasta disfrutar de la naturaleza exuberante. Con World Travels, cada viaje se convierte en una historia única.
        </Text>

        <View style={styles.featureContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🗺️</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Explora Actividades</Text>
              <Text style={styles.featureText}>
                Navega por una amplia variedad de actividades organizadas por categorías como aventura, cultura, naturaleza y gastronomía. Encuentra opciones en ubicaciones icónicas de Boyacá como Villa de Leyva, Raquira y la Laguna de Tota.
              </Text>
            </View>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>📅</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Reserva Experiencias</Text>
              <Text style={styles.featureText}>
                Reserva tours guiados, alojamientos, restaurantes y eventos especiales con facilidad. Nuestro sistema seguro garantiza que tus reservas se confirmen al instante, permitiéndote enfocarte en disfrutar.
              </Text>
            </View>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>💬</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Comentarios y Reseñas</Text>
              <Text style={styles.featureText}>
                Lee opiniones reales de otros viajeros y comparte tus experiencias. Nuestra comunidad te ayuda a elegir las mejores actividades y a conectar con personas afines.
              </Text>
            </View>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>👤</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Gestiona tu Perfil</Text>
              <Text style={styles.featureText}>
                Mantén un registro de tus reservas pasadas y futuras, edita tu perfil, y recibe recomendaciones personalizadas basadas en tus preferencias de viaje.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.howItWorks}>
          <Text style={styles.seccionTitulo}>🚀 ¿Cómo Funciona World Travels?</Text>
          <Text style={styles.info}>
            1. <Text style={styles.bold}>Regístrate o Inicia Sesión:</Text> Crea una cuenta gratuita para acceder a todas las funcionalidades.{"\n"}
            2. <Text style={styles.bold}>Explora y Descubre:</Text> Usa nuestros filtros para encontrar actividades que se ajusten a tus intereses y presupuesto.{"\n"}
            3. <Text style={styles.bold}>Reserva con Confianza:</Text> Selecciona fechas, confirma detalles de forma segura.{"\n"}
            4. <Text style={styles.bold}>Viaja y Disfruta:</Text> Recibe confirmaciones por email, accede a mapas y guías, y comparte tus experiencias.{"\n"}
            {"\n"}
            ¡Únete a miles de viajeros que ya han descubierto Boyacá con World Travels!
          </Text>
        </View>

        <BottonComponent
          title="¡Empezar mi aventura! ✈️"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  emoji: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 40,
  },
  subtitulo: {
    fontSize: 18,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  featureContainer: {
    width: "100%",
    marginBottom: 40,
  },
  feature: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  featureTextContainer: {
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
    textAlign: "center",
  },
  featureText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    color: "#003366",
  },
  howItWorks: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  seccionTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: "#555",
    lineHeight: 26,
    textAlign: "left",
  },
});