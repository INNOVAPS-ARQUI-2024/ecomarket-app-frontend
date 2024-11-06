import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  // Iniciar sesión con email y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Redirigir al usuario a la página principal si el login es exitoso
        this.router.navigate(['/home-usuario']);
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión', error);
        // Aquí puedes agregar manejo de errores específicos, como mostrar mensajes al usuario
      });
  }

  // Registrar un nuevo usuario y guardar sus datos en la base de datos
  register(email: string, password: string, role: string = 'Comprador') {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const userId = result.user?.uid;
        if (userId) {
          // Guardar el rol del usuario en Firebase Database
          this.db.object(`/users/${userId}`).set({
            email,
            role  // Guardamos el rol del usuario
          });
        }
        this.router.navigate(['/home-usuario']);
      })
      .catch((error) => {
        console.error('Error en el registro', error);
      });
  }

  // Cerrar sesión
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login-usuario']);
    });
  }

  // Obtener el estado actual del usuario (si está autenticado)
  getUser() {
    return this.afAuth.authState;
  }

  // Obtener los detalles del usuario autenticado desde Firebase Database
  getUserDetails(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`/users/${user.uid}`).valueChanges();
        } else {
          return of(null); // Si no hay usuario, retorna null
        }
      })
    );
  }

  // Obtener el rol del usuario actual
  getUserRole(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.db.object<string>(`/users/${user.uid}/role`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
