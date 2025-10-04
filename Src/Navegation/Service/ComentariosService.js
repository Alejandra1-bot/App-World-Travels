// Servicio simulado para Comentarios
const comentarios = [
  {
    id: 1,
    actividadId: 1,
    usuario: 'Juan Pérez',
    comentario: '¡Excelente experiencia! Recomiendo totalmente.',
    calificacion: 5,
    fecha: '2023-10-01'
  },
  {
    id: 2,
    actividadId: 2,
    usuario: 'María García',
    comentario: 'Muy buena organización, volvería.',
    calificacion: 4,
    fecha: '2023-10-02'
  },
];

export const getComentarios = () => comentarios;

export const getComentariosByActividad = (actividadId) => comentarios.filter(c => c.actividadId === actividadId);

export const createComentario = (data) => {
  const newComentario = { id: comentarios.length + 1, ...data };
  comentarios.push(newComentario);
  return newComentario;
};

export const updateComentario = (id, data) => {
  const index = comentarios.findIndex(c => c.id === id);
  if (index !== -1) {
    comentarios[index] = { ...comentarios[index], ...data };
    return comentarios[index];
  }
  return null;
};

export const deleteComentario = (id) => {
  const index = comentarios.findIndex(c => c.id === id);
  if (index !== -1) {
    return comentarios.splice(index, 1)[0];
  }
  return null;
};