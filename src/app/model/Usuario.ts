export interface Usuario {
  userId?: string;
  name: string;
  email: string;
  role: string;  // "Comprador", "Vendedor", o "Admin"
  profilePicture?: string;  // Imagen de perfil opcional
  phone?: string;
  address: string; // Dirección de envío (obligatoria)
  paymentMethods?: string[]; // Métodos de pago
  notificationPreferences?: string[]; // Preferencias de notificación
  approved: boolean; // Nuevo campo para indicar si está aprobado
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  tiposVendedor?: string[]; // Ejemplo: ["producto", "servicio", "evento"]
}
