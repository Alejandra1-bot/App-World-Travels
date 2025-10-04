import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listarComentarios from '../../../Screen/Comentarios/listarComentarios';
import detalleComentario from '../../../Screen/Comentarios/detalleComentario';
import editarComentario from '../../../Screen/Comentarios/editarComentario';

const Stack = createNativeStackNavigator();

export default function ComentariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listarComentarios"
        component={listarComentarios}
        options={{ title: 'Comentarios' }}
      />
      <Stack.Screen
        name="detalleComentario"
        component={detalleComentario}
        options={{ title: 'Detalle Comentario' }}
      />
      <Stack.Screen
        name="editarComentario"
        component={editarComentario}
        options={{ title: 'Editar Comentario' }}
      />
    </Stack.Navigator>
  );
}