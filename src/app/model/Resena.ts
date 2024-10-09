export interface Resena {
    reviewId?: string;
    itemId: string;   // productId o serviceId
    itemType: string; // Tipo de ítem
    userId: string;
    rating: number;   // Calificación
    comment: string;  // Comentario
    createdAt: Date;
    updatedAt: Date;
}
