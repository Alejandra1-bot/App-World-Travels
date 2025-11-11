import api from "./Conexion";

export const listarUsuarios= async () => {
    try {
    const response = await api.get("/listarUsuarios");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar los Usuarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}
 
export const eliminarUsuarios = async (id) => {
    try {
        await api.delete(`/eliminarUsuarios/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar el  Usuario:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearUsuarios = async (data) => {
    try {
        const response = await api.post("/crearUsuarios", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear el Usuarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarUsuarios = async (id, data) => {
    try {
        const response = await api.put(`/actualizarUsuarios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el Usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};

export const bloquearUsuario = async (id) => {
    try {
        const response = await api.put(`/bloquearUsuarios/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al bloquear el Usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



