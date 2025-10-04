import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottonComponent from '../../Components/BottonComponents';
import { logoutUser } from '../../Src/Navegation/Service/AuthService';

export default function Perfil({ navigation }) {
  const handleLogout = async () => {
    await logoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Bienvenida' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Ionicons name="person-circle" size={60} color="#0A74DA" />
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Juan Pérez</Text>
        <Text style={styles.role}>Viajero Experto</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>juan@email.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>+57 300 123 4567</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>Bogotá, Colombia</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="star" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>Nivel: Oro</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Viajes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Comentarios</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <BottonComponent title="Editar Perfil" onPress={() => alert('Editar perfil')} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#d32f2f" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  profileCard: {
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#0A74DA',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#0A74DA',
    fontStyle: 'italic',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  stat: {
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
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonContainer: {
    gap: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d32f2f',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});