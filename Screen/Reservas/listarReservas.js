
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getReservas } from "../../Src/Navegation/Service/ReservasService";

export default function ListarReserva({ navigation }) {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        setReservas(getReservas());
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmada': return '#4CAF50';
            case 'Pendiente': return '#FF9800';
            case 'Cancelada': return '#F44336';
            default: return '#9E9E9E';
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleReserva', { reserva: item })}
        >
            <View style={styles.info}>
                <Text style={styles.activity}>Actividad ID: {item.actividadId}</Text>
                <Text style={styles.date}>Fecha: {item.fechaReserva}</Text>
                <Text style={styles.price}>Precio: ${item.precio}</Text>
                <View style={[styles.status, { backgroundColor: getStatusColor(item.estado) }]}>
                    <Text style={styles.statusText}>{item.estado}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Mis Reservas</Text>
            <FlatList
                data={reservas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarReservas', { reserva: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Nueva Reserva</Text>
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
    activity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#0A74DA',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    status: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
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
