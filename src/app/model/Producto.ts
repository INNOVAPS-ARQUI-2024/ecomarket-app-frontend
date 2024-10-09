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
}
