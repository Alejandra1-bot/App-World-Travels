import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL="http://10.2.234.136:8000/api";

// const API_BASE_URL="https://noninterpretive-lizabeth-accusatival.ngrok-free.dev/api";


const api = axios.create({
    baseURL: API_BASE_URL,
     headers:{
        "Accept": "application/json",
        "Content-Type": "application/json",
     },
});

const RutasPublicas = ['/login', '/registrar', '/actualizarMedicos']; //rutas de api que no requieren autenticacion

api.interceptors.request.use(

    async (config) => {
        const EsRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));
        if (!EsRutaPublica) { 
            const userToken = await AsyncStorage.getItem("userToken")
            if (userToken) {
            config.headers.Authorization= `Bearer ${userToken}`;      
            }
        }
        return config;
          
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,

    async(error) => {
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));

        if (error.response && error.response.status === 401 && !originalRequest._retry && !isRutaPublica) {
            originalRequest._retry = true;
            // await AsyncStorage.removeItem("userToken"); // elimina el token guardado
            console.log("Token expirado o no autorizado, pero no se elimina el token");
        }
        return Promise.reject(error);
    }
);

export default api;