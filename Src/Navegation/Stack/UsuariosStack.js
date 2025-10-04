import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarUsuarios from '../../../Screen/Usuarios/listarUsuarios';
import detalleUsuario from '../../../Screen/Usuarios/detalleUsuario';
import editarUsuario from '../../../Screen/Usuarios/editarUsuario';

const Stack = createNativeStackNavigator();

export default function UsuariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarUsuarios"
        component={listarUsuarios}
        options={{ title: 'Usuarios' }}
      />
      <Stack.Screen
        name="detalleUsuario"
        component={detalleUsuario}
        options={{ title: 'Detalle Usuario' }}
      />
      <Stack.Screen
        name="editarUsuario"
        component={editarUsuario}
        options={{ title: 'Editar Usuario' }}
      />
    </Stack.Navigator>
  );
}