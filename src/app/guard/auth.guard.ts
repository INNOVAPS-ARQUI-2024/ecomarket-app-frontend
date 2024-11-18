import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const routePath = this.normalizeRoutePath(state.url);  // Normalizamos la ruta solicitada

    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login-usuario']);
          return of(false);
        } else {
          return this.authService.getUserRole().pipe(
            switchMap(userRole => {
              if (userRole) {
                return this.checkPermissions(userRole, routePath);
              } else {
                this.router.navigate(['/home-usuario']);
                return of(false);
              }
            }),
            catchError(() => {
              this.router.navigate(['/login-usuario']);
              return of(false);
            })
          );
        }
      })
    );
  }

  // Normaliza rutas con parámetros dinámicos a un formato común
  private normalizeRoutePath(routePath: string): string {
    // Reemplaza cualquier segmento que parezca un ID por ":id"
    return routePath.slice(1).replace(/\/[a-zA-Z0-9_-]{20,}/g, '/:id');
  }

  // Comprobar permisos específicos en Firebase para la ruta solicitada
  private checkPermissions(userRole: string, routePath: string): Observable<boolean> {
    console.log(`Verificando permisos de ${userRole} para la ruta ${routePath}`);
    return this.db.object<string[]>(`/roles/${userRole}`).valueChanges().pipe(
      take(1),
      map((allowedRoutes) => {
        console.log(`Rutas permitidas para ${userRole}:`, allowedRoutes);
        if (allowedRoutes && allowedRoutes.includes(routePath)) {
          return true;
        } else {
          console.log('Acceso denegado. Permiso no autorizado para la ruta:', routePath);
          this.router.navigate(['/home-usuario']);
          return false;
        }
      })
    );
  }
}
