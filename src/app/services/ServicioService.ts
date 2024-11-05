import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Servicio } from '../model/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = '/api/servicios';

  constructor(private http: HttpClient) { }

  // Obtener todos los servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}`);
  }

  // Obtener un servicio por ID
  getServicioById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  //obtener sevicios por usuario
  getServicioPorUsuario(userId: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  // Crear un nuevo servicio
  createServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.apiUrl}`, servicio).pipe(
      catchError(error => {
        console.error('Error al crear el servicio', error);
        return throwError(() => new Error('Error al crear el servicio'));
      })
    );
  }

  // Actualizar un servicio
  updateServicio(id: string, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio).pipe(
      catchError(error => {
        console.error('Error al actualizar el servicio', error);
        return throwError(() => new Error('Error al actualizar el servicio'));
      })
    );
  }

  // Eliminar un servicio
  deleteServicio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el servicio', error);
        return throwError(() => new Error('Error al eliminar el servicio'));
      })
    );
  }

  registrarUsuarioEnServicio(servicioId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar/${servicioId}/${userId}`, {});
  }

  obtenerServiciosPorUsuario(userId: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/registrados/${userId}`);
  }

}
