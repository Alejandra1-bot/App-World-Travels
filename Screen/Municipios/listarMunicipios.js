import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getMunicipios } from "../../Src/Navegation/Service/MunicipiosService";

export default function ListarMunicipio({ navigation }) {
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        setMunicipios(getMunicipios());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleMunicipio', { municipio: item })}
        >
            <View style={styles.info}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.department}>Departamento: {item.departamento}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <View style={styles.stats}>
                    <Ionicons name="people" size={16} color="#0A74DA" />
                    <Text style={styles.statText}>{item.poblacion.toLocaleString()} habitantes</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="map" size={20} color="#0A74DA" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Municipios de Boyacá</Text>
            <FlatList
                data={municipios}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarMunicipio', { municipio: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Municipio</Text>
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
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    info: {
        flex: 1,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    department: {
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
    mapButton: {
        padding: 10,
        backgroundColor: '#F0F8FF',
        borderRadius: 20,
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