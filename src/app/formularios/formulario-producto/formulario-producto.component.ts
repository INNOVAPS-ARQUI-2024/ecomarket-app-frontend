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

  errorMessage: string = '';  // Variable to store error message

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    // Aquí nos suscribimos una sola vez al estado de autenticación
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.producto.sellerId = user.uid;
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }

  // Validate stock to ensure it's an integer and greater than zero
  validateStock(): boolean {
    if (this.producto.stock <= 0 || !Number.isInteger(this.producto.stock)) {
      this.errorMessage = 'La cantidad en stock debe ser un número entero positivo.';
      return false;
    }
    return true;
  }

  // Validate price to ensure it is non-negative
  validatePrice(): boolean {
    if (this.producto.price < 0) {
      this.errorMessage = 'El precio no puede ser negativo.';
      return false;
    }
    return true;
  }

  // Validate name, description, and category to ensure they are not empty
  validateFields(): boolean {
    if (!this.producto.name.trim() || !this.producto.description.trim() || !this.producto.category.trim()) {
      this.errorMessage = 'El nombre, descripción y categoría no pueden estar vacíos.';
      return false;
    }
    return true;
  }

  // onSubmit: Se ejecuta cuando el formulario es enviado
  onSubmit(): void {
    if (!this.validateFields() || !this.validateStock() || !this.validatePrice()) {
      return;  // No proceder si la validación falla
    }
  
    if (!this.producto.sellerId) {
      console.error('No se ha asignado un sellerId.');
      return;
    }
  
    // Llama al servicio para crear el producto
    this.productoService.createProducto(this.producto).subscribe(
      response => {
        console.log('Producto creado:', response);
        this.router.navigate(['/home-usuario']);
      },
      error => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
  

}
