import { NavigationContainer } from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

import NavegacionPrincipal from "./NavegacionPrincipal";

export default function AppNavegacion(){
   const { isAuthenticated } = useAppContext();

    return(
        <NavigationContainer>
           {isAuthenticated ? <NavegacionPrincipal/> : <AuthNavegation/>}
        </NavigationContainer>
    );
}