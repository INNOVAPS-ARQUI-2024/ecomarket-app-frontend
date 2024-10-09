import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Iniciar sesión con email y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Si la autenticación es exitosa, redirige a la página principal
        this.router.navigate(['/home-usuario']);
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión', error);
      });
  }

  // Registrar un nuevo usuario
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Aquí podrías realizar más acciones, como enviar un email de verificación
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
}
