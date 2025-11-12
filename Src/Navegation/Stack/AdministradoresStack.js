import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarAdministradores from '../../../Screen/Administradores/listarAdministradores';
import detalleAdministrador from '../../../Screen/Administradores/detalleAdministrador';
import editarAdministrador from '../../../Screen/Administradores/editarAdministrador';

const Stack = createNativeStackNavigator();

export default function AdministradoresStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarAdministradores"
        component={listarAdministradores}
        options={{ title: 'Administradores' }}
      />
      <Stack.Screen
        name="detalleAdministrador"
        component={detalleAdministrador}
        options={{ title: 'Detalle Administrador' }}
      />
      <Stack.Screen
        name="editarAdministrador"
        component={editarAdministrador}
        options={{ title: 'Editar Administrador' }}
      />
    </Stack.Navigator>
  );
}