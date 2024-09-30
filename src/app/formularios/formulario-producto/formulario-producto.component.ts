import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductoService } from 'src/app/services/ProductoService';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent {
  producto: Producto = {
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    category: '',
    stock: 0,
    sellerId: '',
    reviews: [],
    createdAt: new Date()
  };

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  onSubmit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.producto.sellerId = user.uid; // Asignar el sellerId del usuario autenticado

        // Llamar al servicio para crear el producto
        this.productoService.createProducto(this.producto).subscribe(
          response => {
            console.log('Producto creado:', response);
            this.router.navigate(['/home-usuario']);  // Redirigir después de la creación exitosa
          },
          error => {
            console.error('Error al crear el producto:', error);
          }
        );
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }
}
