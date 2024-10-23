import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela-tarjeta',
  templateUrl: './pasarela-tarjeta.component.html',
  styleUrls: ['./pasarela-tarjeta.component.css']
})
export class PasarelaTarjetaComponent implements OnInit {
  notificationVisible: boolean = false; // Estado de visibilidad de la notificación

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Método para mostrar la notificación
  showNotification(): void {
    this.notificationVisible = true; // Muestra la notificación

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      this.notificationVisible = false; // Oculta la notificación
    }, 3000); // Tiempo en milisegundos
  }

  onClickCompraFinalizada(){
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}

