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
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaResenasComponent } from './lista-resenas/lista-resenas.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ResenaDetalleComponent } from './resena-detalle/resena-detalle.component';
import { ServicioDetalleComponent } from './servicio-detalle/servicio-detalle.component';
import { VenderSeleccionComponent } from './vender-seleccion/vender-seleccion.component';

import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { FormularioServicioComponent } from './formularios/formulario-servicio/formulario-servicio.component';
import { FormularioEventoComponent } from './formularios/formulario-evento/formulario-evento.component';
import { FormularioPublicidadComponent } from './formularios/formulario-publicidad/formulario-publicidad.component';

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
    HeaderComponent,
    LoginUsuarioComponent,
    RegistroUsuarioComponent,
    VenderSeleccionComponent,
    FormularioProductoComponent,
    FormularioServicioComponent,
    FormularioEventoComponent,
    FormularioPublicidadComponent
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
