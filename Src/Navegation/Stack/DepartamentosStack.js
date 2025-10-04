import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarDepartamentos from '../../../Screen/Departamentos/listarDepartamentos';
import detalleDepartamento from '../../../Screen/Departamentos/detalleDepartamento';
import editarDepartamento from '../../../Screen/Departamentos/editarDepartamento';

const Stack = createNativeStackNavigator();

export default function DepartamentosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarDepartamentos"
        component={listarDepartamentos}
        options={{ title: 'Departamentos' }}
      />
      <Stack.Screen
        name="detalleDepartamento"
        component={detalleDepartamento}
        options={{ title: 'Detalle Departamento' }}
      />
      <Stack.Screen
        name="editarDepartamento"
        component={editarDepartamento}
        options={{ title: 'Editar Departamento' }}
      />
    </Stack.Navigator>
  );
}