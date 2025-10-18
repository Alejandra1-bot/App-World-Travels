import api from "./Conexion";

export const listarDepartamentos= async () => {
    try {
    const response = await api.get("/listarDepartamentos");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar los  Departamentos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}
 
export const eliminarDepartamentos = async (id) => {
    try {
        await api.delete(`/eliminarDepartamentos/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar el  Departamento:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearDepartamentos = async (data) => {
    try {
        const response = await api.post("/crearDepartamentos", data );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear el Departamento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};
export const actualizarDepartamentos = async (id, data) => {
    try {
        const response = await api.put(`/actualizarDepartamentos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el Departamento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }
};



