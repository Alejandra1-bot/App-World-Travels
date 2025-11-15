import api from "./Conexion";
import { listarActividades } from "./ActividadService";
import { listarUsuarios } from "./UsuariosService";

export const listarReservas= async () => {
    try {
    const response = await api.get("/listarReservas");
    const reservas = response.data;

    // Fetch actividades and usuarios to map names
    const [actividadesRes, usuariosRes] = await Promise.all([
        listarActividades(),
        listarUsuarios()
    ]);

    if (actividadesRes.success && usuariosRes.success) {
        const actividadesMap = actividadesRes.data.reduce((map, act) => {
            map[act.id] = act.Nombre_Actividad || act.nombre_actividad;
            return map;
        }, {});

        const usuariosMap = usuariosRes.data.reduce((map, user) => {
            map[user.id] = user.Nombre || user.nombre;
            return map;
        }, {});

        // Add names to reservas
        const reservasConNombres = reservas.map(reserva => ({
            ...reserva,
            nombreActividad: actividadesMap[reserva.idActividad] || "Actividad no encontrada",
            nombreUsuario: usuariosMap[reserva.idUsuario] || "Usuario no encontrado"
        }));

        return {success: true, data: reservasConNombres};
    } else {
        // If fetching fails, return original data
        return {success: true, data: reservas};
    }

    } catch (error) {
        console.error("Error al listar las Reservas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
}
 
export const eliminarReservas = async (id) => {
    try {
        await api.delete(`/eliminarReservas/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar la Reserva:", error.response ? error.response.data : error.message);
        return {
        success: false,
        message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
}

export const crearReservas = async (data) => {
    try {
        const response = await api.post("/crearReservas", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear la Reserva:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
};
export const actualizarReservas = async (id, data) => {
    try {
        const response = await api.put(`/actualizarReservas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar la Reserva:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
};



