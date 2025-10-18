import api from "./Conexion";

export const listarReservas= async () => {
    try {
    const response = await api.get("/listarReservas");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar las Reservas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
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
        message: error.response ? error.response.data : "Error de conexion ",
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
            message: error.response ? error.response.data : "Error de conexion ",
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
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



