import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/EventoService';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  eventos: Evento[] = [];
  userId: string | null = null;

  constructor(
    private eventoService: EventoService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.cargarMisEventos();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  cargarMisEventos(): void {
    if (this.userId) {
      this.eventoService.obtenerEventosPorUsuario(this.userId).subscribe(
        (eventos: Evento[]) => {
          this.eventos = eventos;
        },
        error => {
          console.error('Error al cargar mis eventos:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/home-usuario']);
  }
}
