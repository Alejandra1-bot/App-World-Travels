import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CardComponents from "../../Components/CardComponents";
import BottonComponent from "../../Components/BottonComponents";

export default function Inicio({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.welcomeCard}>
        <Ionicons name="sunny" size={50} color="#FFD700" />
        <Text style={styles.welcomeTitle}>¡Hola, Viajero!</Text>
        <Text style={styles.welcomeSubtitle}>Bienvenido a World Travels</Text>
        <Text style={styles.welcomeText}>Descubre nuevas aventuras en Boyacá y más allá</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="map" size={30} color="#0A74DA" />
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Actividades</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="bookmark" size={30} color="#0A74DA" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Reservas</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={30} color="#0A74DA" />
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Modulos')}>
            <Ionicons name="grid" size={30} color="#0A74DA" />
            <Text style={styles.actionText}>Ver Módulos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person" size={30} color="#0A74DA" />
            <Text style={styles.actionText}>Mi Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Configuracion')}>
            <Ionicons name="settings" size={30} color="#0A74DA" />
            <Text style={styles.actionText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => alert('Buscar actividades')}>
            <Ionicons name="search" size={30} color="#0A74DA" />
            <Text style={styles.actionText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Actividades Populares</Text>
        <View style={styles.gridContainer}>
        </View>
      </View>
    </ScrollView>
  );
}

 const styles = StyleSheet.create({
   container: {
     flexGrow: 1,
     backgroundColor: '#EAF6FF',
     padding: 20,
   },
   welcomeCard: {
     backgroundColor: '#FFFFFF',
     borderRadius: 20,
     padding: 30,
     alignItems: 'center',
     marginBottom: 30,
     shadowColor: '#000',
     shadowOpacity: 0.1,
     shadowOffset: { width: 0, height: 4 },
     shadowRadius: 10,
     elevation: 5,
   },
   welcomeTitle: {
     fontSize: 28,
     fontWeight: 'bold',
     color: '#003366',
     marginTop: 10,
     marginBottom: 5,
   },
   welcomeSubtitle: {
     fontSize: 18,
     color: '#0A74DA',
     fontWeight: '600',
   },
   welcomeText: {
     fontSize: 14,
     color: '#555',
     textAlign: 'center',
     marginTop: 5,
   },
   statsContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     marginBottom: 30,
   },
   statCard: {
     alignItems: 'center',
     backgroundColor: '#FFFFFF',
     padding: 20,
     borderRadius: 15,
     minWidth: 80,
     shadowColor: '#000',
     shadowOpacity: 0.05,
     shadowOffset: { width: 0, height: 2 },
     shadowRadius: 4,
     elevation: 2,
   },
   statNumber: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#0A74DA',
     marginTop: 5,
   },
   statLabel: {
     fontSize: 12,
     color: '#555',
     marginTop: 2,
   },
   quickActions: {
     marginBottom: 30,
   },
   sectionTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     color: '#003366',
     marginBottom: 15,
   },
   actionsGrid: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
   },
   actionCard: {
     width: '48%',
     backgroundColor: '#FFFFFF',
     padding: 20,
     borderRadius: 15,
     alignItems: 'center',
     marginBottom: 15,
     shadowColor: '#000',
     shadowOpacity: 0.05,
     shadowOffset: { width: 0, height: 2 },
     shadowRadius: 4,
     elevation: 2,
   },
   actionText: {
     fontSize: 14,
     color: '#555',
     marginTop: 10,
     textAlign: 'center',
   },
   recentContainer: {
     marginBottom: 20,
   },
   gridContainer: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
   },
 });