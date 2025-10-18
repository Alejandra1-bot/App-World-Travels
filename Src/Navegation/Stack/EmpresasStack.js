import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarEmpresas from '../../../Screen/Empresa/listarEmpresas';
import editarEmpresa from '../../../Screen/Empresa/editarEmpresa';
import detalleEmpresa from '../../../Screen/Empresa/detalleEmpresa';

const Stack = createNativeStackNavigator();

export default function EmpresasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarEmpresas"
        component={listarEmpresas}
        options={{ title: 'Empresas' }}
      />
      <Stack.Screen
        name="detalleEmpresa"
        component={detalleEmpresa}
        options={{ title: 'Detalle Empresa' }}
      />
      <Stack.Screen
        name="editarEmpresa"
        component={editarEmpresa}
        options={{ title: 'Editar Empresa' }}
      />
    </Stack.Navigator>
  );
}