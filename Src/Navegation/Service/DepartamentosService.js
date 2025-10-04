// Servicio simulado para Departamentos
const departamentos = [
  {
    id: 1,
    nombre: 'Boyacá',
    descripcion: 'Departamento con rica historia y naturaleza.',
    poblacion: 1210000,
    capital: 'Tunja',
    imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'Cundinamarca',
    descripcion: 'Centro del país con Bogotá como capital.',
    poblacion: 3000000,
    capital: 'Bogotá',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getDepartamentos = () => departamentos;

export const getDepartamentoById = (id) => departamentos.find(d => d.id === id);

export const createDepartamento = (data) => {
  const newDepartamento = { id: departamentos.length + 1, ...data };
  departamentos.push(newDepartamento);
  return newDepartamento;
};

export const updateDepartamento = (id, data) => {
  const index = departamentos.findIndex(d => d.id === id);
  if (index !== -1) {
    departamentos[index] = { ...departamentos[index], ...data };
    return departamentos[index];
  }
  return null;
};

export const deleteDepartamento = (id) => {
  const index = departamentos.findIndex(d => d.id === id);
  if (index !== -1) {
    return departamentos.splice(index, 1)[0];
  }
  return null;
};