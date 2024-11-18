import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-registro-usuario-admin',
  templateUrl: './registro-usuario-admin.component.html',
  styleUrls: ['./registro-usuario-admin.component.css']
}) 
export class RegistroUsuarioAdminComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  role: string = 'Soporte'; // Rol predeterminado
  profilePicture: string = '';
  phone: string = '';
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onRegister() {
    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        const userId = result.user?.uid;
        const createdAt = new Date();
        const updatedAt = createdAt;
        const isActive = true;

        // Crea el objeto de Usuario para administradores
        const usuario: Usuario = {
          userId: userId || '',
          name: this.name,
          email: this.email,
          role: this.role,
          profilePicture: this.profilePicture || '',
          phone: this.phone || '',
          createdAt: createdAt,
          updatedAt: updatedAt,
          isActive: isActive,
          approved: false,
          address: ''
        };

        // Guardar el usuario en Firebase Realtime Database
        if (userId) {
          this.db.object(`/users/${userId}`).set(usuario)
            .then(() => {
              this.router.navigate(['/admin/lista-usuarios']);
            })
            .catch((error) => {
              this.errorMessage = "Error al guardar los datos del usuario: " + error.message;
            });
        }
      })
      .catch((error) => {
        this.errorMessage = "Error en el registro: " + error.message;
      });
  }
}
