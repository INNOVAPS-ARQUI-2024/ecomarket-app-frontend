import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;   // Verificar si el usuario está autenticado
  isAdmin: boolean = false;           // Verificar si el usuario es administrador
  profilePictureUrl: string = '';     // Almacena la URL de la imagen de perfil

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  ngOnInit(): void {
    // Escuchar el estado de autenticación
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        const userId = user.uid;

        // Recuperar la URL de la imagen de perfil del usuario desde Firebase Database
        this.db.object(`/users/${userId}/profilePicture`).valueChanges().subscribe((url: any) => {
          this.profilePictureUrl = url || 'https://via.placeholder.com/40';  // URL por defecto si no hay imagen
        });

        // Verificar si el usuario es administrador
        this.db.object(`/users/${userId}/role`).valueChanges().subscribe((role: any) => {
          this.isAdmin = role === 'Admin';  // Si el rol es "Admin", establecer isAdmin a true
          console.log('Rol del usuario:', role);
        });

      } else {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.profilePictureUrl = '';  // Limpiar la imagen si el usuario no está autenticado
      }
    });
  }

  onClickGoCarrito() {
    this.router.navigate(['/carrito']);
  }

  onClickGoNotificacion() {
    this.router.navigate(['/notificaciones']);
  }

  irAEditarPerfil(): void {
    this.router.navigate(['/editar-perfil']);
  }

  // Función para cerrar sesión
  logOut() {
    this.afAuth.signOut().then(() => {
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.profilePictureUrl = '';
      this.router.navigate(['/login-usuario']);
    }).catch((error) => {
      console.error('Error al cerrar sesión: ', error);
    });
  }
}
