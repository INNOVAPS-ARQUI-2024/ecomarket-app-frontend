import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;  // Verificar si el usuario está autenticado
  profilePictureUrl: string = '';    // Almacena la URL de la imagen de perfil

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Obtener la información del usuario desde el backend
      this.authService.getUser().subscribe(
        (response) => {
          const user = response.user; // Aquí accedemos al objeto user dentro de la respuesta
          console.log('Usuario autenticado:', user);
          this.isAuthenticated = true;
          this.profilePictureUrl = user.profilePicture || 'https://via.placeholder.com/40';  // Coloca URL por defecto si no hay imagen
        },
        (error) => {
          console.error('Error al obtener la información del usuario', error);
          this.isAuthenticated = false;
        }
      );
    } else {
      this.isAuthenticated = false;
    }
  }

  // Función para cerrar sesión
  logOut() {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.profilePictureUrl = '';
      localStorage.removeItem('authToken');
      this.router.navigate(['/login-usuario']);
    });
  }
}
