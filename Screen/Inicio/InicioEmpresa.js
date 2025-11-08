import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardComponents from '../../Components/CardComponents';

export default function InicioEmpresa({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="business" size={40} color="#0A74DA" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Panel Empresarial</Text>
            <Text style={styles.headerSubtitle}>Gestiona tu agencia de viajes</Text>
          </View>
        </View>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>¡Bienvenido a tu empresa!</Text>
          <Text style={styles.welcomeSubtext}>Administra tus actividades, reservas y clientes</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Módulos Empresariales</Text>
      <View style={styles.gridContainer}>
        <CardComponents
          tittle="Actividades"
          description="Crea y gestiona tus actividades turísticas."
          icon="airplane-outline"
          onPress={() => navigation.navigate('ActividadesFlow')}
        />
        <CardComponents
          tittle="Reservas"
          description="Administra reservas de tus actividades."
          icon="calendar-outline"
          onPress={() => navigation.navigate('ReservasFlow')}
        />
        <CardComponents
          tittle="Comentarios"
          description="Responde a comentarios de clientes."
          icon="chatbubble-outline"
          onPress={() => navigation.navigate('ComentariosFlow')}
        />
        <CardComponents
          tittle="Estadísticas"
          description="Rendimiento y métricas de tu empresa."
          icon="bar-chart-outline"
          onPress={() => navigation.navigate('Estadisticas')}
        />
        <CardComponents
          tittle="Perfil"
          description="Actualiza información de tu empresa."
          icon="business-outline"
          onPress={() => navigation.navigate('PerfilEmpresa')}
        />
        <CardComponents
          tittle="Soporte"
          description="Contacta con soporte de WorldTravels."
          icon="help-circle-outline"
          onPress={() => navigation.navigate('Soporte')}
        />
      </View>

      {/* Información de la empresa */}
      <View style={styles.companyInfo}>
        <Text style={styles.companyTitle}>Información de tu Empresa</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={20} color="#0A74DA" />
            <Text style={styles.infoText}>Nombre: Agencia de Viajes XYZ</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#0A74DA" />
            <Text style={styles.infoText}>Ubicación: Bogotá, Colombia</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={20} color="#0A74DA" />
            <Text style={styles.infoText}>Teléfono: +57 300 123 4567</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#0A74DA" />
            <Text style={styles.infoText}>Email: contacto@agenciaviajes.com</Text>
          </View>
        </View>
      </View>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Tu Rendimiento</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="airplane" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Actividades Activas</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Reservas Este Mes</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Calificación Promedio</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={30} color="#0A74DA" />
            <Text style={styles.statNumber}>320</Text>
            <Text style={styles.statLabel}>Clientes Satisfechos</Text>
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
  companyInfo: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  companyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
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