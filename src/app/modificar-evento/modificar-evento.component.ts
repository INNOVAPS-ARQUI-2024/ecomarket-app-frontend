import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from '../services/EventoService';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styleUrls: ['./modificar-evento.component.css']
})
export class ModificarEventoComponent implements OnInit {

  evento: Evento = {
    eventoId: '',
    nombre: '',
    lugar: '',
    descripcion: '',
    rangoPrecios: [0, 0],
    fechaHora: new Date(),
    sellerId: '',
    userIds: []
  };

  eventoConCosto: boolean = false; // Agrega esta línea
  precioMinimo: number = 0; // Agrega esta línea
  precioMaximo: number = 1000; // Agrega esta línea

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
  if (id) {
    this.eventoService.getEventoById(id).subscribe(
      (evento: Evento) => {
        this.evento = evento;
      },
      error => {
        console.error('Error al cargar el evento:', error);
      }
    );
  } else {
    console.error('ID de evento no proporcionado.');
    this.router.navigate(['/lista-eventos']);
  }
}

toggleCosto(): void { // Agrega esta función
  if (!this.eventoConCosto) {
    this.evento.rangoPrecios = [0, 0];
  }
}

updateSlider(): void {
  this.evento.rangoPrecios = [this.precioMinimo, this.precioMaximo];
}

guardarCambios(): void {
  const eventoId = this.evento.eventoId;
  if (eventoId) {
    this.eventoService.updateEvento(eventoId, this.evento).subscribe(
      () => {
        console.log('Evento actualizado');
        this.router.navigate(['/lista-eventos']);
      },
      error => {
        console.error('Error al actualizar el evento:', error);
      }
    );
  } else {
    console.error('No se puede actualizar: ID de evento no definido.');
    }
  }
}
