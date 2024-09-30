import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/model/Servicio';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html',
  styleUrls: ['./formulario-servicio.component.css']
})
export class FormularioServicioComponent {
  servicio: Servicio = {
    serviceId: '',
    name: '',
    description: '',
    price: 0,           // Campo no visible en el formulario
    category: '',
    providerId: '',
    availability: '',    // Campo no visible en el formulario
    reviews: [],         // Campo no visible en el formulario
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private router: Router) { }

  onSubmit() {
    console.log(this.servicio);
    this.router.navigate(['/home-usuario']);
  }
}