export interface Servicio {
  serviceId?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  providerId: string;
  availability: string;
  reviews: string[];
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
}
