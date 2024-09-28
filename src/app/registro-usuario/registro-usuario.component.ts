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
  name: string = '';
  role: string = 'Comprador';
  profilePicture: string = '';
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onRegister() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        // El usuario ya está autenticado automáticamente después del registro.
        const userId = result.user?.uid;
        const createdAt = new Date();
        const updatedAt = createdAt;
        const isActive = true;

        // Crea el objeto usuario
        const usuario: Usuario = {
          userId: userId || '',
          name: this.name,
          email: this.email,
          role: this.role,
          profilePicture: this.profilePicture || '',  // Si no se especifica, será un string vacío.
          createdAt: createdAt,
          updatedAt: updatedAt,
          isActive: isActive
        };

        // Una vez que el usuario está autenticado, guarda la información en Firebase
        if (userId) {
          this.db.object(`/users/${userId}`).set(usuario)
            .then(() => {
              // Redirige a la página de inicio del usuario después de guardar los datos
              this.router.navigate(['/home-usuario']);
            })
            .catch((error) => {
              this.errorMessage = "Error al guardar los datos del usuario: " + error.message;
            });
        }
      })
      .catch((error) => {
        // Maneja los errores de registro/autenticación
        this.errorMessage = "Error en el registro: " + error.message;
      });
  }
}
