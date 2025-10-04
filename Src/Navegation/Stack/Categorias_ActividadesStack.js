import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarCategorias_Actividades from '../../../Screen/Categorias_Actividades/listarCategorias_Actividades';
import detalleCategoria_Actividad from '../../../Screen/Categorias_Actividades/detalleCategoria_Actividad';
import editarCategoria_Actividad from '../../../Screen/Categorias_Actividades/editarCategoria_Actividad';

const Stack = createNativeStackNavigator();

export default function Categorias_ActividadesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarCategorias_Actividades"
        component={listarCategorias_Actividades}
        options={{ title: 'Categorías de Actividades' }}
      />
      <Stack.Screen
        name="detalleCategoria_Actividad"
        component={detalleCategoria_Actividad}
        options={{ title: 'Detalle Categoría' }}
      />
      <Stack.Screen
        name="editarCategoria_Actividad"
        component={editarCategoria_Actividad}
        options={{ title: 'Editar Categoría' }}
      />
    </Stack.Navigator>
  );
}