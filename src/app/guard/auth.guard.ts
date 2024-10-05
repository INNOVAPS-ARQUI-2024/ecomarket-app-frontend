import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Para acceder a la base de datos de usuarios
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = next.data['role'];  // Accedemos al 'role' usando notación de corchetes

    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          // Si el usuario no está autenticado, redirige a la página de login
          this.router.navigate(['/login-usuario']);
          return [false];
        } else {
          // Si el usuario está autenticado, busca sus detalles en la base de datos
          return this.db.object(`/users/${user.uid}`).valueChanges().pipe(
            map((userDetails: any) => {
              if (userDetails && userDetails.role === expectedRole) {
                return true;  // El usuario tiene el rol adecuado
              } else {
                console.log('Acceso denegado. Rol no autorizado.');
                this.router.navigate(['/login-usuario']);
                return false;
              }
            })
          );
        }
      })
    );
  }
}
