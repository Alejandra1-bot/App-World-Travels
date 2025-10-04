import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarMunicipios from '../../../Screen/Municipios/listarMunicipios';
import detalleMunicipio from '../../../Screen/Municipios/detalleMunicipio';
import editarMunicipio from '../../../Screen/Municipios/editarMunicipio';

const Stack = createNativeStackNavigator();

export default function MunicipiosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarMunicipios"
        component={listarMunicipios}
        options={{ title: 'Municipios' }}
      />
      <Stack.Screen
        name="detalleMunicipio"
        component={detalleMunicipio}
        options={{ title: 'Detalle Municipio' }}
      />
      <Stack.Screen
        name="editarMunicipio"
        component={editarMunicipio}
        options={{ title: 'Editar Municipio' }}
      />
    </Stack.Navigator>
  );
}