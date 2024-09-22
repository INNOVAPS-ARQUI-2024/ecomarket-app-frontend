import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaResenasComponent } from './lista-resenas/lista-resenas.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ResenaDetalleComponent } from './resena-detalle/resena-detalle.component';
import { ServicioDetalleComponent } from './servicio-detalle/servicio-detalle.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'home-usuario',component:  HomeUsuarioComponent},
  { path: 'header',component:  HeaderComponent},
  { path: 'footer',component:  FooterComponent},
  { path: 'productos', component: ListaProductosComponent },
  { path: 'producto-detalle/:id', component: ProductoDetalleComponent },
  { path: 'reseñas', component: ListaResenasComponent },
  { path: 'resena-detalle/:id', component: ResenaDetalleComponent },
  { path: 'servicios', component: ListaServiciosComponent },
  { path: 'servicio-detalle/:id', component: ServicioDetalleComponent },
  { path: '', redirectTo: '/home-usuario', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }