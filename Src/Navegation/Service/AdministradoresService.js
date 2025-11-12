import api from "./Conexion";

export const listarAdministradores = async () => {
  try {
    const response = await api.get("/listarAdministradores");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar administradores:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearAdministrador = async (data) => {
  try {
    const response = await api.post("/crearAdministrador", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear administrador:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const actualizarAdministrador = async (id, data) => {
  try {
    const response = await api.put(`/actualizarAdministrador/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al actualizar administrador:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarAdministrador = async (id) => {
  try {
    await api.delete(`/eliminarAdministrador/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar administrador:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};