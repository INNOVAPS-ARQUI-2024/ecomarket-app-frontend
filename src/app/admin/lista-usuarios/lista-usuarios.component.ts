import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosPaginados: any[] = [];
  paginaActual = 1;
  usuariosPorPagina = 5;
  totalPaginas = 1;

  constructor(
    private usuarioService: UsuarioService,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.db.list('/users').snapshotChanges().subscribe(snapshots => {
      this.usuarios = snapshots.map(snapshot => {
        const data = snapshot.payload.val() as Usuario; // Asegura que data es de tipo Usuario
        const uid = snapshot.key || '';
        return { uid, ...data }; // Ahora TypeScript sabe que data es un objeto
      }).filter(user => user.role !== 'Admin'); // Filtrar para excluir "Admin"
      this.totalPaginas = Math.ceil(this.usuarios.length / this.usuariosPorPagina);
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    this.usuariosPaginados = this.usuarios.slice(inicio, inicio + this.usuariosPorPagina);
  }

  siguientePagina() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }


  deleteUser(uid: string) {
    if (confirm(`¿Está seguro de que quiere eliminar este usuario?`)) {
      this.db.object(`/users/${uid}`).remove()
        .then(() => {
          this.usuarioService.eliminarUsuario(uid).subscribe({
            next: (response) => console.log(response),
            error: (error) => console.error('Error al eliminar usuario:', error)
          });
        })
        .catch(error => console.error('Error al eliminar usuario de Realtime Database:', error));
    }
  }
}
