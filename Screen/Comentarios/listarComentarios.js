import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getComentarios } from "../../Src/Navegation/Service/ComentariosService";

export default function ListarComentario({ navigation }) {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        setComentarios(getComentarios());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('detalleComentario', { comentario: item })}
        >
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.usuario}</Text>
                    <View style={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                            <Ionicons
                                key={i}
                                name={i < item.calificacion ? "star" : "star-outline"}
                                size={16}
                                color="#FFD700"
                            />
                        ))}
                    </View>
                </View>
            </View>
            <Text style={styles.comment}>{item.comentario}</Text>
            <Text style={styles.date}>{item.fecha}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Comentarios</Text>
            <FlatList
                data={comentarios}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('editarComentario', { comentario: null })}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Comentario</Text>
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
        padding: 15,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userInfo: {
        marginLeft: 10,
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
    },
    rating: {
        flexDirection: 'row',
        marginTop: 2,
    },
    comment: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
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