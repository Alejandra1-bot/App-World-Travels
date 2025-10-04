// Servicio simulado para Reservas
const reservas = [
  {
    id: 1,
    usuarioId: 1,
    actividadId: 1,
    fechaReserva: '2023-10-15',
    estado: 'Confirmada',
    precio: 50000,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    usuarioId: 2,
    actividadId: 2,
    fechaReserva: '2023-10-20',
    estado: 'Pendiente',
    precio: 30000,
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export const getReservas = () => reservas;

export const getReservaById = (id) => reservas.find(r => r.id === id);

export const createReserva = (data) => {
  const newReserva = { id: reservas.length + 1, ...data };
  reservas.push(newReserva);
  return newReserva;
};

export const updateReserva = (id, data) => {
  const index = reservas.findIndex(r => r.id === id);
  if (index !== -1) {
    reservas[index] = { ...reservas[index], ...data };
    return reservas[index];
  }
  return null;
};

export const deleteReserva = (id) => {
  const index = reservas.findIndex(r => r.id === id);
  if (index !== -1) {
    return reservas.splice(index, 1)[0];
  }
  return null;
};