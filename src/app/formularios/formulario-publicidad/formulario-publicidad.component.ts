import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-publicidad',
  templateUrl: './formulario-publicidad.component.html',
  styleUrls: ['./formulario-publicidad.component.css']
})
export class FormularioPublicidadComponent {
  tipoPublicidad: string = '';
  objetivo: string = '';
  rangoPrecios: number = 50;  // Valor inicial para el rango de precios
  fechaHora: string = '';     // Para almacenar la fecha y hora

  constructor(private router: Router) { }

  onSubmit() {
    console.log(this.fechaHora);
    console.log(this.tipoPublicidad);
    console.log(this.objetivo);
    console.log(this.rangoPrecios);  // Muestra el valor del rango de precios
    this.router.navigate(['/home-usuario']);
  }
}
