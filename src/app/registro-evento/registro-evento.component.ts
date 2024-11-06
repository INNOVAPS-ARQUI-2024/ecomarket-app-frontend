import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EventoService } from '../services/EventoService';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../model/Evento';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css']
})
export class RegistroEventoComponent implements OnInit {
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
  userId: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventoId = this.route.snapshot.paramMap.get('eventoId');
    if (eventoId) {
      this.eventoService.getEventoById(eventoId).subscribe(
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

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registrar(): void {
    if (this.userId && this.evento.eventoId) {  // Asegurarse de que userId y eventoId no sean null antes de usarlos
      this.eventoService.registrarUsuarioEnEvento(this.evento.eventoId, this.userId).subscribe(
        response => {
          console.log('Confirmación de registro enviada:', response);
          // Aquí podrías actualizar la UI para mostrar que el registro fue exitoso
        },
        error => {
          console.error('Error al registrar en el evento:', error);
          // Aquí podrías actualizar la UI para mostrar el error
        }
      );
    } else {
      console.error('Usuario no autenticado o ID de evento no proporcionado.');
    }
  }

}
