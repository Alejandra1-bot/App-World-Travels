import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { listarMunicipios } from "../../Src/Navegation/Service/MunicipiosService";
import { listarEmpresas } from "../../Src/Navegation/Service/EmpresaService";
import { listarCategorias } from "../../Src/Navegation/Service/CategoriasService";

export default function DetalleActividad() {
  const route = useRoute();
  const navigation = useNavigation();
  const { actividad } = route.params;

  const [municipios, setMunicipios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [municipiosResult, empresasResult, categoriasResult] = await Promise.all([
          listarMunicipios(),
          listarEmpresas(),
          listarCategorias()
        ]);
        if (municipiosResult.success) setMunicipios(municipiosResult.data);
        if (empresasResult.success) setEmpresas(empresasResult.data);
        if (categoriasResult.success) setCategorias(categoriasResult.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const municipio = municipios.find(m => m.id == actividad.idMunicipio);
  const empresa = empresas.find(e => e.id == actividad.idEmpresa);
  const categoria = categorias.find(c => c.id == actividad.idCategoria);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        {actividad.Imagen && actividad.Imagen !== 'default.jpg' && (
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image source={{ uri: actividad.Imagen }} style={styles.headerImage} />
          </TouchableOpacity>
        )}

      </View>

      {/* Información */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>🎯 Nombre de la Actividad:</Text>
        <Text style={styles.value}>{actividad.Nombre_Actividad || actividad.nombre}</Text>

        <Text style={styles.label}>🏢 Empresa:</Text>
        <Text style={styles.value}>{empresa ? empresa.Nombre_Empresa || empresa.nombre : 'Sin empresa'}</Text>

        <Text style={styles.label}>📂 Categoría:</Text>
        <Text style={styles.value}>{categoria ? categoria.Nombre_Categoria : 'Sin categoría'}</Text>

        <Text style={styles.label}>🏙️ Municipio:</Text>
        <Text style={styles.value}>{municipio ? municipio.Nombre_Municipio : 'Sin municipio'}</Text>

        <Text style={styles.label}>📍 Ubicación:</Text>
        <Text style={styles.value}>{actividad.Ubicacion || actividad.ubicacion}</Text>

        <Text style={styles.label}>🗓️ Fecha:</Text>
        <Text style={styles.value}>{actividad.Fecha_Actividad || actividad.fecha}</Text>

        <Text style={styles.label}>⏰ Hora:</Text>
        <Text style={styles.value}>{actividad.Hora_Actividad || actividad.hora}</Text>

        <Text style={styles.label}> Precio:</Text>
        <Text style={styles.value}>${actividad.Precio || actividad.precio}</Text>

        <Text style={styles.label}>👥 Cupo máximo:</Text>
        <Text style={styles.value}>{actividad.Cupo_Maximo || actividad.cupoMaximo}</Text>

        <Text style={styles.label}>📄 Descripción:</Text>
        <Text style={styles.value}>{actividad.Descripcion || actividad.descripcion}</Text>
      </View>

      {/* Botón volver */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}> Volver</Text>
      </TouchableOpacity>

      {/* Modal para imagen */}
      <Modal visible={imageModalVisible} transparent={true} onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setImageModalVisible(false)}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: actividad.Imagen }} style={styles.modalImage} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: "absolute",
    resizeMode: "cover", //contain
  },
  headerOverlay: {
    backgroundColor: "rgba(37, 99, 235, 0.7)",
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  headerSub: { fontSize: 18, color: "#fff", fontWeight: "bold" },
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
    backgroundColor: "#a8bce1ff",
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});
