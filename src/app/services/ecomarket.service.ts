import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/Producto';
import { Resena } from '../model/Resena';
import { Servicio } from '../model/Servicio';


@Injectable({
  providedIn: 'root'
})
export class EcomarketService {

  private apiUrl = 'http://localhost:8080/api'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  // Obtener producto por ID
  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/productos/${id}`);
  }

  // Obtener reseñas
  getResenas(): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/reseñas`);
  }

  // Obtener reseña por ID
  getResena(id: string): Observable<Resena> {
    return this.http.get<Resena>(`${this.apiUrl}/reseñas/${id}`);
  }

  // Obtener servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`);
  }

  // Obtener servicio por ID
  getServicio(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/servicios/${id}`);
  }
}
