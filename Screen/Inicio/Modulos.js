import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardComponents from '../../Components/CardComponents';

export default function Modulos({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="airplane" size={40} color="#0A74DA" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>WorldTravels</Text>
            <Text style={styles.headerSubtitle}>Descubre el mundo con nosotros</Text>
          </View>
        </View>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>¡Bienvenido a tu panel de control!</Text>
          <Text style={styles.welcomeSubtext}>Gestiona todos los aspectos de tu agencia de viajes</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Módulos Disponibles</Text>
      <View style={styles.gridContainer}>
        <CardComponents
          tittle="Actividades Turísticas"
          description="Crea y gestiona experiencias inolvidables para tus clientes."
          icon="airplane-outline"
          onPress={() => navigation.navigate('ActividadesFlow')}
        />
        <CardComponents
          tittle="Destinos"
          description="Administra los departamentos y lugares de destino."
          icon="map-outline"
          onPress={() => navigation.navigate('DepartamentosFlow')}
        />
        <CardComponents
          tittle="Comentarios"
          description="Gestiona las reseñas y feedback de los viajeros."
          icon="chatbubble-outline"
          onPress={() => navigation.navigate('ComentariosFlow')}
        />
        <CardComponents
          tittle="Categorías"
          description="Organiza las actividades por tipo y temática."
          icon="list-outline"
          onPress={() => navigation.navigate('Categorias_ActividadesFlow')}
        />
        <CardComponents
          tittle="Reservas"
          description="Controla todas las reservas y bookings de viajes."
          icon="calendar-outline"
          onPress={() => navigation.navigate('ReservasFlow')}
        />
        <CardComponents
          tittle="Municipios"
          description="Gestiona las ciudades y pueblos turísticos."
          icon="location-outline"
          onPress={() => navigation.navigate('MunicipiosFlow')}
        />
        <CardComponents
          tittle="Usuarios"
          description="Administra clientes, empresas y administradores."
          icon="people-outline"
          onPress={() => navigation.navigate('UsuariosFlow')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A74DA',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 2,
  },
  welcomeCard: {
    backgroundColor: '#F0F9FF',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0A74DA',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
});