// src/app/model/evento.model.ts
export interface Evento {
    eventoId?: string;         // El ID del evento, opcional ya que lo genera el backend
    nombre: string;            // Nombre del evento
    lugar: string;             // Lugar donde se llevará a cabo el evento
    descripcion: string;       // Descripción del evento
    rangoPrecios: number[];    // Rango de precios para el evento, como array [min, max]
    fechaHora: Date;           // Fecha y hora del evento, en formato Date
    sellerId: string;            // ID del usuario creador del evento (vendedor)
    userIds: string[];         // Lista de IDs de usuarios asociados al evento (inscritos, interesados, etc.)
}
