import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/PublicacionService'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-programacion-publicaciones',
  templateUrl: './programacion-publicaciones.component.html',
  styleUrls: ['./programacion-publicaciones.component.css']
})
export class ProgramacionPublicacionesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // currentMonth: number;
  // currentYear: number;
  // daysInMonth: number;
  // firstDayOfMonth: Date;
  // currentWeek: (Date | null)[] = [];
  // weeks: (Date | null)[][] = [];
  // publicacionesProgramadas: any[] = []; // Para almacenar las publicaciones programadas

  // constructor(private publicacionService: PublicacionService,  private router: Router) {
  //   const today = new Date();
  //   this.currentMonth = today.getMonth();
  //   this.currentYear = today.getFullYear();
  //   this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
  //   this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  // }

  // ngOnInit(): void {
  //   this.generateCalendar();

  //   // Suscribirse a las publicaciones programadas del servicio
  //   this.publicacionService.getPublicaciones().subscribe(publicaciones => {
  //     this.publicacionesProgramadas = publicaciones;
  //     this.updateCalendarWithPublicaciones(); // Actualizar el calendario con las publicaciones
  //   });
    
  // }

  

  // // Función para generar el calendario del mes actual
  // generateCalendar(): void {
  //   let currentWeek: (Date | null)[] = [];

  //   // Agregar los días vacíos (null) antes del primer día del mes
  //   for (let i = 0; i < this.firstDayOfMonth.getDay(); i++) {
  //     currentWeek.push(null);
  //   }

  //   // Agregar los días válidos del mes
  //   for (let day = 1; day <= this.daysInMonth; day++) {
  //     currentWeek.push(new Date(this.currentYear, this.currentMonth, day));

  //     // Si la semana está completa (7 días), agregarla al array de semanas y empezar una nueva
  //     if (currentWeek.length === 7) {
  //       this.weeks.push(currentWeek);
  //       currentWeek = [];
  //     }
  //   }

  //   // Agregar la última semana si no está completa
  //   if (currentWeek.length > 0) {
  //     this.weeks.push(currentWeek);
  //   }
  // }

  // // Actualizar el calendario con las publicaciones programadas
  // updateCalendarWithPublicaciones(): void {
  //   this.weeks.forEach(week => {
  //     week.forEach(day => {
  //       if (day) {
  //         const publicacion = this.publicacionesProgramadas.find(pub => {
  //           const fechaPublicacion = new Date(pub.fechaProgramada);
  //           return (
  //             fechaPublicacion.getDate() === day.getDate() &&
  //             fechaPublicacion.getMonth() === day.getMonth() &&
  //             fechaPublicacion.getFullYear() === day.getFullYear()
  //           );
  //         });
  //         if (publicacion) {
  //           // Aquí puedes marcar el día con una clase CSS o algo que lo indique
  //           console.log(`Publicación programada en: ${day.toDateString()}`);
  //         }
  //       }
  //     });
  //   });
  // }

  // // Lógica para programar una publicación (puedes personalizarla más tarde)
  // programarPublicacion(): void {
  //   this.router.navigate(['/programacion-publicaciones']);
  // }

  // // Lógica para volver al home
  // volverHome(): void {
  //   this.router.navigate(['/home-usuario']);
  // }
}
