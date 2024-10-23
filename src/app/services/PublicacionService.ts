import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private publicacionesProgramadas = new BehaviorSubject<any[]>([]);

  constructor() {}

  // Obtener las publicaciones programadas
  getPublicaciones() {
    return this.publicacionesProgramadas.asObservable();
  }

  // Agregar una nueva publicación
  agregarPublicacion(publicacion: any) {
    const publicacionesActuales = this.publicacionesProgramadas.getValue();
    publicacionesActuales.push(publicacion);
    this.publicacionesProgramadas.next(publicacionesActuales);
  }
}
