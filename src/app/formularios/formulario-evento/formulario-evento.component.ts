// src/app/component/formulario-evento.component.ts
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/EventoService';

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
  precioMinimo: number = 100; // Valor mínimo inicial del rango de precios
  precioMaximo: number = 500; // Valor máximo inicial del rango de precios
  userId: string = ''; // ID del usuario autenticado
  errorMessage: string = ''; // Variable para almacenar mensajes de error

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    // Obtener el UID del usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.router.navigate(['/login']); // Redirigir si no está autenticado
      }
    });
  }

  updateSlider() {
    // Si el valor del slider mínimo supera al máximo, lo igualamos al máximo
    if (this.precioMinimo >= this.precioMaximo) {
      this.precioMinimo = this.precioMaximo - 1;  // Restamos 1 para evitar que sean iguales
    }
  
    // Si el valor del slider máximo es menor o igual al mínimo, lo igualamos al mínimo
    if (this.precioMaximo <= this.precioMinimo) {
      this.precioMaximo = this.precioMinimo + 1;  // Sumamos 1 para evitar que sean iguales
    }
  
    // Actualiza la visualización del rango seleccionado
    this.actualizarVisualizacionSlider();
  }
  
  actualizarVisualizacionSlider() {
    const rangeSelected = document.querySelector('.range-selected') as HTMLElement;
    const minSlider = document.querySelector('.min') as HTMLInputElement;
    const maxSlider = document.querySelector('.max') as HTMLInputElement;
  
    // Calcula el porcentaje de la parte seleccionada del rango y ajusta el estilo
    const minPercent = (Number(minSlider.value) / Number(minSlider.max)) * 100;
    const maxPercent = (Number(maxSlider.value) / Number(maxSlider.max)) * 100;
  
    rangeSelected.style.left = `${minPercent}%`;
    rangeSelected.style.right = `${100 - maxPercent}%`;
  }
  
  
  
  

  // Validar campos requeridos
  validateFields(): boolean {
    if (!this.nombreEvento.trim() || !this.lugar.trim() || !this.descripcion.trim()) {
      this.errorMessage = 'El nombre, lugar y descripción no pueden estar vacíos.';
      return false;
    }
    return true;
  }

  // Enviar los datos al servicio para crear un nuevo evento
  onSubmit() {
    // Valida los campos antes de proceder
    if (!this.validateFields()) {
      return;
    }

    // Crea el nuevo evento
    const nuevoEvento: Evento = {
      nombre: this.nombreEvento,
      lugar: this.lugar,
      descripcion: this.descripcion,
      rangoPrecios: [this.precioMinimo, this.precioMaximo], // Rango de precios como array [min, max]
      fechaHora: new Date(this.fechaHora), // Convierte la fecha y hora a tipo Date
      userId: this.userId // ID del creador autenticado
    };

    // Llama al servicio para crear el evento
    this.eventoService.createEvento(nuevoEvento).subscribe(
      response => {
        console.log('Evento creado:', response);
        this.router.navigate(['/home-usuario']); // Redirige a home después de crear
      },
      error => {
        console.error('Error al crear el evento:', error);
      }
    );
  }
}
