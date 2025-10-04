import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
 import  Inicio from "../../../Screen/Inicio/inicio"
  import Modulos from '../../../Screen/Inicio/Modulos';
  import ActividadesStack from './ActividadesStack';
  import ComentariosStack from './ComentariosStack';
  import DepartamentosStack from './DepartamentosStack';
  import MunicipiosStack from './MunicipiosStack';
  import ReservasStack from './ReservasStack';
  import Categorias_ActividadesStack from './Categorias_ActividadesStack';
  import UsuariosStack from './UsuariosStack';
  import Perfil from '../../../Screen/Perfil/perfil';
  import Configuracion from '../../../Screen/Configuracion/configuracion';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Inicio') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Configuracion') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0A74DA',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Inicio"
                component={Inicio}
                options={{ title: 'Inicio' }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{ title: 'Perfil' }}
            />
            <Tab.Screen
                name="Configuracion"
                component={Configuracion}
                options={{ title: 'Configuración' }}
            />
        </Tab.Navigator>
    );
}

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
