import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // Método para registrar un nuevo usuario
  onRegister() {
    this.authService.register(this.email, this.password)
      .then(() => {
        // Registro exitoso, aquí puedes limpiar el formulario o redirigir
        this.email = '';
        this.password = '';
      })
      .catch((error) => {
        // Manejar error en el registro
        this.errorMessage = error.message;
        console.error('Error en el registro', error);
      });
  }
}
