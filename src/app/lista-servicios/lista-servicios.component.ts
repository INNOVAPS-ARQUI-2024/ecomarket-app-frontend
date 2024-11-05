import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/model/Servicio';
import { ServicioService } from '../services/ServicioService';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {

  servicios: Servicio[] = [];
  userId: string | null = null; // Almacena el ID del usuario autenticado
  action: string = ''; // Puede ser 'modificar', 'eliminar' o vacío para mostrar ambos

  constructor(
    private servicioService: ServicioService,
    private afAuth: AngularFireAuth, 
    private router: Router

  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        // Cargar los servicios del usuario autenticado
        if (this.userId) {
          this.servicioService.getServicioPorUsuario(this.userId).subscribe(  
            (servicios: Servicio[]) => {  
              this.servicios = servicios;  
            },
            error => {
              console.error('Error al cargar servicios:', error);  
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

  modificarServicio(serviceId: string): void { 
    if (serviceId) {
      this.router.navigate([`/modificar-servicio/${serviceId}`]); 
      console.error('servicio ID no válido.');  
    }
  }

  agregarServicio(): void {  // Cambiar agregarProducto a agregarEvento
    this.router.navigate(['/formularios/servicio'])
  }

  eliminarServicio(id: string): void {  // Cambiar eliminarProducto a eliminarEvento
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.servicioService.deleteServicio(id).subscribe(  // Cambiar deleteProducto a deleteEvento
        () => {
          // Actualizar la lista de eventos después de eliminar
          this.servicios = this.servicios.filter(servicio => servicio.serviceId !== id);  // Cambiar this.productos a this.eventos y productId a eventId
        },
        error => {
          console.error('Error al eliminar el servicio:', error);  // Cambiar producto a evento
        }
      );
    }
  }
}
