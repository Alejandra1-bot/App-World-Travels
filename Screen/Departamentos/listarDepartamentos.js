
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getDepartamentos } from "../../Src/Navegation/Service/DepartamentosService";

export default function ListarDepartamento({ navigation }) {
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        setDepartamentos(getDepartamentos());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleDepartamento', { departamento: item })}
        >
            <View style={styles.info}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.capital}>Capital: {item.capital}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <View style={styles.stats}>
                    <Ionicons name="people" size={16} color="#0A74DA" />
                    <Text style={styles.statText}>{item.poblacion.toLocaleString()} habitantes</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Departamentos de Colombia</Text>
            <FlatList
                data={departamentos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarDepartamento', { departamento: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Departamento</Text>
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
    capital: {
        fontSize: 14,
        color: '#0A74DA',
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
        lineHeight: 16,
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


