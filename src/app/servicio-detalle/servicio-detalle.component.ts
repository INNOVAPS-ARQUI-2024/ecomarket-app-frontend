import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from '../model/Servicio';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.component.html',
  styleUrls: ['./servicio-detalle.component.css']
})
export class ServicioDetalleComponent implements OnInit {

  servicio: Servicio | undefined;

  constructor(
    private route: ActivatedRoute,
    private ecomarketService: EcomarketService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ecomarketService.getServicio(id!).subscribe(data => {
      this.servicio = data;
    });
  }
}
