import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottonComponent from '../../Components/BottonComponents';
import { useState } from 'react';

export default function Configuracion({ navigation }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [ubicacion, setUbicacion] = useState(true);
  const [idioma, setIdioma] = useState('Español');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={50} color="#0A74DA" />
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications" size={24} color="#0A74DA" />
            <Text style={styles.optionText}>Notificaciones</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: '#767577', true: '#0A74DA' }}
            thumbColor={notificaciones ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="moon" size={24} color="#0A74DA" />
            <Text style={styles.optionText}>Modo Oscuro</Text>
          </View>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: '#767577', true: '#0A74DA' }}
            thumbColor={modoOscuro ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="location" size={24} color="#0A74DA" />
            <Text style={styles.optionText}>Ubicación</Text>
          </View>
          <Switch
            value={ubicacion}
            onValueChange={setUbicacion}
            trackColor={{ false: '#767577', true: '#0A74DA' }}
            thumbColor={ubicacion ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="language" size={24} color="#0A74DA" />
          <Text style={styles.optionText}>Idioma: {idioma}</Text>
          <Ionicons name="chevron-forward" size={24} color="#0A74DA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="key" size={24} color="#0A74DA" />
          <Text style={styles.optionText}>Cambiar Contraseña</Text>
          <Ionicons name="chevron-forward" size={24} color="#0A74DA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="shield" size={24} color="#0A74DA" />
          <Text style={styles.optionText}>Privacidad</Text>
          <Ionicons name="chevron-forward" size={24} color="#0A74DA" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="help-circle" size={24} color="#0A74DA" />
          <Text style={styles.optionText}>Ayuda</Text>
          <Ionicons name="chevron-forward" size={24} color="#0A74DA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="information-circle" size={24} color="#0A74DA" />
          <Text style={styles.optionText}>Acerca de</Text>
          <Ionicons name="chevron-forward" size={24} color="#0A74DA" />
        </TouchableOpacity>
      </View>

      <BottonComponent title="Guardar Cambios" onPress={() => alert('Cambios guardados')} />
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
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});