import api from "./Conexion";

export const listarActividades= async () => {
    try {
    const response = await api.get("/listarActividades");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar Actividades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}
 
export const eliminarActividades = async (id) => {
    try {
        await api.delete(`/eliminarActividades/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar la Actividad", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearActividades = async (data) => {
    try {
        const response = await api.post("/crearActividades", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear la Actividad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarActividades = async (id, data) => {
    try {
        const response = await api.put(`/actualizarActividades/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar la Actividad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



