import {  ScrollView, StatusBar } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import CardComponents from "../../Components/CardComponents";


    export default function Inicio(){
        return(
          <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>BIENVENIDOS</Text>
                <Text style={styles.Subtitle}>Estado <Text style={styles.StatusText}> Habilitado</Text></Text>
                <Text style={styles.Subtitle}>Selecciona una Opcion</Text>
             </View> 
             
         <View style={styles.gridContainer}> 
            <CardComponents
            tittle="Actividades"
            description=" Gestión de Actividades."
            icon="people-outline"
            />
            <CardComponents
            tittle="Departamentos"
            description=" Gestión de Departamentos."
            icon="calendar-outline"
            />
            <CardComponents
            tittle="Comentarios"
            description=" Gestión de Comentarios."
            icon="cash-outline"
            />
            <CardComponents
            tittle="Categorias_Actividades"
            description=" Gestión de Categorias_Actividades."
            icon="card-outline"
            />
            <CardComponents
            tittle="Reservas"
            description=" Gestión de Reservas."
            icon="card-outline"
            />
            <CardComponents
            tittle="Municipios"
            description=" Gestión de Municipios."
            icon="card-outline"
            />
            <CardComponents
            tittle="Usuarios"
            description=" Gestión de Usuarios."
            icon="card-outline"
            />


         </View>
        </ScrollView>
        )
    }

 const styles = StyleSheet.create({
    gridContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        
    },

    });  