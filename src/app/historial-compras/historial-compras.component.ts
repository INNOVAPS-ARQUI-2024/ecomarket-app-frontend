import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/Producto';

@Component({
    selector: 'app-historial-compras',
    templateUrl: './historial-compras.component.html',
    styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
    historialProductos: Producto[] = [
        {
            productId: '1',
            name: 'Producto 1',
            description: 'Descripción del producto 1',
            price: 100,
            currency: 'USD',
            category: 'Tecnología',
            stock: 10,
            sellerId: 'vendedor123',
            reviews: [],
            createdAt: new Date(),
            picture: 'https://via.placeholder.com/80',
            sold: 5
        },
        {
            productId: '2',
            name: 'Producto 2',
            description: 'Descripción del producto 2',
            price: 50,
            currency: 'USD',
            category: 'Moda',
            stock: 20,
            sellerId: 'vendedor456',
            reviews: [],
            createdAt: new Date(),
            picture: 'https://via.placeholder.com/80',
            sold: 3
        }
        // Agrega más productos si es necesario
    ];

    constructor() {}

    ngOnInit(): void {}
}
