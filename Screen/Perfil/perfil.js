import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottonComponent from '../../Components/BottonComponents';
import { useAppContext } from '../Configuracion/AppContext';
import { listarUsuarios } from '../../Src/Navegation/Service/UsuariosService';
import { listarComentarios } from '../../Src/Navegation/Service/ComentariosService';
import { listarReservas } from '../../Src/Navegation/Service/ReservasService';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {
  const { logout, userRole, userEmail } = useAppContext();
   const [usuario, setUsuario] = useState({});
   const [stats, setStats] = useState({ viajes: 0, comentarios: 0, calificacion: 0 });
   const [userComentarios, setUserComentarios] = useState([]);
   const [userReservas, setUserReservas] = useState([]);
   const [localPhoto, setLocalPhoto] = useState(null);

  const cargarDatos = async () => {
    const photo = await AsyncStorage.getItem('userPhoto');
    setLocalPhoto(photo);
    console.log("Cargando datos del perfil", { userRole, userEmail });
    if (userRole === 'usuario' && userEmail) {
      const usuariosResult = await listarUsuarios();
      console.log("Resultado listarUsuarios:", usuariosResult);
      let usuarioData = null;
      if (usuariosResult.success) {
        usuarioData = usuariosResult.data.find(u => u.Email === userEmail);
        console.log("Usuario encontrado:", usuarioData);
        if (usuarioData) {
          setUsuario(usuarioData);
        }
      }

      if (usuarioData) {
        // Cargar estadísticas
        const [comentariosResult, reservasResult] = await Promise.all([
          listarComentarios(),
          listarReservas()
        ]);

        const userComentariosFiltered = comentariosResult.success ? comentariosResult.data.filter(c => c.usuario?.Email === userEmail) : [];
        const userReservas = reservasResult.success ? reservasResult.data.filter(r => r.idUsuario == usuarioData.id) : [];

        const calificacionPromedio = userComentariosFiltered.length > 0 ? userComentariosFiltered.reduce((sum, c) => sum + c.Calificacion, 0) / userComentariosFiltered.length : 0;

        setUserComentarios(userComentariosFiltered);
        setUserReservas(userReservas);
        setStats({
          viajes: userReservas.length,
          comentarios: userComentariosFiltered.length,
          calificacion: calificacionPromedio.toFixed(1)
        });
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarDatos();
    }, [userRole, userEmail, usuario.id])
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
       {/* <View style={styles.header}>
         <Text style={styles.title}>Mi Perfil</Text>
         <Ionicons name="person-circle" size={60} color="#0A74DA" />
       </View> */}

      <View style={styles.profileCard}>
        <Image
          source={{ uri: localPhoto || usuario.Foto_Perfil || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&v=1' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{usuario.Nombre || 'Usuario'} {usuario.Apellido || ''}</Text>
        <Text style={styles.role}>Usuario Activo</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>{usuario.Email || 'No disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>{usuario.Telefono || 'No disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>{usuario.Nacionalidad || 'No disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="star" size={24} color="#0A74DA" />
          <Text style={styles.infoText}>Usuario Registrado</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <TouchableOpacity style={styles.stat} onPress={() => navigation.navigate('MisReservas', { reservas: userReservas })}>
          <Text style={styles.statNumber}>{stats.viajes}</Text>
          <Text style={styles.statLabel}>Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stat} onPress={() => navigation.navigate('ComentariosUsuario', { comentarios: userComentarios })}>
          <Text style={styles.statNumber}>{stats.comentarios}</Text>
          <Text style={styles.statLabel}>Comentarios</Text>
        </TouchableOpacity>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{stats.calificacion}</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <BottonComponent title="Editar Perfil" onPress={() => navigation.navigate('editarUsuario', { usuario })} />
      </View>
     </ScrollView>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 100,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 700,
    height: 700,
    borderRadius: 350,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#0A74DA',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#0A74DA',
    fontStyle: 'italic',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    minWidth: 80,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A74DA',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonContainer: {
    gap: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  commentItem: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  noComments: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#0A74DA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A74DA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postInfo: {
    flex: 1,
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  postActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});