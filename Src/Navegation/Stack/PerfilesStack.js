import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../../../Screen/Perfil/Perfil";
import CitasPaciente from "../../../Screen/Perfil/CitasPaciente";
import HistorialMedico from "../../../Screen/Perfil/HistorialMedico";
import EditarPerfil from "../../../Screen/Perfil/EditarPerfil";


const Stack = createNativeStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerfilPantalla"j
        component={Perfil}
        options={{ headerShown: false }}
      />
   
    <Stack.Screen 
    name="CitasPaciente" 
    component={CitasPaciente}
     />
   <Stack.Screen
    name="HistorialMedico"
    component={HistorialMedico}
     />
   <Stack.Screen
    name="EditarPerfil"
     component={EditarPerfil} 
     />
 </Stack.Navigator>
  );
}
