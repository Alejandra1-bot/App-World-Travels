import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getCategorias } from "../../Src/Navegation/Service/CategoriasService";

export default function ListarCategoriaActividad({ navigation }) {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        setCategorias(getCategorias());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleCategoria_Actividad', { categoria: item })}
        >
            <View style={styles.info}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <View style={styles.stats}>
                    <Ionicons name="list" size={16} color="#0A74DA" />
                    <Text style={styles.statText}>{item.numeroActividades} actividades</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Categorías de Actividades</Text>
            <FlatList
                data={categorias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarCategoria_Actividad', { categoria: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Categoría</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#EAF6FF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#003366',
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        lineHeight: 20,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A74DA',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});