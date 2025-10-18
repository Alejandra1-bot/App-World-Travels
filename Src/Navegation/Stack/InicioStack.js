import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
 
  import Modulos from '../../../Screen/Inicio/Modulos';
  import ActividadesStack from './ActividadesStack'
  import ComentariosStack from './ComentariosStack';
  import DepartamentosStack from './DepartamentosStack';
  import MunicipiosStack from './MunicipiosStack';
  import ReservasStack from './ReservasStack';
  import Categorias_ActividadesStack from './Categorias_ActividadesStack';
  import UsuariosStack from './UsuariosStack';
 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function InicioStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Modulos"
                component={Modulos}
                options={{ title: 'Módulos' }}
            />
            <Stack.Screen
                name="ActividadesFlow"
                component={ActividadesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ComentariosFlow"
                component={ComentariosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DepartamentosFlow"
                component={DepartamentosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MunicipiosFlow"
                component={MunicipiosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ReservasFlow"
                component={ReservasStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Categorias_ActividadesFlow"
                component={Categorias_ActividadesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UsuariosFlow"
                component={UsuariosStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
