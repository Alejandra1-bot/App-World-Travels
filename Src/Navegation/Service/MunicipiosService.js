// Servicio simulado para Municipios
const municipios = [
  {
    id: 1,
    nombre: 'Villa de Leyva',
    departamento: 'Boyacá',
    descripcion: 'Pueblo colonial con arquitectura histórica.',
    poblacion: 12000,
    imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'Raquira',
    departamento: 'Boyacá',
    descripcion: 'Conocido por sus artesanías en barro.',
    poblacion: 8000,
    imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getMunicipios = () => municipios;

export const getMunicipioById = (id) => municipios.find(m => m.id === id);

export const createMunicipio = (data) => {
  const newMunicipio = { id: municipios.length + 1, ...data };
  municipios.push(newMunicipio);
  return newMunicipio;
};

export const updateMunicipio = (id, data) => {
  const index = municipios.findIndex(m => m.id === id);
  if (index !== -1) {
    municipios[index] = { ...municipios[index], ...data };
    return municipios[index];
  }
  return null;
};

export const deleteMunicipio = (id) => {
  const index = municipios.findIndex(m => m.id === id);
  if (index !== -1) {
    return municipios.splice(index, 1)[0];
  }
  return null;
};