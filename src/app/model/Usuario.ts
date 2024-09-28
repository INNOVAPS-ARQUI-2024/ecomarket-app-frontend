export interface Usuario {
    userId: string;         // ID único del usuario
    name: string;           // Nombre del usuario
    email: string;          // Correo electrónico del usuario
    role: string;           // Rol (ej. Comprador, Vendedor)
    profilePicture?: string; // URL de la imagen de perfil (opcional)
    createdAt: Date;        // Fecha de creación del usuario
    updatedAt: Date;        // Fecha de actualización
    isActive: boolean;      // Estado de actividad del usuario
  }
  