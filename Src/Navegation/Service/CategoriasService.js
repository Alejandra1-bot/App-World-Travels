import api from "./Conexion";

export const listarCategorias= async () => {
    try {
    const response = await api.get("/listarCategorias");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar las categorias:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}
 
export const eliminarCategorias = async (id) => {
    try {
        await api.delete(`/eliminarCategorias/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar la Categoria:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearCategorias = async (data) => {
    try {
        const response = await api.post("/crearCategorias", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear la  Categoria:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarCategorias = async (id, data) => {
    try {
        const response = await api.put(`/actualizarCategorias/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar la  Categoria:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



