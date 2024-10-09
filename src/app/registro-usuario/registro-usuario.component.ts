import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';  // Campo para confirmar la contraseña
  name: string = '';
  role: string = 'Comprador';  // Comprador por defecto
  profilePicture: string = '';  // Imagen de perfil (URL)
  phone: string = '';  // Número de teléfono
  errorMessage: string = '';  // Mensajes de error

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,  
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister() {
    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        // Usuario autenticado automáticamente después del registro
        const userId = result.user?.uid;
        const createdAt = new Date();
        const updatedAt = createdAt;
        const isActive = true;

        // Crea el objeto de Usuario con todos los campos
        const usuario: Usuario = {
          userId: userId || '',
          name: this.name,
          email: this.email,
          role: this.role,  // Guardar el rol (Comprador o Vendedor)
          profilePicture: this.profilePicture || '',  // Imagen de perfil (opcional)
          createdAt: createdAt,
          updatedAt: updatedAt,
          isActive: isActive,
          phone: this.phone || ''  // Guardar el teléfono (opcional)
        };

        // Guardar el usuario en Firebase Realtime Database
        if (userId) {
          this.db.object(`/users/${userId}`).set(usuario)
            .then(() => {
              // Redirige al usuario después del registro
              this.router.navigate(['/home-usuario']);
            })
            .catch((error) => {
              this.errorMessage = "Error al guardar los datos del usuario: " + error.message;
            });
        }
      })
      .catch((error) => {
        // Manejar errores en el registro
        this.errorMessage = "Error en el registro: " + error.message;
      });
  }
}
