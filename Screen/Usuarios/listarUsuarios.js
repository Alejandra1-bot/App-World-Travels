import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getUsuarios } from "../../Src/Navegation/Service/UsuariosService";

export default function ListarUsuario({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(getUsuarios());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleUsuario', { usuario: item })}
        >
            <View style={styles.info}>
                <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>Rol: {item.rol}</Text>
                <Text style={styles.location}>{item.nacionalidad}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Usuarios Registrados</Text>
            <FlatList
                data={usuarios}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarUsuario', { usuario: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Usuario</Text>
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
    email: {
        fontSize: 14,
        color: '#0A74DA',
        marginBottom: 3,
    },
    role: {
        fontSize: 12,
        color: '#555',
        marginBottom: 3,
    },
    location: {
        fontSize: 12,
        color: '#555',
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


