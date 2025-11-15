import api from "./Conexion";

export const listarComentarios= async () => {
    try {
    const response = await api.get("/listarComentarios");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar los Comentarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}
 
export const eliminarComentarios = async (id) => {
    try {
        await api.delete(`/eliminarComentarios/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar el  Comentario:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearComentarios = async (data) => {
    try {
        const response = await api.post("/crearComentarios", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear el Comentario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarComentarios = async (id, data) => {
    try {
        const response = await api.put(`/actualizarComentarios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el Comentario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



