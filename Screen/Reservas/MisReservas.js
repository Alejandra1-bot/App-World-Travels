import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ReservaCard from '../../Components/ReservasCard';
import { actualizarReservas } from '../../Src/Navegation/Service/ReservasService';

export default function MisReservas({ navigation }) {
  const route = useRoute();
  const { reservas, onUpdate } = route.params || { reservas: [] };

  const handleCancel = async (reservaId) => {
    Alert.alert(
      "Confirmar Cancelación",
      "¿Estás seguro de cancelar esta reserva?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const result = await actualizarReservas(reservaId, { Estado: 'Cancelada' });
              if (result.success) {
                Alert.alert("Éxito", "Reserva cancelada");
                if (onUpdate) onUpdate();
              } else {
                Alert.alert("Error", result.message);
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo cancelar la reserva");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mis Reservas</Text>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              onCancel={() => handleCancel(reserva.id)}
              onPress={() => navigation.navigate('detalleReserva', { reserva })}
            />
          ))
        ) : (
          <Text style={styles.noReservas}>No tienes reservas registradas.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  noReservas: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});