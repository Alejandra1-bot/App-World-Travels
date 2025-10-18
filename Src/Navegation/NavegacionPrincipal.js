import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import InicioStack from "./Stack/InicioStack";
import PerfilesStack from "./Stack/PerfilesStack";
import ConfiguracionesStack from "./Stack/ConfiguracionsStack";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  const { colors, userRole } = useAppContext();

  const renderTabs = () => {
    const tabs = [];

    // Inicio para todos
    tabs.push(
      <Tab.Screen
        key="Inicio"
        name="Inicio"
        component={InicioStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Inicio",
        }}
      />
    );

    // Perfil para todos
    tabs.push(
      <Tab.Screen
        key="Perfil"
        name="Perfil"
        component={PerfilesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: "Perfil",
        }}
      />
    );

    // Configuración para todos
    tabs.push(
      <Tab.Screen
        key="Configuración"
        name="Configuración"
        component={ConfiguracionesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: "Configuración",
        }}
      />
    );

    return tabs;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        // Estilos para la barra de pestañas en general
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          marginBottom: 6,
        },
        // colores de los iconos y texto de la pestaña
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginTop: 2,
        },
      }}
    >
      {renderTabs()}
    </Tab.Navigator>
  );
}
