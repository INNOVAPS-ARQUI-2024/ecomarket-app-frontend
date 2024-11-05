import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/model/Servicio';
import { ServicioService } from '../services/ServicioService';

@Component({
  selector: 'app-modificar-servicio',
  templateUrl: './modificar-servicio.component.html',
  styleUrls: ['./modificar-servicio.component.css']
})
export class ModificarServicioComponent implements OnInit {

  servicio: Servicio = {
    serviceId: '',             // ID del servicio (opcional)
    name: '',                  // Nombre del servicio
    description: '',           // Descripción del servicio
    price: 0,                  // Precio del servicio
    category: '',              // Categoría del servicio
    providerId: '',            // ID del proveedor
    availability: '',          // Disponibilidad del servicio
    reviews: [],               // Reseñas del servicio
    createdAt: new Date(),     // Fecha de creación
    updatedAt: new Date(),     // Fecha de actualización
    sellerId: '',
  };
  

  servicioConCosto: boolean = false;  // Estado del checkbox para costo

  constructor(
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.servicioService.getServicioById(id).subscribe(
        (servicio: Servicio) => {
          this.servicioConCosto = this.servicio.price > 0;
        },
        error => {
          console.error('Error al cargar el servicio:', error);
        }
      );
    } else {
      console.error('ID de servicio no proporcionado.');
      this.router.navigate(['/lista-servicios']);
    }
  }

  toggleCosto(): void {
    if (!this.servicioConCosto) {
      this.servicio.price = 0; // Resetea el precio si el checkbox se desmarca
    }
  }

  guardarCambios(): void {
    const serviceId = this.servicio.serviceId;
    if (serviceId) {
      this.servicioService.updateServicio(serviceId, this.servicio).subscribe(
        () => {
          console.log('Servicio actualizado');
          this.router.navigate(['/lista-servicios']);
        },
        error => {
          console.error('Error al actualizar el servicio:', error);
        }
      );
    } else {
      console.error('No se puede actualizar: ID de servicio no definido.');
    }
  }
}
