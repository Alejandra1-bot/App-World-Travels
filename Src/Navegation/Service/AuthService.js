import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
// import { crearMedico } from "./MedicoService";
// import { crearPaciente } from "./PacienteService";
// import { crearAdministrador } from "./AdministradorService";

export const loginUser = async (Email, password) => {
    try {
        // Simulación de login
        console.log("Iniciando sesión con:", Email, password);
        const token = "fake-token-" + Date.now();
        const role = 'usuario';
        const userId = 1;
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userRole", role);
        await AsyncStorage.setItem("userId", userId.toString());
        return { success: true, token };
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        return {
            success: false,
            message: "Error de conexión",
        };
    }
};

export const registerUser = async (userData) => {
  try {
    // Simulación de registro sin backend
    console.log("Registrando usuario:", userData);
    return { success: true, data: { id: Date.now(), ...userData } };
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return {
      success: false,
      message: "Error de conexión",
    };
  }
};


export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken"); //  elimina el token guardado
    await AsyncStorage.removeItem("userRole"); // elimina el rol guardado
    await AsyncStorage.removeItem("userId"); // elimina el userId guardado
    console.log("Sesión cerrada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: "Error al cerrar sesión" };
  }
};
