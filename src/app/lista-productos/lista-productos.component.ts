import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  userId: string | null = null;  // Almacena el ID del usuario autenticado
  action: string = '';  // Puede ser 'modificar', 'eliminar' o vacío para mostrar ambos

  constructor(
    private productoService: ProductoService,
    private afAuth: AngularFireAuth,  // Inyectamos el servicio de autenticación
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
  
        // Cargar los productos del usuario autenticado
        if (this.userId) {
          this.productoService.getProductosPorUsuario(this.userId).subscribe(
            (productos: Producto[]) => {
              this.productos = productos;
            },
            error => {
              console.error('Error al cargar productos:', error);
            }
          );
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  

  goBack(): void {
    this.router.navigate(['/']); // O la ruta que definas para regresar
  }

  modificarProducto(productId: string): void {
    if (productId) {
      this.router.navigate([`/modificar-producto/${productId}`]); // Redirige a la página de modificación con el ID en la URL
    } else {
      console.error('Producto ID no válido.');
    }
  }
  // Redirigir para agregar un nuevo producto
  agregarProducto(): void {
    // Implementa la lógica para agregar un producto o redirigir a la página correspondiente
    console.log('Redirigir a la página para añadir un nuevo producto');
  }


  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(
        () => {
          // Actualizar la lista de productos después de eliminar
          this.productos = this.productos.filter(producto => producto.productId !== id);
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
