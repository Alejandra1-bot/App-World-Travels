import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarUsuarios from '../../../Screen/Usuarios/listarUsuarios';
import detalleUsuario from '../../../Screen/Usuarios/detalleUsuario';
import editarUsuario from '../../../Screen/Usuarios/editarUsuario';
import { useAppContext } from '../../../Screen/Configuracion/AppContext';

const Stack = createNativeStackNavigator();

export default function UsuariosStack() {
  const { userRole } = useAppContext();

  const screens = [
    { name: 'listarUsuarios', component: listarUsuarios, title: 'Usuarios' },
    { name: 'detalleUsuario', component: detalleUsuario, title: 'Detalle Usuario' },
    ...(userRole === 'administrador' || userRole === 'empresa' ? [{ name: 'editarUsuario', component: editarUsuario, title: 'Gestion de Usuarios' }] : [])
  ];

  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ title: screen.title }}
        />
      ))}
    </Stack.Navigator>
  );
}