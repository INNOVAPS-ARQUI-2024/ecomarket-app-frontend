import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../model/Producto';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  @Input() selectedCategory!: string;
  @Output() selectedCategoryChange = new EventEmitter<string>();

  categories = [
    { name: 'Teléfonos', icon: './assets/images/Telefonos.png' },
    { name: 'Portátiles', icon: './assets/images/Computadores.png' },
    { name: 'Ropa', icon: './assets/images/Smartwatch.png' },
    { name: 'Tecnología', icon: './assets/images/Tecnologia.png' },
    { name: 'Mascotas', icon: './assets/images/Audifonos.png' },
    { name: 'Alimentos', icon: './assets/images/Gaming.png' }
  ];

  products: Producto[] = [];
  filteredProducts: Producto[] = [];


  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.products = data;
        this.filteredProducts = data; // Inicialmente se muestran todos los productos
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }

  onCategorySelected(category: any): void {
    this.selectedCategory = category ? category.name : null;
  }

  deselectCategory(): void {
    this.selectedCategory = "";
  }
}
