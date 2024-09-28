import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Para recuperar la imagen de perfil de la base de datos
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;  // Verificar si el usuario está autenticado
  profilePictureUrl: string = '';    // Almacena la URL de la imagen de perfil

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  ngOnInit(): void {
    // Escuchar el estado de autenticación
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si el usuario está autenticado
        this.isAuthenticated = true;
        const userId = user.uid;

        // Recuperar la URL de la imagen de perfil del usuario desde Firebase Database
        this.db.object(`/users/${userId}/profilePicture`).valueChanges().subscribe((url: any) => {
          this.profilePictureUrl = url || 'https://via.placeholder.com/40';  // Colocar URL por defecto si no hay imagen
        });
      } else {
        this.isAuthenticated = false;
        this.profilePictureUrl = '';  // Vaciar la imagen si el usuario no está autenticado
      }
    });
  }

  // Función para cerrar sesión
  logOut() {
    this.afAuth.signOut().then(() => {
      this.isAuthenticated = false;  // Actualizar el estado de autenticación
      this.profilePictureUrl = '';   // Limpiar la URL de la imagen de perfil
      this.router.navigate(['/login-usuario']);  // Redirigir al login
    }).catch((error) => {
      console.error('Error al cerrar sesión: ', error);
    });
  }
}
