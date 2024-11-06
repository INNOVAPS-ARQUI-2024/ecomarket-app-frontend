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
  confirmPassword: string = '';
  name: string = '';
  role: string = 'Comprador';
  profilePicture: string = '';
  phone: string = '';
  address: string = '';  // Dirección de envío obligatoria
  errorMessage: string = '';
  notificationPreferences: string[] = [];  // Array para las preferencias de notificación

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void { }

  togglePreference(preference: string): void {
    const index = this.notificationPreferences.indexOf(preference);
    if (index === -1) {
      this.notificationPreferences.push(preference);
    } else {
      this.notificationPreferences.splice(index, 1);
    }
  }

  onRegister() {
    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    if (!this.address) {
      this.errorMessage = "La dirección de envío es obligatoria.";
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        const userId = result.user?.uid;
        const createdAt = new Date();
        const updatedAt = createdAt;
        const isActive = true;

        // Crea el objeto de Usuario sin el campo "approved"
        const usuario: Usuario = {
          userId: userId || '',
          name: this.name,
          email: this.email,
          role: this.role,
          profilePicture: this.profilePicture || '',
          phone: this.phone || '',
          address: this.address,
          paymentMethods: [],
          notificationPreferences: this.notificationPreferences,
          createdAt: createdAt,
          updatedAt: updatedAt,
          isActive: isActive,
          approved: false
        };

        // Guardar el usuario en Firebase Realtime Database
        if (userId) {
          this.db.object(`/users/${userId}`).set(usuario)
            .then(() => {
              this.router.navigate(['/home-usuario']);
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
