import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-editar-usuario-admin',
  templateUrl: './editar-usuario-admin.component.html',
  styleUrls: ['./editar-usuario-admin.component.css']
})
export class EditarUsuarioAdminComponent implements OnInit {
  usuario: Usuario = {
    userId: '',
    name: '',
    email: '',
    role: '',
    profilePicture: '',
    phone: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    approved: false,
    address: ''
  };
  errorMessage: string = '';

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.usuario.userId = userId;
      this.cargarUsuario(userId);
    }
  }

  // Cargar los datos del usuario desde Firebase
  cargarUsuario(userId: string) {
    console.log(`Cargando datos del usuario con ID: ${userId}`);
    this.db.object<Usuario>(`/users/${userId}`).valueChanges().subscribe(
      (usuario) => {
        if (usuario) {
          this.usuario = { ...usuario, userId };
          console.log('Datos del usuario cargados:', this.usuario);
        }
      },
      (error) => {
        this.errorMessage = 'Error al cargar los datos del usuario: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  // Actualizar perfil completo del usuario en Firebase
  actualizarPerfil() {
    const userId = this.usuario.userId;
    const nuevoEmail = this.usuario.email;

    console.log("Inicio de actualización del perfil del usuario con ID:", userId);
    console.log("Nuevo correo electrónico ingresado:", nuevoEmail);

    // Verificar que el ID y el nuevo correo estén definidos antes de proceder
    if (!userId || !nuevoEmail) {
      this.errorMessage = 'El ID de usuario o el correo nuevo no están definidos.';
      console.error(this.errorMessage);
      return;
    }

    console.log("1. Solicitando actualización del correo en Firebase Auth.");

    // Primero actualizamos el correo en Firebase Auth
    this.usuarioService.actualizarEmailAuth(userId, nuevoEmail).subscribe({
      next: () => {
        console.log("2. Correo actualizado exitosamente en Firebase Auth.");
        console.log("Procediendo a actualizar los datos del usuario en Realtime Database.");

        // Crear objeto con todos los datos del usuario a actualizar en Realtime Database
        const usuarioActualizado: Partial<Usuario> = {
          email: nuevoEmail,
          name: this.usuario.name,
          role: this.usuario.role,
          profilePicture: this.usuario.profilePicture,
          phone: this.usuario.phone,
          address: this.usuario.address,
          isActive: this.usuario.isActive,
          approved: this.usuario.approved,
          updatedAt: new Date()
        };

        // Actualizar los datos del usuario en Realtime Database
        this.db.object(`/users/${userId}`).update(usuarioActualizado)
          .then(() => {
            console.log("3. Datos del perfil actualizados en Realtime Database.");
            console.log("Redirigiendo a la lista de usuarios.");
            this.router.navigate(['/admin/lista-usuarios']); // Redirigir a la lista de usuarios
          })
          .catch(error => {
            console.error("Error al actualizar el perfil en Realtime Database:", error);
            this.errorMessage = 'Error al actualizar el perfil en Realtime Database: ' + error.message;
          });
      },
      error: (error) => {
        console.error("Error al actualizar el correo en Firebase Auth:", error);
        this.errorMessage = 'Error al actualizar el correo en Firebase Auth: ' + error.message;
      }
    });
  }


}
