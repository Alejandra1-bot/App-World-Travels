import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../../../Screen/Perfil/perfil";


const Stack = createNativeStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerfilPantalla"
        component={Perfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
