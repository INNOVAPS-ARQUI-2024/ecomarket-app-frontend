import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuarioId: string | null = null;
  perfilComprador: any = {
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
    metodosPago: [],
    preferenciasNotificacion: [],
  };

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(usuario => {
      if (usuario) {
        this.usuarioId = usuario.uid;
        this.cargarPerfilUsuario();
      }
    });
  }

    // Cargar la información del perfil del usuario desde la base de datos
    cargarPerfilUsuario(): void {
      if (this.usuarioId) {
        this.db.object(`/users/${this.usuarioId}`).valueChanges().subscribe((detallesUsuario: any) => {
          if (detallesUsuario) {
            this.perfilComprador = {
              nombre: detallesUsuario.name || '',
              correo: detallesUsuario.email || '',
              direccion: detallesUsuario.address || '',
              telefono: detallesUsuario.phone || '',
              metodosPago: detallesUsuario.paymentMethods || [],
              preferenciasNotificacion: detallesUsuario.notificationPreferences || [],
              aprobado: detallesUsuario.approved || false,
            };
          }
        });
      }
    }

  togglePreference(preference: string): void {
    const index = this.perfilComprador.preferenciasNotificacion.indexOf(preference);
    if (index === -1) {
      this.perfilComprador.preferenciasNotificacion.push(preference);
    } else {
      this.perfilComprador.preferenciasNotificacion.splice(index, 1);
    }
  }

  actualizarPerfil(): void {
    if (this.usuarioId) {
      const actualizaciones = {
        name: this.perfilComprador.nombre,
        address: this.perfilComprador.direccion,
        phone: this.perfilComprador.telefono,
        paymentMethods: this.perfilComprador.metodosPago,
        notificationPreferences: this.perfilComprador.preferenciasNotificacion,
      };

      this.db.object(`/users/${this.usuarioId}`).update(actualizaciones)
        .then(() => {
          console.log('Perfil actualizado con éxito');
        })
        .catch(error => {
          console.error('Error al actualizar el perfil', error);
        });
    }
  }
}
