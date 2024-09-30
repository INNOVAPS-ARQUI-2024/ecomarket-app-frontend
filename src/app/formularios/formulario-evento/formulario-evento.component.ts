import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-evento',
  templateUrl: './formulario-evento.component.html',
  styleUrls: ['./formulario-evento.component.css']
})
export class FormularioEventoComponent {
  fechaHora: string = '';
  nombreEvento: string = '';
  lugar: string = '';
  descripcion: string = '';
  rangoPrecios: number = 50;  // Valor inicial para el rango de precios

  constructor(private router: Router) { }

  onSubmit() {
    console.log(this.fechaHora);
    console.log(this.nombreEvento);
    console.log(this.lugar);
    console.log(this.descripcion);
    console.log(this.rangoPrecios);  // Muestra el valor del rango de precios
    this.router.navigate(['/home-usuario']);
  }
}
