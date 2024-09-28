export interface Usuario {
  userId: string;
  name: string;
  email: string;
  role: string;  // Rol (Comprador o Vendedor)
  profilePicture?: string;  // Imagen de perfil opcional
  phone?: string;  // Teléfono opcional
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
