import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bienvenida from "../../Screen/Auth/Bienvenida";
import Login from "../../Screen/Auth/Login";
import Registro from "../../Screen/Auth/Registro";
import RecuperarContrasena from "../../Screen/Auth/RecuperarConstraseña";
import VerificarCodigo from "../../Screen/Auth/VerificarCodigo";
import ResetPassword from "../../Screen/Auth/ResetPassword";
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
          < Stack.Screen
               name="RecuperarContrasena"
               component={RecuperarContrasena}
               options={{ title: 'Recuperar Contraseña'}}
             />
             <Stack.Screen
               name="VerificarCodigo"
               component={VerificarCodigo}
               options={{ title: 'Verificar Código'}}
             />

             <Stack.Screen
               name="ResetPassword"
               component={ResetPassword}
               options={{ title: 'Restablecer Contraseña'}}
             />
        </Stack.Navigator>
    )
}