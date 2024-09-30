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
    price: 0,
    category: '',
    providerId: '',
    availability: '',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  errorMessage: string = '';  // Variable para almacenar el mensaje de error

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  // Validar que el precio sea mayor o igual a 0
  validatePrice(): boolean {
    if (this.servicio.price < 0) {
      this.errorMessage = 'El precio no puede ser negativo.';
      return false;
    }
    return true;
  }

  // Validar que los campos de nombre, descripción, categoría y disponibilidad no estén vacíos
  validateFields(): boolean {
    if (!this.servicio.name.trim() || !this.servicio.description.trim() || !this.servicio.category.trim() || !this.servicio.availability.trim()) {
      this.errorMessage = 'El nombre, descripción, categoría y disponibilidad no pueden estar vacíos.';
      return false;
    }
    return true;
  }

  // Función principal de validación
  onSubmit() {
    // Validar los campos
    if (!this.validateFields() || !this.validatePrice()) {
      return;  // No proceder si falla alguna validación
    }

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
