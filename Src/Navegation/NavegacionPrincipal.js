import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Animated } from "react-native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAppContext } from "../../Screen/Configuracion/AppContext";
import InicioStack from "./Stack/InicioStack";
import PerfilesStack from "./Stack/PerfilesStack";
import ConfiguracionesStack from "./Stack/ConfiguracionesStack";
import ComentariosStack from "./Stack/ComentariosStack";
import EmpresasStack from "./Stack/EmpresasStack";
import AdministradoresStack from "./Stack/AdministradoresStack";
import MunicipiosStack from "./Stack/MunicipiosStack";
import Categorias_ActividadesStack from "./Stack/Categorias_ActividadesStack";
import ReservasStack from "./Stack/ReservasStack";
import UsuariosStack from "./Stack/UsuariosStack";
import ActividadesStack from "./Stack/ActividadesStack";

const Stack = createNativeStackNavigator();

export default function NavegacionPrincipal() {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { logout, userRole } = useAppContext();

  const allModules = [
    { name: 'Inicio', stack: 'Main', icon: 'home-outline' },
    { name: 'Perfil', stack: 'PerfilesStack', icon: 'person-outline' },
    { name: 'Configuración', stack: 'ConfiguracionesStack', icon: 'settings-outline' },
    { name: 'Usuarios', stack: 'UsuariosStack', icon: 'people-outline' },
    { name: 'Comentarios', stack: 'ComentariosStack', icon: 'chatbubble-outline' },
    { name: 'Reservas', stack: 'ReservasStack', icon: 'calendar-outline' },
    { name: 'Actividades', stack: 'ActividadesStack', icon: 'bicycle-outline' },
    { name: 'Categorías', stack: 'Categorias_ActividadesStack', icon: 'list-outline' },
    { name: 'Administradores', stack: 'AdministradoresStack', icon: 'shield-outline' },
    { name: 'Empresas', stack: 'EmpresasStack', icon: 'business-outline' },
    { name: 'Municipios', stack: 'MunicipiosStack', icon: 'map-outline' },
  ];

  const roleModules = {
    administrador: ['Inicio', 'Perfil', 'Configuración', 'Usuarios', 'Comentarios', 'Reservas', 'Actividades', 'Categorías', 'Administradores', 'Empresas', 'Municipios'],
    empresa: ['Inicio', 'Perfil', 'Configuración', 'Usuarios', 'Empresas', 'Actividades', 'Categorías', 'Municipios'],
    usuario: ['Inicio', 'Perfil', 'Configuración', 'Comentarios', 'Reservas', 'Actividades', 'Categorías', 'Municipios', 'Usuarios']
  };

  const allowedModules = allModules.filter(module => roleModules[userRole]?.includes(module.name));

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={InicioStack}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <Text style={styles.searchText}>Buscar actividades...</Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#e1f5fe' },
            headerLeft: () => (
              <TouchableOpacity onPress={openMenu} style={{ marginLeft: 15 }}>
                <Ionicons name="menu" size={24} color="#000" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('ReservasStack')} style={styles.headerIcon}>
                  <Ionicons name="calendar-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PerfilesStack')} style={styles.headerIcon}>
                  <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen name="PerfilesStack" component={PerfilesStack} options={{ headerShown: false }} />
        <Stack.Screen name="ConfiguracionesStack" component={ConfiguracionesStack} options={{ headerShown: false }} />
        <Stack.Screen name="ComentariosStack" component={ComentariosStack} options={{ headerShown: false }} />
        <Stack.Screen name="EmpresasStack" component={EmpresasStack} options={{ headerShown: false }} />
        <Stack.Screen name="AdministradoresStack" component={AdministradoresStack} options={{ headerShown: false }} />
        <Stack.Screen name="MunicipiosStack" component={MunicipiosStack} options={{ headerShown: false }} />
        <Stack.Screen name="Categorias_ActividadesStack" component={Categorias_ActividadesStack} options={{ headerShown: false }} />
        <Stack.Screen name="ReservasStack" component={ReservasStack} options={{ headerShown: false }} />
        <Stack.Screen name="UsuariosStack" component={UsuariosStack} options={{ headerShown: false }} />
        <Stack.Screen name="ActividadesStack" component={ActividadesStack} options={{ headerShown: false }} />
      </Stack.Navigator>

      {menuVisible && (
        <Modal transparent={true} animationType="none" onRequestClose={closeMenu}>
          <TouchableOpacity style={styles.overlay} onPress={closeMenu} activeOpacity={1}>
            <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
              <Text style={styles.menuTitle}>WorldTravels</Text>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                {allowedModules.map(item => (
                  <TouchableOpacity
                    key={item.stack}
                    style={styles.menuItem}
                    onPress={() => {
                      closeMenu();
                      navigation.navigate(item.stack);
                    }}
                  >
                    <Ionicons name={item.icon} size={24} color="#007bff" style={styles.menuIcon} />
                    <Text style={styles.menuItemText}>{item.name}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.arrowIcon} />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.menuItem, styles.logoutItem]}
                  onPress={async () => {
                    closeMenu();
                    await logout();
                    navigation.reset({ index: 0, routes: [] });
                  }}
                >
                  <Ionicons name="log-out-outline" size={24} color="#d32f2f" style={styles.menuIcon} />
                  <Text style={[styles.menuItemText, styles.logoutText]}>Cerrar Sesión</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007bff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 5,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: 200,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    color: '#666',
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 15,
  },
  headerIcon: {
    marginLeft: 15,
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 20,
    paddingTop: 20,
  },
  logoutText: {
    color: '#d32f2f',
  },
});
