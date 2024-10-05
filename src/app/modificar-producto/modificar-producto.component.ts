import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  producto: Producto = {
    name: '',
    description: '',
    price: 0,
    currency: '',
    category: '',
    stock: 0,  // El stock está aquí
    sellerId: '',
    reviews: [],
    createdAt: new Date()
  };

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
    if (id) {
      this.productoService.getProductoById(id).subscribe(
        (producto: Producto) => {
          this.producto = producto;
        },
        error => {
          console.error('Error al cargar el producto:', error);
        }
      );
    } else {
      console.error('ID de producto no proporcionado.');
      this.router.navigate(['/lista-productos']);
    }
  }

  guardarCambios(): void {
    const productId = this.producto.productId;
    if (productId) {
      this.productoService.updateProducto(productId, this.producto).subscribe(
        () => {
          console.log('Producto actualizado');
          this.router.navigate(['/lista-productos']);
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.error('No se puede actualizar: ID de producto no definido.');
    }
  }
}
