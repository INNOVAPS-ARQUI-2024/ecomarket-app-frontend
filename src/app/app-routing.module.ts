import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { EventosDisponiblesComponent } from './eventos-disponibles/eventos-disponibles.component';
import { FooterComponent } from './footer/footer.component';
import { FormularioEventoComponent } from './formularios/formulario-evento/formulario-evento.component';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { FormularioPublicidadComponent } from './formularios/formulario-publicidad/formulario-publicidad.component';
import { FormularioServicioComponent } from './formularios/formulario-servicio/formulario-servicio.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { ModificarEventoComponent } from './modificar-evento/modificar-evento.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { PasarelaDatosComponent } from './pasarela/pasarela-datos/pasarela-datos.component';
import { PasarelaTarjetaComponent } from './pasarela/pasarela-tarjeta/pasarela-tarjeta.component';
import { PendingRegistrationsComponent } from './pending-registrations/pending-registrations.component';
import { ProgramacionPublicacionesComponent } from './programacion-publicaciones/programacion-publicaciones.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { VenderSeleccionComponent } from './vender-seleccion/vender-seleccion.component';


const routes: Routes = [
  { path: '', redirectTo: '/home-usuario', pathMatch: 'full' },
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: 'home-usuario', component: HomeUsuarioComponent},
  { path: 'pasarela-datos', component: PasarelaDatosComponent, canActivate: [AuthGuard],  data: { role: ['Vendedor', 'Comprador'] }},
  { path: 'pasarela-tarjeta', component: PasarelaTarjetaComponent, canActivate: [AuthGuard],  data: { role: ['Vendedor', 'Comprador'] }},
  { path: 'notificaciones', component: NotificacionComponent, canActivate: [AuthGuard],  data: { role: ['Vendedor', 'Comprador'] }},
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard],  data: { role: ['Vendedor', 'Comprador'] }},
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'vender-seleccion', component: VenderSeleccionComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/producto', component: FormularioProductoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/servicio', component: FormularioServicioComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/evento', component: FormularioEventoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'formularios/publicidad', component: FormularioPublicidadComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'lista-productos', component: ListaProductosComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'modificar-producto/:id', component: ModificarProductoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'modificar-evento/:id', component: ModificarEventoComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'lista-eventos', component: ListaEventosComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },  // Solo para Vendedor
  { path: 'eventos-disponibles', component: EventosDisponiblesComponent, canActivate: [AuthGuard],   data: { role: ['Vendedor', 'Comprador'] } },
  { path: 'mis-eventos', component: MisEventosComponent, canActivate: [AuthGuard],  data: { role: ['Vendedor', 'Comprador'] } },
  { path: 'programacion-publicaciones', component: ProgramacionPublicacionesComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },
  { path: 'crear-publicaciones', component: CrearPublicacionComponent, canActivate: [AuthGuard], data: { role: 'Vendedor' } },
  { path: 'detalle-producto/:id', component: DetalleProductoComponent },
  { path: 'pending-registrations', component: PendingRegistrationsComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
