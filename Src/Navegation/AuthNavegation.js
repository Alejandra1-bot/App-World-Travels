import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bienvenida from "../../Screen/Auth/Bienvenida";
import Login from "../../Screen/Auth/Login";
import Registro from "../../Screen/Auth/Registro";
import InicioStack from "./Stack/InicioStack";

const Stack = createNativeStackNavigator();

export default function AuthNavegation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Bienvenida"
                component={Bienvenida}
                options={{ title: 'Bienvenida', headerShown: false }}
           />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Iniciar Sesion'}}
           />
           
            <Stack.Screen
                name="Registro"
                component={Registro}
                options={{ title: 'Registro de Usuarios'}}
           />
            <Stack.Screen
                name="Main"
                component={InicioStack}
                options={{ headerShown: false }}
           />
        </Stack.Navigator>
    )
}