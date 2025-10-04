// Servicio simulado para Usuarios
const usuarios = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    apellido: 'García',
    email: 'juan@email.com',
    telefono: '3001234567',
    nacionalidad: 'Colombiano',
    rol: 'usuario',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'María López',
    apellido: 'Rodríguez',
    email: 'maria@email.com',
    telefono: '3019876543',
    nacionalidad: 'Colombiana',
    rol: 'usuario',
    imagen: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getUsuarios = () => usuarios;

export const getUsuarioById = (id) => usuarios.find(u => u.id === id);

export const createUsuario = (data) => {
  const newUsuario = { id: usuarios.length + 1, ...data };
  usuarios.push(newUsuario);
  return newUsuario;
};

export const updateUsuario = (id, data) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...data };
    return usuarios[index];
  }
  return null;
};

export const deleteUsuario = (id) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    return usuarios.splice(index, 1)[0];
  }
  return null;
};