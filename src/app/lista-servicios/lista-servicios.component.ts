import { Component, OnInit } from '@angular/core';
import { Servicio } from '../model/Servicio';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {

  servicios: Servicio[] = [];  // Array para almacenar los servicios

  constructor(private ecomarketService: EcomarketService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de servicios
    this.ecomarketService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;  // Asigna los datos a la lista de servicios
        console.log('Servicios cargados correctamente:', data);
      },
      error: (err) => {
        console.error('Error al cargar los servicios:', err);  // Log de errores
      }
    });
  }
}
