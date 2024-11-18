import { Component, OnInit } from '@angular/core';
import { AuthCredential, EmailAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuarioId: string | null = null;
  perfilComprador: any = {
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
    metodosPago: [],
    preferenciasNotificacion: [],
  };
  preferenciasExistentes: string[] = [];
  nuevoCorreo: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usuario => {
      if (usuario) {
        this.usuarioId = usuario.uid;
        this.cargarPerfilUsuario();
      }
    });
  }

  cargarPerfilUsuario(): void {
    if (this.usuarioId) {
      this.db.object(`/users/${this.usuarioId}`).valueChanges().subscribe((detallesUsuario: any) => {
        if (detallesUsuario) {
          this.perfilComprador = {
            nombre: detallesUsuario.name || '',
            correo: detallesUsuario.email || '',
            direccion: detallesUsuario.address || '',
            telefono: detallesUsuario.phone || '',
            metodosPago: detallesUsuario.paymentMethods || [],
            preferenciasNotificacion: detallesUsuario.notificationPreferences || [],
            aprobado: detallesUsuario.approved || false,
          };

          // Asigna el correo actual al nuevo campo de correo para sincronizarlo
          this.nuevoCorreo = detallesUsuario.email || '';
        }
      });
    }
  }


  togglePreference(preference: string): void {
    const index = this.perfilComprador.preferenciasNotificacion.indexOf(preference);
    if (index === -1) {
      this.perfilComprador.preferenciasNotificacion.push(preference);
    } else {
      this.perfilComprador.preferenciasNotificacion.splice(index, 1);
    }
  }

  async actualizarPerfil(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      console.log("Correo actual del usuario:", user.email);
      console.log("Nuevo correo ingresado:", this.nuevoCorreo);

      if (user.email !== this.nuevoCorreo) {
        try {
          // Revisar si el usuario tiene un proveedor de contraseña
          const providerData = user.providerData[0];
          let credential: AuthCredential;

          if (providerData!.providerId === 'password') {
            // Usuario registrado con email y contraseña, pide contraseña al usuario
            const password = prompt('Por favor, ingresa tu contraseña actual para confirmar el cambio de correo:');
            credential = EmailAuthProvider.credential(user.email!, password!);
            // Reautenticar al usuario con la credencial generada
            await user.reauthenticateWithCredential(credential);
            console.log("Usuario reautenticado con éxito.");
          } else if (providerData!.providerId === 'google.com') {
            // Usuario autenticado con Google
            const googleProvider = new GoogleAuthProvider();
            await user.reauthenticateWithPopup(googleProvider);

          } else {
            throw new Error("Método de autenticación no compatible.");
          }



          // Ahora intenta actualizar el correo
          await user.updateEmail(this.nuevoCorreo);
          console.log("Correo actualizado en Firebase Auth.");

          // Opcionalmente, también actualiza el correo en la base de datos
          await this.db.object(`/users/${this.usuarioId}`).update({
            email: this.nuevoCorreo
          });
          console.log('Correo actualizado en la base de datos.');

          // Redirigir después de la actualización exitosa
          this.router.navigate(['/home-usuario']);
        } catch (error) {
          console.error("Error al actualizar el correo en Firebase Auth:", error);
        }
      } else {
        console.log("El correo nuevo es igual al actual. No se realiza cambio.");
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  }





  isPreferenceSelected(preference: string): boolean {
    return this.perfilComprador.preferenciasNotificacion.includes(preference);
  }
}
