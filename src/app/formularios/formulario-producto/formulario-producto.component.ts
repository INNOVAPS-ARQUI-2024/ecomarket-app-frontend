import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/ProductoService';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent {
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

  errorMessage: string = '';  // Variable para almacenar mensajes de error
  selectedFile: File | null = null;  // Variable para almacenar la imagen seleccionada

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private authService: AuthService // Cambiado a AuthService en lugar de AngularFireAuth
  ) { }

  ngOnInit(): void {
    // Solicitar el estado del usuario desde el backend
    this.authService.getUser().subscribe(
      (user) => {
        if (user && user.uid) {
          this.producto.sellerId = user.uid;
        } else {
          console.error('Usuario no autenticado');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  // Manejar la selección de archivos de imagen
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Validar stock para asegurar que sea mayor a cero y entero
  validateStock(): boolean {
    if (this.producto.stock <= 0 || !Number.isInteger(this.producto.stock)) {
      this.errorMessage = 'La cantidad en stock debe ser un número entero positivo.';
      return false;
    }
    return true;
  }

  // Validar precio para asegurar que no sea negativo
  validatePrice(): boolean {
    if (this.producto.price < 0) {
      this.errorMessage = 'El precio no puede ser negativo.';
      return false;
    }
    return true;
  }

  // Validar campos obligatorios (nombre, descripción, categoría)
  validateFields(): boolean {
    if (!this.producto.name.trim() || !this.producto.description.trim() || !this.producto.category.trim()) {
      this.errorMessage = 'El nombre, descripción y categoría no pueden estar vacíos.';
      return false;
    }
    return true;
  }

  // Enviar formulario
  onSubmit(): void {
    if (!this.validateFields() || !this.validateStock() || !this.validatePrice()) {
      return;  // No proceder si la validación falla
    }

    if (!this.producto.sellerId) {
      console.error('No se ha asignado un sellerId.');
      return;
    }

    // Crear el FormData para enviar el producto con la imagen
    const formData = new FormData();
    formData.append('name', this.producto.name);
    formData.append('description', this.producto.description);
    formData.append('price', this.producto.price.toString());
    formData.append('currency', this.producto.currency);
    formData.append('category', this.producto.category);
    formData.append('stock', this.producto.stock.toString());
    formData.append('sellerId', this.producto.sellerId);

    if (this.selectedFile) {
      formData.append('picture', this.selectedFile); // Agregamos la imagen si fue seleccionada
    }

    // Llamar al servicio para crear el producto
    this.productoService.createProducto(formData).subscribe(
      response => {
        console.log('Producto creado:', response);
        this.router.navigate(['/home-usuario']);
      },
      error => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
}
