import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/model/Servicio';
import { ServicioService } from 'src/app/services/ServicioService';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html',
  styleUrls: ['./formulario-servicio.component.css']
})
export class FormularioServicioComponent {
  servicio: Servicio = {
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
  

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private afAuth: AngularFireAuth  // Para obtener el ID del usuario autenticado
  ) {}

  onSubmit() {
    // Obtener el ID del usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.servicio.providerId = user.uid;  // Asignar el providerId del usuario autenticado

        // Llamar al servicio para crear el servicio
        this.servicioService.createServicio(this.servicio).subscribe(
          response => {
            console.log('Servicio creado:', response);
            this.router.navigate(['/home-usuario']);  // Redirigir después de la creación exitosa
          },
          error => {
            console.error('Error al crear el servicio:', error);
          }
        );
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }
}
