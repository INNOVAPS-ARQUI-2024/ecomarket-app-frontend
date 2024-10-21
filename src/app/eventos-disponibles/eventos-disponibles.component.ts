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
  fechaHoraBusqueda: string = ''; // Inicializar la fecha y hora de búsqueda
  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fechaHoraBusqueda = new Date().toISOString().substring(0, 16); // Formato YYYY-MM-DDTHH:mm
    this.buscarEventos();
  }

  buscarEventos(): void {
    if (this.fechaHoraBusqueda) {
      this.eventoService.getEventosPorFechaHora(this.fechaHoraBusqueda).subscribe(
        (eventos: Evento[]) => {
          this.eventos = eventos;
        },
        error => {
          console.error('Error al buscar eventos:', error);
        }
      );
    } else {
      console.error('Fecha y hora de búsqueda no proporcionadas.');
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