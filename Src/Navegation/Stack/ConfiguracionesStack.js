import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion";
import Apariencia from "../../../Screen/Configuracion/Apariencia";
import Idioma from "../../../Screen/Configuracion/idioma";
import Seguridad from "../../../Screen/Configuracion/Seguridad";
import Notificaciones from "../../../Screen/Configuracion/Notificaciones";
import Soporte from "../../../Screen/Configuracion/Soporte";

const Stack = createNativeStackNavigator();

export default function ConfiguracionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConfiguracionPantalla"
        component={Configuracion}
        options={{ headerShown: false }}
       
      />
      <Stack.Screen
        name="Apariencia"
        component={Apariencia}
        
      />
      <Stack.Screen
        name="idioma"
        component={Idioma}

      />
      <Stack.Screen
        name="Seguridad"
        component={Seguridad}

      />
      <Stack.Screen
        name="Notificaciones"
        component={Notificaciones}
      />
      <Stack.Screen
        name="Soporte"
        component={Soporte}

      />
    </Stack.Navigator>
  );
}