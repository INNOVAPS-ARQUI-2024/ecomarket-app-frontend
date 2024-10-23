import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/usuarios'; // Ajusta la URL del backend

  constructor(private http: HttpClient, private router: Router) { }

  // Iniciar sesión con email y contraseña
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingreso`, { email, password });
  }

  // Registrar un nuevo usuario
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { name, email, password });
  }

  // Cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // Obtener el estado actual del usuario (verificación de token)
  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');  // Asegúrate de que tienes el token
    if (!token) {
      return throwError('No se ha encontrado un token de autenticación');
    }

    return this.http.get(`${this.apiUrl}/validar-token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


}
