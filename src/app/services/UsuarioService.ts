import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }


  // Eliminar un usuario
  eliminarUsuario(uid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${uid}`, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error al eliminar usuario:', error);
        return throwError(() => error);
      })
    );
  }
}
