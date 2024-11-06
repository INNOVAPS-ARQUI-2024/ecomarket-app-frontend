import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/RoleService';

@Component({
  selector: 'app-modificar-permisos',
  templateUrl: './modificar-permisos.component.html',
  styleUrls: ['./modificar-permisos.component.css']
})
export class ModificarPermisosComponent implements OnInit {
  rolesPermissions: { [role: string]: string[] } = {};
  availableRoutes: string[] = [
    'home-usuario', 'pasarela-datos', 'pasarela-tarjeta', 'notificaciones', 
    'carrito', 'vender-seleccion', 'formularios/producto', 'formularios/servicio',
    'formularios/evento', 'formularios/publicidad', 'lista-productos',
    'modificar-producto/:id', 'modificar-evento/:id', 'lista-eventos',
    'eventos-disponibles', 'mis-eventos', 'programacion-publicaciones',
    'crear-publicaciones', 'detalle-producto/:id', 'pending-registrations',
    'editar-perfil', 'historial-compras', 'admin/lista-usuarios', 
    'admin/registro-usuario', 'admin/editar-usuario/:id','admin/modificar-permisos','admin/vista'
  ];
  isLoading = true;
  saveMessage: string | null = null;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRolesPermissions().subscribe(permissions => {
      this.rolesPermissions = permissions;
      this.isLoading = false;
    });
  }

  // Getter para obtener las claves de rolesPermissions
  get roleKeys(): string[] {
    return Object.keys(this.rolesPermissions);
  }

  togglePermission(role: string, route: string): void {
    const permissions = this.rolesPermissions[role] || [];
    if (permissions.includes(route)) {
      this.rolesPermissions[role] = permissions.filter(r => r !== route);
    } else {
      this.rolesPermissions[role] = [...permissions, route];
    }
  }

  savePermissions(): void {
    this.isLoading = true;
    Promise.all(
      Object.keys(this.rolesPermissions).map(role =>
        this.roleService.updateRolePermissions(role, this.rolesPermissions[role] || [])
      )
    ).then(() => {
      this.saveMessage = 'Permisos guardados correctamente';
      this.isLoading = false;
    }).catch(error => {
      console.error('Error al guardar permisos:', error);
      this.saveMessage = 'Error al guardar permisos';
      this.isLoading = false;
    });
  }
}
