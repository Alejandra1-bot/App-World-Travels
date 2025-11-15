import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { listarUsuarios } from "../../Src/Navegation/Service/UsuariosService";
import { listarActividades } from "../../Src/Navegation/Service/ActividadService";

export default function DetalleComentario() {
  const route = useRoute();
  const navigation = useNavigation();

  // Recibimos el comentario enviado desde la pantalla anterior
  const { comentario } = route.params;

  const [usuarios, setUsuarios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [usuariosResult, actividadesResult] = await Promise.all([
          listarUsuarios(),
          listarActividades()
        ]);
        if (usuariosResult.success) setUsuarios(usuariosResult.data);
        if (actividadesResult.success) setActividades(actividadesResult.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const usuario = usuarios.find(u => u.id == comentario.idUsuario);
  const actividad = actividades.find(a => a.id == comentario.idActividad);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Ionicons name="chatbubble-ellipses-outline" size={80} color="#fff" />
        <Text style={styles.headerTitle}>Detalle del Comentario</Text>
      </View>

      {/* INFORMACIÓN DEL COMENTARIO */}
      <View style={styles.infoBox}>
        
        {/* Contenido */}
        <Text style={styles.label}>📝 Contenido:</Text>
        <Text style={styles.value}>{ comentario.Contenido }</Text>

        {/* Calificación */}
        <Text style={styles.label}>⭐ Calificación:</Text>
        <Text style={styles.value}>{ comentario.Calificacion }</Text>

        {/* Fecha */}
        <Text style={styles.label}>📅 Fecha:</Text>
        <Text style={styles.value}>{ comentario.Fecha_Comentario }</Text>

        {/* Usuario: mostrar nombre, NO idUsuario */}
        <Text style={styles.label}>🙋 Usuario:</Text>
        <Text style={styles.value}>
          { usuario ? usuario.Nombre || usuario.nombre : "Nombre no disponible" }
        </Text>

        {/* Actividad: mostrar nombre */}
        <Text style={styles.label}>🏞️ Actividad:</Text>
        <Text style={styles.value}>
          { actividad ? actividad.nombre || actividad.Nombre_Actividad : "Nombre no disponible" }
        </Text>

      </View>

      {/* BOTÓN VOLVER */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}> Volver</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },

  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 8 },

  infoBox: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginTop: 10 },

  value: { fontSize: 16, color: "#111", marginBottom: 8 },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    margin: 16,
  },

  buttonText: { color: "#fff", fontSize: 16, marginLeft: 8, fontWeight: "600" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
