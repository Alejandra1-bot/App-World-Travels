import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../../../Screen/Perfil/perfil";
import ComentariosUsuario from "../../../Screen/Comentarios/ComentariosUsuario";
import editarUsuario from "../../../Screen/Usuarios/editarUsuario";
import MisReservas from "../../../Screen/Reservas/MisReservas";


const Stack = createNativeStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerfilPantalla"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComentariosUsuario"
        component={ComentariosUsuario}
        options={{ title: 'Mis Comentarios' }}
      />
      <Stack.Screen
        name="editarUsuario"
        component={editarUsuario}
        options={{ title: 'Editar Mi Perfil' }}
      />
      <Stack.Screen
        name="MisReservas"
        component={MisReservas}
        options={{ title: 'Mis Reservas' }}
      />
    </Stack.Navigator>
  );
}
