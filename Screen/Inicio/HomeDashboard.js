import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listarActividades } from '../../Src/Navegation/Service/ActividadService';

export default function HomeDashboard({ navigation }) {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      const result = await listarActividades();
      if (result.success) {
        setActividades(result.data);
      }
      setLoading(false);
    };
    fetchActividades();
  }, []);

  // Simular recientes: últimas 5
  const recientes = actividades.slice(-5).reverse();
  // Simular populares: primeras 5 (o aleatorias)
  const populares = actividades.slice(0, 5);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="airplane" size={40} color="#fff" />
        <Text style={styles.headerTitle}>WorldTravels</Text>
        <Text style={styles.headerSubtitle}>Descubre el mundo</Text>
      </View>

      {/* Sección Recientes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividades Recientes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {recientes.map((actividad) => (
            <TouchableOpacity
              key={actividad.id}
              style={styles.card}
              onPress={() => navigation.navigate('ActividadesFlow', { screen: 'detalleActividad', params: { actividad } })}
            >
              <Image
                source={{ uri: actividad.Imagen || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{actividad.Nombre_Actividad}</Text>
              <Text style={styles.cardSubtitle}>{actividad.Ubicacion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sección Populares */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividades Populares</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {populares.map((actividad) => (
            <TouchableOpacity
              key={actividad.id}
              style={styles.card}
              onPress={() => navigation.navigate('ActividadesFlow', { screen: 'detalleActividad', params: { actividad } })}
            >
              <Image
                source={{ uri: actividad.Imagen || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{actividad.Nombre_Actividad}</Text>
              <Text style={styles.cardSubtitle}>{actividad.Ubicacion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Información de la App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre WorldTravels</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            WorldTravels es tu compañero ideal para explorar Colombia. Descubre actividades únicas,
            conecta con guías locales y vive experiencias inolvidables en los destinos más fascinantes del país.
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{actividades.length}</Text>
              <Text style={styles.statLabel}>Actividades</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Municipios</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Usuarios</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Consejos de Viaje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos para tu Viaje</Text>
        <View style={styles.tipsContainer}>
          <View style={styles.tip}>
            <Ionicons name="sunny" size={24} color="#f59e0b" />
            <Text style={styles.tipText}>Lleva protector solar y ropa cómoda</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="water" size={24} color="#06b6d4" />
            <Text style={styles.tipText}>Hidrátate constantemente</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="camera" size={24} color="#10b981" />
            <Text style={styles.tipText}>Captura cada momento especial</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="heart" size={24} color="#ef4444" />
            <Text style={styles.tipText}>Respeta la cultura y naturaleza local</Text>
          </View>
        </View>
      </View>

      {/* Botón para ver todas */}
      <TouchableOpacity
        style={styles.allButton}
        onPress={() => navigation.navigate('ActividadesFlow')}
      >
        <Text style={styles.allButtonText}>Ver Todas las Actividades</Text>
        <Ionicons name="arrow-forward" size={20} color="#007bff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e9ecef',
    marginTop: 5,
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    width: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  allButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  allButtonText: {
    fontSize: 16,
    color: '#007bff',
    marginRight: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
});