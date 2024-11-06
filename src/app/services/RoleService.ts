import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private rolesPermissions: { [role: string]: string[] } = {};

    constructor(private db: AngularFireDatabase) {
        this.loadRolesPermissions();
    }

    // Cargar permisos de cada rol al iniciar
    private loadRolesPermissions() {
        this.db.object<{ [role: string]: string[] }>('/roles')
            .valueChanges()
            .subscribe(permissions => {
                if (permissions) {
                    this.rolesPermissions = permissions;
                }
            });
    }

    // Obtener los permisos del rol
    // Dentro de RoleService
    getPermissions(role: string): string[] {
        const permissions = this.rolesPermissions[role] || [];
        console.log(`Permisos para el rol ${role}:`, permissions);
        return permissions;
    }

    // Verificar si un rol tiene permiso para una ruta específica
    hasPermission(role: string, route: string): boolean {
        const permissions = this.getPermissions(role);
        return permissions.includes(route);
    }

    // Obtener permisos de todos los roles
    getRolesPermissions(): Observable<{ [role: string]: string[] }> {
        return this.db.object<{ [role: string]: string[] }>('/roles').valueChanges().pipe(
            map(permissions => permissions || {}) // Devuelve un objeto vacío si es null
        );
    }

    // Actualizar permisos de un rol específico
    updateRolePermissions(role: string, permissions: string[]): Promise<void> {
        return this.db.object(`/roles/${role}`).set(permissions);
    }
}
