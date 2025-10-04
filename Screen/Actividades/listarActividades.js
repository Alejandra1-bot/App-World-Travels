import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getActividades } from "../../Src/Navegation/Service/ActividadService";

export default function ListarActividad ({ navigation }){
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        setActividades(getActividades());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleActividad', { actividad: item })}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <Text style={styles.price}>Precio: ${item.precio}</Text>
            </View>
        </TouchableOpacity>
    );

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Actividades Disponibles</Text>
            <FlatList
                data={actividades}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarActividad', { actividad: null })}
            >
                <Text style={styles.addButtonText}>Agregar Actividad</Text>
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
    header: {
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
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A74DA',
    },
    addButton: {
        backgroundColor: '#0A74DA',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});