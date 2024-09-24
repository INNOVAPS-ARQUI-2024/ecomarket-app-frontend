import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/Producto';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = []; // Usa el modelo Producto

  constructor(private ecomarketService: EcomarketService) { }

  ngOnInit(): void {
    this.ecomarketService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
