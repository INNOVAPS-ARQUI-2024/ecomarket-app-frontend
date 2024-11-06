import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.usuario.userId = userId;
      this.cargarUsuario(userId);
    }
  }

  // Cargar los datos del usuario desde Firebase
  cargarUsuario(userId: string) {
    this.db.object<Usuario>(`/users/${userId}`).valueChanges().subscribe(
      (usuario) => {
        if (usuario) {
          this.usuario = { ...usuario, userId };
        }
      },
      (error) => {
        this.errorMessage = 'Error al cargar los datos del usuario: ' + error.message;
      }
    );
  }

  // Guardar los cambios del perfil
  actualizarPerfil() {
    const userId = this.usuario.userId;
    this.usuario.updatedAt = new Date();

    if (userId) {
      this.db.object(`/users/${userId}`).update(this.usuario)
        .then(() => {
          this.router.navigate(['/admin/lista-usuarios']); // Redirigir a la lista de usuarios
        })
        .catch((error) => {
          this.errorMessage = 'Error al actualizar el perfil: ' + error.message;
        });
    }
  }
}
