import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaResenasComponent } from './lista-resenas/lista-resenas.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ResenaDetalleComponent } from './resena-detalle/resena-detalle.component';
import { ServicioDetalleComponent } from './servicio-detalle/servicio-detalle.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    ProductoDetalleComponent,
    ListaResenasComponent,
    ResenaDetalleComponent,
    ListaServiciosComponent,
    ServicioDetalleComponent,
    HomeUsuarioComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Asegúrate de que HttpClientModule esté en imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }