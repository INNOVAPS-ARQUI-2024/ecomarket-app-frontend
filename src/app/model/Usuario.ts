export interface Usuario {
  userId: string;
  name: string;
  email: string;
  role: string;  // "Comprador" o "Vendedor"
  profilePicture?: string;  // Imagen de perfil opcional
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  tiposVendedor?: string[];  // Ejemplo: ["producto", "servicio", "evento"]
}