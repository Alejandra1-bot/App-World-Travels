import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

export default function ComentariosUsuario({ navigation }) {
  const route = useRoute();
  const { comentarios } = route.params || { comentarios: [] };
  const [reactionComments, setReactionComments] = useState({});
  const [showReactionSelector, setShowReactionSelector] = useState({});

  const selectReaction = (commentId, reaction) => {
    setReactionComments(prev => ({
      ...prev,
      [commentId]: reaction
    }));
    setShowReactionSelector(prev => ({
      ...prev,
      [commentId]: false
    }));
  };

  const toggleReactionSelector = (commentId) => {
    setShowReactionSelector(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const getReactionIcon = (reaction) => {
    switch (reaction) {
      case 'like': return 'thumbs-up';
      case 'love': return 'heart';
      case 'laugh': return 'happy';
      case 'angry': return 'flame';
      default: return 'thumbs-up-outline';
    }
  };

  const getReactionColor = (reaction) => {
    switch (reaction) {
      case 'like': return '#0A74DA';
      case 'love': return '#FF0000';
      case 'laugh': return '#FFD700';
      case 'angry': return '#FF4500';
      default: return '#666';
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mis Comentarios</Text>
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => {
            const inicial = comentario.usuario?.Nombre ? comentario.usuario.Nombre.charAt(0).toUpperCase() : "?";
            const reaction = reactionComments[comentario.id] || 'none';
            const reactionCount = 0; // Start from zero
            const showSelector = showReactionSelector[comentario.id] || false;
            return (
              <View key={comentario.id} style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{inicial}</Text>
                  </View>
                  <View style={styles.commentInfo}>
                    <Text style={styles.commentName}>{comentario.usuario?.Nombre || 'Usuario'}</Text>
                    <Text style={styles.commentTime}>{comentario.Fecha_Comentario}</Text>
                  </View>
                </View>
                <Text style={styles.commentContent}>{comentario.Contenido}</Text>
                <View style={styles.commentActivity}>
                  {comentario.actividad?.Nombre_Actividad && (
                    <Text style={styles.activityText}>Actividad calificada: {comentario.actividad.Nombre_Actividad}</Text>
                  )}
                  <View style={styles.rating}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Ionicons
                        key={i}
                        name={i < comentario.Calificacion ? "star" : "star-outline"}
                        size={16}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.likeButton} onPress={() => toggleReactionSelector(comentario.id)}>
                    <Ionicons name={getReactionIcon(reaction)} size={20} color={getReactionColor(reaction)} />
                    <Text style={[styles.likeText, { color: getReactionColor(reaction) }]}>{reaction !== 'none' ? 1 : 0}</Text>
                  </TouchableOpacity>
                  {showSelector && (
                    <View style={styles.reactionSelector}>
                      <TouchableOpacity onPress={() => selectReaction(comentario.id, 'like')}>
                        <Ionicons name="thumbs-up" size={24} color="#0A74DA" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => selectReaction(comentario.id, 'love')}>
                        <Ionicons name="heart" size={24} color="#FF0000" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => selectReaction(comentario.id, 'laugh')}>
                        <Ionicons name="happy" size={24} color="#FFD700" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => selectReaction(comentario.id, 'angry')}>
                        <Ionicons name="flame" size={24} color="#FF4500" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.noComments}>No tienes comentarios registrados.</Text>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  commentContainer: {
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
  commentHeader: {
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
  commentInfo: {
    flex: 1,
  },
  commentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  commentActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
  },
  noComments: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
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
  reactionSelector: {
    flexDirection: 'row',
    marginLeft: 10,
    gap: 10,
  },
});