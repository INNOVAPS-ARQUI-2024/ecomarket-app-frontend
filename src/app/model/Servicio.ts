export interface Servicio {
  serviceId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  providerId: string;
  availability: string;
  reviews: string[];  // Array de IDs de reseñas
  createdAt: Date;
  updatedAt: Date;
}
