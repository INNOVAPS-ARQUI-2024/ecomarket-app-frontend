import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormularioEventoComponent } from './formularios/formulario-evento/formulario-evento.component';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { FormularioPublicidadComponent } from './formularios/formulario-publicidad/formulario-publicidad.component';
import { FormularioServicioComponent } from './formularios/formulario-servicio/formulario-servicio.component';
import { HeaderComponent } from './header/header.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { VenderSeleccionComponent } from './vender-seleccion/vender-seleccion.component';

const routes: Routes = [
  { path: 'login-usuario',component: LoginUsuarioComponent},
  { path: 'home-usuario',component:  HomeUsuarioComponent},
  { path: 'header',component:  HeaderComponent},
  { path: 'footer',component:  FooterComponent},
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: '', redirectTo: '/home-usuario', pathMatch: 'full' },
  { path: 'vender-seleccion', component: VenderSeleccionComponent },
  { path: 'formularios/producto', component: FormularioProductoComponent },
  { path: 'formularios/servicio', component: FormularioServicioComponent },
  { path: 'formularios/evento', component: FormularioEventoComponent },
  { path: 'formularios/publicidad', component: FormularioPublicidadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }