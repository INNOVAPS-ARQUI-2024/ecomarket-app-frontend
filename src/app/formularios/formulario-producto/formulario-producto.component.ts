import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent {
  producto: Producto = {
    productId: '',
    name: '',
    description: '',
    price: 0,        // Campo no visible en el formulario
    currency: '',    // Campo no visible en el formulario
    category: '',
    stock: 0,        // Campo no visible en el formulario
    sellerId: '',
    reviews: [],     // Campo no visible en el formulario
    createdAt: new Date()
  };

  constructor(private router: Router) { }

  onSubmit() {
    console.log(this.producto);
    this.router.navigate(['/home-usuario']);
  }
}