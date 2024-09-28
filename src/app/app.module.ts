import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { environment } from '../environments/environment';

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
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

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
    RegistroUsuarioComponent
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
