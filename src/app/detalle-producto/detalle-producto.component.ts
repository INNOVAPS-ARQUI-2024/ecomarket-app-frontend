import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/ProductoService';
import { Producto } from '../model/Producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto | undefined;
  productosRelacionados: Producto[] = []; // Arreglo para productos relacionados

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetail();
      }
    });
  }

  getProductDetail(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productoService.getProductoById(productId).subscribe((producto: Producto) => {
        this.producto = producto;
        if (producto) {
          this.getProductosRelacionados(producto.category); // Llamar a los productos relacionados
        }
      });
    }
  }

  getProductosRelacionados(categoria: string): void {
    this.productoService.getProductosPorCategoria(categoria).subscribe((productos: Producto[]) => {
      // Filtra el producto actual para no mostrarlo en los relacionados
      this.productosRelacionados = productos.filter(p => p.productId !== this.producto?.productId);
    });
  }

  irADetalleProducto(producto: Producto): void {
    this.router.navigate(['/detalle-producto', producto.productId]);  // Navegar a la nueva URL
  }
}
