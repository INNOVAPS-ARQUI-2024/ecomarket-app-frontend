export interface Producto {
    productId?: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    stock: number;
    sellerId: string;
    reviews: string[]; // Array de reviewIds
    createdAt: Date;
    picture?: string;  // Añadir campo para la imagen (base64 o URL si es necesario)
    sold?: number;     // Añadir campo para las unidades vendidas
}
