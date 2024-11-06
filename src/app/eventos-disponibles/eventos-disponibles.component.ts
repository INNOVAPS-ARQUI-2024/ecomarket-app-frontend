import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/EventoService';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';


@Component({
  selector: 'app-eventos-disponibles',
  templateUrl: './eventos-disponibles.component.html',
  styleUrls: ['./eventos-disponibles.component.css']
})
export class EventosDisponiblesComponent implements OnInit {
  fechaBusqueda: string = ''; // Inicializar la fecha y hora de búsqueda
  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fechaBusqueda = new Date().toISOString().substring(0, 16); 
  }

  private formatDate(fechaISO: string): string {
    return fechaISO.split('T')[0]; // Extrae solo la fecha
  }
  
  buscarEventos(): void {
  const fechaSolo = this.formatDate(this.fechaBusqueda);
  if (fechaSolo) {
    this.eventoService.getEventosPorFecha(fechaSolo).subscribe(
      (eventos: Evento[]) => {
        if (eventos.length > 0) {
          this.eventos = eventos;
        } else {
          console.warn('No se encontraron eventos para esta fecha.');
        }
      },
      error => {
        console.error('Error al buscar eventos:', error);
        alert('Ocurrió un error al buscar eventos. Inténtelo de nuevo más tarde.');
      }
    );
  } else {
    console.error('Fecha de búsqueda no proporcionada.');
    alert('Por favor, proporcione una fecha válida.');
  }
}


  registrarse(eventoId: string): void {
    if (eventoId) {
      this.router.navigate([`/registro-evento/${eventoId}`]);
    } else {
      console.error('ID del evento no proporcionado.');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}