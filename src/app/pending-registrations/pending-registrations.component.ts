import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-registrations',
  templateUrl: './pending-registrations.component.html',
  styleUrls: ['./pending-registrations.component.css']
})
export class PendingRegistrationsComponent implements OnInit {

  pendingRegistrations = [
    { id: 1, name: 'Usuario 1', email: 'usuario1@javeriana.edu.co' },
    { id: 2, name: 'Usuario 2', email: 'usuario2@gmail.com' },
    { id: 3, name: 'Usuario 3', email: 'usuario3@javeriana.edu.co' },
    { id: 4, name: 'Usuario 4', email: 'usuario4@yahoo.com' },
    // Datos mockeados para pruebas
  ];

  filteredRegistrations = this.pendingRegistrations;

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar los registros pendientes desde un servicio
    this.showAll(); // Mostrar todos los registros al inicio
  }

  showAll(): void {
    this.filteredRegistrations = this.pendingRegistrations;
  }

  showInternal(): void {
    this.filteredRegistrations = this.pendingRegistrations.filter(registration =>
      registration.email.endsWith('@javeriana.edu.co')
    );
  }

  showExternal(): void {
    this.filteredRegistrations = this.pendingRegistrations.filter(registration =>
      !registration.email.endsWith('@javeriana.edu.co')
    );
  }

  approve(id: number): void {
    console.log(`Registro con ID ${id} aprobado`);
    // Lógica para aprobar el registro
  }

  reject(id: number): void {
    console.log(`Registro con ID ${id} rechazado`);
    // Lógica para rechazar el registro
  }

}
