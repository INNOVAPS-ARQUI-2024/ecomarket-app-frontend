import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  producto: Producto = {
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    category: '',
    stock: 0,
    sellerId: '',
    reviews: [],
    createdAt: new Date()
  };

  selectedFile: File | null = null; // Variable para almacenar la imagen seleccionada

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
    if (id) {
      this.productoService.getProductoById(id).subscribe(
        (producto: Producto) => {
          this.producto = producto;
        },
        error => {
          console.error('Error al cargar el producto:', error);
        }
      );
    } else {
      console.error('ID de producto no proporcionado.');
      this.router.navigate(['/lista-productos']);
    }
  }

  // Método para manejar la selección de la imagen
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Método para guardar cambios en el producto
  guardarCambios(): void {
    const productId = this.producto.productId;
    if (productId) {
      // Creamos el FormData para enviar los datos del producto junto con la imagen
      const formData = new FormData();
      formData.append('name', this.producto.name);
      formData.append('description', this.producto.description);
      formData.append('price', this.producto.price.toString());
      formData.append('currency', this.producto.currency);
      formData.append('category', this.producto.category);
      formData.append('stock', this.producto.stock.toString());

      if (this.selectedFile) {
        formData.append('picture', this.selectedFile); // Añadimos la imagen si fue seleccionada
      }

      this.productoService.updateProducto(productId, formData).subscribe(
        () => {
          console.log('Producto actualizado');
          this.router.navigate(['/lista-productos']);
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.error('No se puede actualizar: ID de producto no definido.');
    }
  }
}
