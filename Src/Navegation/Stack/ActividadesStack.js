import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarActividades from '../../../Screen/Actividades/listarActividades';
import detalleActividad from '../../../Screen/Actividades/detalleActividad';
import editarActividad from '../../../Screen/Actividades/editarActividad';

const Stack = createNativeStackNavigator();

export default function ActividadesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarActividades"
        component={listarActividades}
        options={{ title: 'Actividades' }}
      />
      <Stack.Screen
        name="detalleActividad"
        component={detalleActividad}
        options={{ title: 'Detalle Actividad' }}
      />
      <Stack.Screen
        name="editarActividad"
        component={editarActividad}
        options={{ title: 'Editar Actividad' }}
      />
    </Stack.Navigator>
  );
}