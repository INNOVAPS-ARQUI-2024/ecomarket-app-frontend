import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Servicio } from '../model/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private baseUrl = 'http://localhost:7999/api/servicios';

  constructor(private http: HttpClient) { }

  // Obtener todos los servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}`);
  }

  // Obtener un servicio por ID
  getServicioById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo servicio
  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.baseUrl}`, servicio).pipe(
      catchError(error => {
        console.error('Error al crear el servicio', error);
        return throwError(() => new Error('Error al crear el servicio'));
      })
    );
  }

  // Actualizar un servicio
  updateServicio(id: string, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.baseUrl}/${id}`, servicio).pipe(
      catchError(error => {
        console.error('Error al actualizar el servicio', error);
        return throwError(() => new Error('Error al actualizar el servicio'));
      })
    );
  }

  // Eliminar un servicio
  deleteServicio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el servicio', error);
        return throwError(() => new Error('Error al eliminar el servicio'));
      })
    );
  }

}
