import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardComponents from '../../Components/CardComponents';

export default function InicioAdmin({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="shield-checkmark" size={40} color="#0A74DA" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Panel Administrador</Text>
            <Text style={styles.headerSubtitle}>Control total del sistema</Text>
          </View>
        </View>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>¡Bienvenido Administrador!</Text>
          <Text style={styles.welcomeSubtext}>Tienes acceso completo a todas las funciones del sistema</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Módulos de Administración</Text>
      <View style={styles.gridContainer}>
        <CardComponents
          tittle="Usuarios"
          description="Gestiona usuarios, empresas y permisos del sistema."
          icon="people-circle-outline"
          onPress={() => navigation.navigate('UsuariosFlow')}
        />
        <CardComponents
          tittle="Actividades"
          description="Supervisa todas las actividades turísticas."
          icon="airplane-outline"
          onPress={() => navigation.navigate('ActividadesFlow')}
        />
        <CardComponents
          tittle="Departamentos"
          description="Administra destinos y departamentos."
          icon="map-outline"
          onPress={() => navigation.navigate('DepartamentosFlow')}
        />
        <CardComponents
          tittle="Categorías"
          description="Gestiona categorías de actividades."
          icon="list-outline"
          onPress={() => navigation.navigate('Categorias_ActividadesFlow')}
        />
        <CardComponents
          tittle="Reservas"
          description="Monitorea todas las reservas del sistema."
          icon="calendar-outline"
          onPress={() => navigation.navigate('ReservasFlow')}
        />
        <CardComponents
          tittle="Comentarios"
          description="Modera comentarios y reseñas."
          icon="chatbubble-outline"
          onPress={() => navigation.navigate('ComentariosFlow')}
        />
        <CardComponents
          tittle="Municipios"
          description="Gestiona ciudades y destinos turísticos."
          icon="location-outline"
          onPress={() => navigation.navigate('MunicipiosFlow')}
        />
        <CardComponents
          tittle="Reportes"
          description="Estadísticas y análisis del sistema."
          icon="bar-chart-outline"
          onPress={() => navigation.navigate('Reportes')}
        />
      </View>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estadísticas del Sistema</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>1,250</Text>
            <Text style={styles.statLabel}>Usuarios Activos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="airplane" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>85</Text>
            <Text style={styles.statLabel}>Actividades</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>320</Text>
            <Text style={styles.statLabel}>Reservas Hoy</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="business" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Empresas</Text>
          </View>
        </View>
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
  statsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A74DA',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 5,
  },
});