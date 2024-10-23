import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Producto } from '../model/Producto';
import { Router } from '@angular/router'; // Importar el Router

@Component({
  selector: 'app-lista-productos-usuario',
  templateUrl: './lista-productos-usuario.component.html',
  styleUrls: ['./lista-productos-usuario.component.css']
})
export class ListaProductosUsuarioComponent implements OnInit, OnChanges {

  @Input() products: Producto[] = [];
  @Input() selectedCategory: string | null = null;

  filteredProducts: Producto[] = [];
  paginatedProducts: Producto[] = [];

  itemsPerPage = 16;
  currentPage = 1;
  totalPages = 1;

  constructor(private router: Router) {} // Inyectar el Router

  ngOnInit(): void {
    this.filterProducts();
  }

  ngOnChanges(): void {
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = [...this.products];
    }
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navegar al detalle del producto
  verDetalles(productId: string): void {
    this.router.navigate(['/detalle-producto', productId]);
  }
}
