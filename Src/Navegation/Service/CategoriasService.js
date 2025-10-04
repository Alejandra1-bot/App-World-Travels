// Servicio simulado para Categorías de Actividades
const categorias = [
  {
    id: 1,
    nombre: 'Aventura',
    descripcion: 'Actividades al aire libre y emocionantes.',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'Cultural',
    descripcion: 'Experiencias relacionadas con historia y arte.',
    imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    nombre: 'Gastronómica',
    descripcion: 'Degustaciones y tours culinarios.',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getCategorias = () => categorias;

export const getCategoriaById = (id) => categorias.find(c => c.id === id);

export const createCategoria = (data) => {
  const newCategoria = { id: categorias.length + 1, ...data };
  categorias.push(newCategoria);
  return newCategoria;
};

export const updateCategoria = (id, data) => {
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    categorias[index] = { ...categorias[index], ...data };
    return categorias[index];
  }
  return null;
};

export const deleteCategoria = (id) => {
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    return categorias.splice(index, 1)[0];
  }
  return null;
};