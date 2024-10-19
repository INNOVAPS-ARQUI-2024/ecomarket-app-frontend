import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormularioEventoComponent } from './formularios/formulario-evento/formulario-evento.component';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { FormularioPublicidadComponent } from './formularios/formulario-publicidad/formulario-publicidad.component';
import { FormularioServicioComponent } from './formularios/formulario-servicio/formulario-servicio.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { VenderSeleccionComponent } from './vender-seleccion/vender-seleccion.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';

const routes: Routes = [
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: 'home-usuario', component: HomeUsuarioComponent},
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: '', redirectTo: '/home-usuario', pathMatch: 'full' },
  { path: 'vender-seleccion', component: VenderSeleccionComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/producto', component: FormularioProductoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/servicio', component: FormularioServicioComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/evento', component: FormularioEventoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/publicidad', component: FormularioPublicidadComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'lista-productos', component: ListaProductosComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'modificar-producto/:id', component: ModificarProductoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'lista-eventos', component: ListaEventosComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } }  // Solo para Vendedor
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
