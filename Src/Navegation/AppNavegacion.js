import { NavigationContainer } from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation";

export default function AppNavegacion(){
    return(
        <NavigationContainer>
            <AuthNavegation/>
        </NavigationContainer>
    );
}