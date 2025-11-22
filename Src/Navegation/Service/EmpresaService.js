import api from "./Conexion";

export const listarEmpresas= async () => {
    try {
    const response = await api.get("/listarEmpresas");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar empresas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
}
 
export const eliminarEmpresas = async (id) => {
    try {
        await api.delete(`/eliminarEmpresas/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar la empresa:", error.response ? error.response.data : error.message);
        return {
        success: false,
        message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
}

export const crearEmpresas = async (data) => {
    try {
        const response = await api.post("/crearEmpresas", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear la empresa:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
};
export const actualizarEmpresas = async (id, data) => {
    try {
        const response = await api.put(`/actualizarEmpresas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        // console.error("Error al editar la empresa:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? (error.response.data.message || "Error desconocido") : "Error de conexion ",
        };
    }
};



