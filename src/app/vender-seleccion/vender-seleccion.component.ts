import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vender-seleccion',
  templateUrl: './vender-seleccion.component.html',
  styleUrls: ['./vender-seleccion.component.css']
})
export class VenderSeleccionComponent implements OnInit {
  selectedOptions: string[] = [];
  userId: string | null = null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    // Obtener el estado del usuario autenticado
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        // Si no hay usuario autenticado, redirigir al login
        this.router.navigate(['/login-usuario']);
      }
    });
  }

  // Manejar los cambios en los checkboxes
  onOptionChange(event: any, option: string) {
    if (event.target.checked) {
      if (!this.selectedOptions.includes(option)) {
        this.selectedOptions.push(option);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(opt => opt !== option);
    }
  }

  // Guardar las selecciones y redirigir
  continuar() {
    if (this.userId) {
      // Obtener las opciones previamente guardadas en Firebase
      this.db.object(`/users/${this.userId}`).valueChanges().subscribe((user: any) => {
        let tiposVendedorPrevios = user?.tiposVendedor || [];

        // Combinar las opciones previas con las nuevas sin duplicados
        const nuevasOpciones = this.selectedOptions.filter(opt => !tiposVendedorPrevios.includes(opt));
  
        // Combinar los arrays sin duplicados y filtrar valores undefined o vacíos
        const opcionesActualizadas = [...tiposVendedorPrevios, ...nuevasOpciones].filter(opt => opt !== undefined && opt !== null && opt !== '');
  
        // Actualizar los tipos de vendedor en Firebase
        this.db.object(`/users/${this.userId}`).update({ tiposVendedor: opcionesActualizadas })
          .then(() => {
            // Redirigir a la página deseada después de actualizar
            this.router.navigate(['']);

            // Redirigir dinámicamente al primer formulario seleccionado
            /*if (this.selectedOptions.length > 0) {
              const tipoSeleccionado = this.selectedOptions[0];
              switch (tipoSeleccionado) {
                case 'producto':
                  this.router.navigate(['/formularios/producto']);
                  break;
                case 'servicio':
                  this.router.navigate(['/formularios/servicio']);
                  break;
                case 'evento':
                  this.router.navigate(['/formularios/evento']);
                  break;
                case 'publicidad':
                  this.router.navigate(['/formularios/publicidad']);
                  break;
                default:
                  this.router.navigate(['/home-usuario']);
              }
            }*/
          })
          .catch((error) => {
            console.error('Error al actualizar el usuario:', error);
          });
      }, (error) => {
        console.error('Error al obtener los tipos de vendedor previos:', error);
      });
    } else {
      console.error('Error: Usuario no autenticado.');
    }
  }


}
