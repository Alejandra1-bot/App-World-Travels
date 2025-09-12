import{ StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CardComponents({tittle, description, icon}) {
    return(
        <TouchableOpacity style={styles.card}> //TouchableOpacity es un boton con un efecto 
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={32} color="#ffffff" />
                </View>

                <View>
                <Text style={styles.tittle}>{tittle}</Text>
                <Text style={styles.description}>{description}</Text>   
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%',
        aLignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    iconContainer: {
        width: 64,
        height: 64, 
        borderRadius: 32,
        backgroundColor: '#4a90e2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    textContainer: {
        felex: 1,
        alignItems: 'center',
    },

    tittle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1976D2',
    },

    description: {
        fontSize: 14,
        color: '#757575',
        
    },



});