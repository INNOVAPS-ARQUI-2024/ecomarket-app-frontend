import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { VenderSeleccionComponent } from './vender-seleccion/vender-seleccion.component';

import { FormularioEventoComponent } from './formularios/formulario-evento/formulario-evento.component';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { FormularioPublicidadComponent } from './formularios/formulario-publicidad/formulario-publicidad.component';
import { FormularioServicioComponent } from './formularios/formulario-servicio/formulario-servicio.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { PasarelaDatosComponent } from './pasarela/pasarela-datos/pasarela-datos.component';
import { PasarelaTarjetaComponent } from './pasarela/pasarela-tarjeta/pasarela-tarjeta.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { ModificarEventoComponent } from './modificar-evento/modificar-evento.component';
import { RegistroEventoComponent } from './registro-evento/registro-evento.component';
import { EventosDisponiblesComponent } from './eventos-disponibles/eventos-disponibles.component';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { ProgramacionPublicacionesComponent } from './programacion-publicaciones/programacion-publicaciones.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { ListaProductosUsuarioComponent } from './lista-productos-usuario/lista-productos-usuario.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeUsuarioComponent,
    FooterComponent,
    HeaderComponent,
    LoginUsuarioComponent,
    RegistroUsuarioComponent,
    VenderSeleccionComponent,
    FormularioProductoComponent,
    FormularioServicioComponent,
    FormularioEventoComponent,
    FormularioPublicidadComponent,
    ListaProductosComponent,
    ModificarProductoComponent,
    PasarelaDatosComponent,
    PasarelaTarjetaComponent,
    NotificacionComponent,
    CarritoComponent
    ListaEventosComponent,
    ModificarEventoComponent,
    RegistroEventoComponent,
    EventosDisponiblesComponent,
    MisEventosComponent,
    ProgramacionPublicacionesComponent,
    CrearPublicacionComponent,
    ListaProductosUsuarioComponent,
    ListaCategoriasComponent,
    DetalleProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Asegúrate de que HttpClientModule esté en imports
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule // Asegúrate de incluir FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
