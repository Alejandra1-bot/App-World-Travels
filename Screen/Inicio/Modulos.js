import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardComponents from '../../Components/CardComponents';

export default function Modulos({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Módulos</Text>
      <View style={styles.gridContainer}>
        <CardComponents
          tittle="Actividades"
          description=" Gestión de Actividades."
          icon="people-outline"
          onPress={() => navigation.navigate('ActividadesFlow')}
        />
        <CardComponents
          tittle="Departamentos"
          description=" Gestión de Departamentos."
          icon="calendar-outline"
          onPress={() => navigation.navigate('DepartamentosFlow')}
        />
        <CardComponents
          tittle="Comentarios"
          description=" Gestión de Comentarios."
          icon="chatbubble-outline"
          onPress={() => navigation.navigate('ComentariosFlow')}
        />
        <CardComponents
          tittle="Categorías Actividades"
          description=" Gestión de Categorías."
          icon="list-outline"
          onPress={() => navigation.navigate('Categorias_ActividadesFlow')}
        />
        <CardComponents
          tittle="Reservas"
          description=" Gestión de Reservas."
          icon="bookmark-outline"
          onPress={() => navigation.navigate('ReservasFlow')}
        />
        <CardComponents
          tittle="Municipios"
          description=" Gestión de Municipios."
          icon="location-outline"
          onPress={() => navigation.navigate('MunicipiosFlow')}
        />
        <CardComponents
          tittle="Usuarios"
          description=" Gestión de Usuarios."
          icon="person-outline"
          onPress={() => navigation.navigate('UsuariosFlow')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF6FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});