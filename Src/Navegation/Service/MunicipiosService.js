import api from "./Conexion";

export const listarMunicipios= async () => {
    try {
    const response = await api.get("/listarMunicipios");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar los Municipios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}
 
export const eliminarMunicipios = async (id) => {
    try {
        await api.delete(`/eliminarMunicipios/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar el  Municipio:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearMunicipios = async (data) => {
    try {
        const response = await api.post("/crearMunicipios", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear el Municipio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarMunicipios = async (id, data) => {
    try {
        const response = await api.put(`/actualizarMunicipios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el Municipio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



