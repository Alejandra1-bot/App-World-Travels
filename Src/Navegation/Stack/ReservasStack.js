import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarReservas from '../../../Screen/Reservas/listarReservas';
import detalleReserva from '../../../Screen/Reservas/detalleReserva';
import editarReservas from '../../../Screen/Reservas/editarReservas';

const Stack = createNativeStackNavigator();

export default function ReservasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarReservas"
        component={listarReservas}
        options={{ title: 'Reservas' }}
      />
      <Stack.Screen
        name="detalleReserva"
        component={detalleReserva}
        options={{ title: 'Detalle Reserva' }}
      />
      <Stack.Screen
        name="editarReservas"
        component={editarReservas}
        options={{ title: 'Editar Reserva' }}
      />
    </Stack.Navigator>
  );
}