import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from '../services/EventoService';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: Evento[] = [];  // Cambiar productos por eventos
  userId: string | null = null;  // Almacena el ID del usuario autenticado
  action: string = '';  // Puede ser 'modificar', 'eliminar' o vacío para mostrar ambos

  constructor(
    private eventoService: EventoService,  // Cambiar ProductoService por EventoService
    private afAuth: AngularFireAuth,  // Inyectamos el servicio de autenticación
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        // Cargar los eventos del usuario autenticado
        if (this.userId) {
          this.eventoService.getEventosPorUsuario(this.userId).subscribe(  // Cambiar getProductosPorUsuario a getEventosPorUsuario
            (eventos: Evento[]) => {  // Cambiar productos a eventos
              this.eventos = eventos;  // Cambiar this.productos a this.eventos
            },
            error => {
              console.error('Error al cargar eventos:', error);  // Cambiar productos a eventos
            }
          );
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // O la ruta que definas para regresar
  }

  modificarEvento(eventId: string): void {  // Cambiar modificarProducto a modificarEvento
    if (eventId) {
      this.router.navigate([`/modificar-evento/${eventId}`]); // Redirige a la página de modificación con el ID del evento
    } else {
      console.error('Evento ID no válido.');  // Cambiar Producto por Evento
    }
  }

  agregarEvento(): void {  // Cambiar agregarProducto a agregarEvento
    this.router.navigate(['/formularios/evento'])
  }

  eliminarEvento(id: string): void {  // Cambiar eliminarProducto a eliminarEvento
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventoService.deleteEvento(id).subscribe(  // Cambiar deleteProducto a deleteEvento
        () => {
          // Actualizar la lista de eventos después de eliminar
          this.eventos = this.eventos.filter(evento => evento.eventoId !== id);  // Cambiar this.productos a this.eventos y productId a eventId
        },
        error => {
          console.error('Error al eliminar el evento:', error);  // Cambiar producto a evento
        }
      );
    }
  }
}
