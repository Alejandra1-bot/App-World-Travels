// Servicio simulado para Actividades
const actividades = [
  {
    id: 1,
    nombre: 'Senderismo en Villa de Leyva',
    descripcion: 'Disfruta de rutas naturales en el corazón de Boyacá.',
    precio: 50000,
    categoria: 'Aventura',
    ubicacion: 'Villa de Leyva',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'Tour por Raquira',
    descripcion: 'Explora la cultura y artesanías locales.',
    precio: 30000,
    categoria: 'Cultural',
    ubicacion: 'Raquira',
    imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getActividades = () => actividades;

export const getActividadById = (id) => actividades.find(a => a.id === id);

export const createActividad = (data) => {
  const newActividad = { id: actividades.length + 1, ...data };
  actividades.push(newActividad);
  return newActividad;
};

export const updateActividad = (id, data) => {
  const index = actividades.findIndex(a => a.id === id);
  if (index !== -1) {
    actividades[index] = { ...actividades[index], ...data };
    return actividades[index];
  }
  return null;
};

export const deleteActividad = (id) => {
  const index = actividades.findIndex(a => a.id === id);
  if (index !== -1) {
    return actividades.splice(index, 1)[0];
  }
  return null;
};