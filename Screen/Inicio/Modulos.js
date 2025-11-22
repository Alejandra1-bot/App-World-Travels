import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardComponents from '../../Components/CardComponents';
import { useAppContext } from '../Configuracion/AppContext';

export default function Modulos({ navigation }) {
  const { logout, userRole } = useAppContext();

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [] });
  };

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
        {userRole === 'empresa' ? (
          <>
            <CardComponents
              tittle="Usuarios"
              description="Administra clientes, empresas y administradores."
              icon="people-outline"
              onPress={() => navigation.navigate('UsuariosFlow')}
            />
            <CardComponents
              tittle="Empresas"
              description="Lista de empresas registradas."
              icon="business-outline"
              onPress={() => navigation.navigate('EmpresasFlow')}
            />
            <CardComponents
              tittle="Reservas"
              description="Controla todas las reservas y bookings de viajes."
              icon="calendar-outline"
              onPress={() => navigation.navigate('ReservasFlow')}
            />
            <CardComponents
              tittle="Comentarios"
              description="Gestiona las reseñas y feedback de los viajeros."
              icon="chatbubble-outline"
              onPress={() => navigation.navigate('ComentariosFlow')}
            />
            <CardComponents
              tittle="Cerrar Sesión"
              description="Salir de la aplicación de forma segura."
              icon="log-out-outline"
              onPress={handleLogout}
            />
          </>
        ) : (
          <>
            <CardComponents
              tittle="Actividades Turísticas"
              description="Crea y gestiona experiencias inolvidables para tus clientes."
              icon="airplane-outline"
              onPress={() => navigation.navigate('ActividadesFlow')}
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
            {userRole !== 'usuario' && (
              <CardComponents
                tittle="Usuarios"
                description="Administra clientes, empresas y administradores."
                icon="people-outline"
                onPress={() => navigation.navigate('UsuariosFlow')}
              />
            )}
            <CardComponents
              tittle="Administradores"
              description="Gestiona los administradores del sistema."
              icon="shield-checkmark-outline"
              onPress={() => navigation.navigate('AdministradoresFlow')}
            />
            <CardComponents
              tittle="Empresas"
              description="Administra las empresas registradas."
              icon="business-outline"
              onPress={() => navigation.navigate('EmpresasFlow')}
            />
            <CardComponents
              tittle="Cerrar Sesión"
              description="Salir de la aplicación de forma segura."
              icon="log-out-outline"
              onPress={handleLogout}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#667EEA',
    padding: 25,
    marginBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 20,
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E0E7FF',
    marginTop: 4,
    fontStyle: 'italic',
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#667EEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
});