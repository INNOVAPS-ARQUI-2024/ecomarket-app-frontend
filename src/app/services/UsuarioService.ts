import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private apiUrl = 'http://localhost:7999/api/usuarios';

    constructor(private http: HttpClient) { }

    // Eliminar un usuario
    eliminarUsuario(uid: string): Observable<any> {
        console.log(`Llamando al endpoint para eliminar el usuario con UID: ${uid}`);
        return this.http.delete(`${this.apiUrl}/eliminar/${uid}`, { responseType: 'text' }).pipe(
            catchError(error => {
                console.error('Error al eliminar usuario:', error);
                return throwError(() => error);
            })
        );
    }

    // Actualizar el correo electrónico de un usuario
    actualizarEmailAuth(uid: string, nuevoEmail: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/actualizar-email-auth`, { uid, nuevoEmail }, { responseType: 'text' }).pipe(
            catchError(error => {
                console.error('Error al actualizar el correo en Auth:', error);
                return throwError(() => error);
            })
        );
    }


}
