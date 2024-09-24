import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../model/Producto';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto | undefined; // Usa el modelo Producto

  constructor(
    private route: ActivatedRoute,
    private ecomarketService: EcomarketService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ecomarketService.getProducto(id!).subscribe(data => {
      this.producto = data;
    });
  }
}
