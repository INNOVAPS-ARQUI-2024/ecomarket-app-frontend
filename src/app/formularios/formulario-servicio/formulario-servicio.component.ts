import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html',
  styleUrls: ['./formulario-servicio.component.css']
})
export class FormularioServicioComponent {
  nombreServicio: string = '';
  descripcion: string = '';
  tipoServicio: string[] = ['Educación', 'Tecnología', 'Mascotas', 'Salud y bienestar', 'Hogar y decoración', 'Alimentación'];  // Lista de tipos de servicio
  tipoServicioSeleccionado: { [key: string]: boolean } = {};  // Objeto para guardar el estado de los checkboxes

  constructor(private router: Router) { }


  onSubmit() {
    this.router.navigate(['/home-usuario']);

  }
}
