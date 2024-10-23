import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUsuarioComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);

        // Verificar si el token está presente en la respuesta
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);  // Guarda el token en el localStorage
          this.router.navigate(['/home-usuario']);  // Redirige al usuario a la página de inicio
        } else {
          console.error('No se recibió un token válido.');
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
      }
    );
  }


}
