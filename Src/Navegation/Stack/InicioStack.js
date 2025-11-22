import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../../Screen/Configuracion/AppContext';

import HomeDashboard from '../../../Screen/Inicio/HomeDashboard';
import Modulos from '../../../Screen/Inicio/Modulos';
import InicioAdmin from '../../../Screen/Inicio/InicioAdmin';
import InicioEmpresa from '../../../Screen/Inicio/InicioEmpresa';
import ActividadesStack from './ActividadesStack'
import ComentariosStack from './ComentariosStack';
import MunicipiosStack from './MunicipiosStack';
import ReservasStack from './ReservasStack';
import Categorias_ActividadesStack from './Categorias_ActividadesStack';
import UsuariosStack from './UsuariosStack';
import AdministradoresStack from './AdministradoresStack';
import EmpresasStack from './EmpresasStack';
 

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function TabNavigator() {
//   const { userRole } = useAppContext();

//   // Determinar qué componente mostrar según el rol
//   const getHomeComponent = () => {
//     switch (userRole) {
//       case 'administrador':
//         return InicioAdmin;
//       case 'empresa':
//         return InicioEmpresa;
//       default:
//         return Modulos;
//     }
//   };

//   const HomeComponent = getHomeComponent();

//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Inicio"
//         component={HomeComponent}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default function InicioStack(){
    return(
        <Stack.Navigator>

            <Stack.Screen
                name="HomeDashboard"
                component={HomeDashboard}
                options={{ headerShown: false }}
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
            <Stack.Screen
                name="AdministradoresFlow"
                component={AdministradoresStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EmpresasFlow"
                component={EmpresasStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

