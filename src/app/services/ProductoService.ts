import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = '/api/productos';


  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener producto por ID
  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto con imagen (usando FormData)
  createProducto(formData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, formData).pipe(
      catchError(error => {
        if (error.status === 400) {
          console.error('Error: Datos del producto inválidos');
          alert('Error: Los datos del producto no son válidos. Por favor verifica la información.');
        }
        return throwError(error);
      })
    );
  }

  // Actualizar un producto existente con imagen (usando FormData)
  updateProducto(id: string, formData: FormData): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(error => {
        if (error.status === 400) {
          console.error('Error: Datos del producto inválidos para la actualización');
          alert('Error: Los datos del producto no son válidos. Por favor verifica la información.');
        }
        return throwError(error);
      })
    );
  }

  // Eliminar un producto
  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener productos por sellerId
  getProductosPorUsuario(sellerId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/usuario/${sellerId}`);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  getProductosMasVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mas-vendidos`);
  }
}
