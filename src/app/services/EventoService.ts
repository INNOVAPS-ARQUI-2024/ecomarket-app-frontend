// src/app/services/evento.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = '/api/eventos';

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}`);
  }

  // Obtener un evento por su ID
  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Obtener eventos por ID de usuario
  getEventosPorUsuario(userId: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  // Crear un nuevo evento
  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}`, evento);
  }

  // Actualizar un evento existente
  updateEvento(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar un evento por su ID
  deleteEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registrarUsuarioEnEvento(eventoId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar/${eventoId}/${userId}`, {});
  }

  obtenerEventosPorUsuario(userId: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/registrados/${userId}`);
  }

  getEventosPorFechaHora(fechaHora: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/fechahora/${fechaHora}`);
  }

  getEventosPorFecha(fecha: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/fecha/${fecha}`);
  }
}
