import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent {
  nombreProducto: string = '';
  descripcion: string = '';
  tipoProductoSeleccionado: { [key: string]: boolean } = {};  // Aquí almacenamos los tipos seleccionados
  tipoProducto: string[] = ['Ropa', 'Tecnología', 'Alimentos', 'Mascotas'];

  constructor(private router: Router) {}

  onSubmit() {
    // Esta parte no cambia por ahora
    this.router.navigate(['/home-usuario']);
  }
}
