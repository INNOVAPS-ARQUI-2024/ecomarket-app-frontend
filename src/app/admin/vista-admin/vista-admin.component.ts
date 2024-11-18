import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {
  userId: string | null = null;
  isAdmin: boolean = false;  // Bandera para saber si el usuario es administrador

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, // Para acceder a Firebase Realtime Database
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.db.object(`/users/${this.userId}`).valueChanges().subscribe((userDetails: any) => {
          if (userDetails) {
            // Verifica el rol del usuario
            if (userDetails.role === 'Admin') {
              this.isAdmin = true; // El usuario es administrador
            } else if (userDetails.role === 'Vendedor') {
              const tiposVendedor = userDetails.tiposVendedor || [];
            }
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }


  navigateToPendingRegistrations(): void {
    this.router.navigate(['/pending-registrations']);
  }

}
