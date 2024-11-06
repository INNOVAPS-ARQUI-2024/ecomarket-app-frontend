import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Publication {
  date: Date;
  time: string;
  platform: string;
}

@Component({
  selector: 'app-programacion-publicaciones',
  templateUrl: './programacion-publicaciones.component.html',
  styleUrls: ['./programacion-publicaciones.component.css']
})
export class ProgramacionPublicacionesComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInMonth: number;
  firstDayOfMonth: Date;
  currentWeek: (Date | null)[] = [];
  weeks: (Date | null)[][] = [];
  selectedDate: Date | null = null;
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  selectedTime: string | null = null;
  selectedPlatform: string = '';
  socialMedia: string | null = null;
  programmedPosts: any[] = [];
  platforms: string[] = ['Facebook', 'Twitter', 'Instagram'];

  constructor(private router: Router) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.weeks = [];
    let currentWeek: (Date | null)[] = [];

    for (let i = 0; i < this.firstDayOfMonth.getDay(); i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= this.daysInMonth; day++) {
      currentWeek.push(new Date(this.currentYear, this.currentMonth, day));

      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      this.weeks.push(currentWeek);
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.generateCalendar();
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }

  selectDate(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
    }
  }

  isSelected(date: Date | null): boolean {
    return date ? this.selectedDate?.getTime() === date.getTime() : false;
  }

  isToday(date: Date | null): boolean {
    const today = new Date();
    return date
      ? date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      : false;
  }

  schedulePublication() {
    if (this.selectedDate && this.selectedTime && this.socialMedia) {
      const [hours, minutes] = this.selectedTime.split(':');
      const publicationDate = new Date(this.selectedDate);
      publicationDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      const post = {
        date: publicationDate.toLocaleString(),
        socialMedia: this.socialMedia
      };

      this.programmedPosts.push(post);

      // Redirige a un componente específico después de programar la publicación
      this.router.navigate(['/home-usuario']); // Cambia '/componente-destino' al nombre de ruta del componente deseado
    }
  }

  irAlHome(): void {
    this.router.navigate(['/home-usuario']);
  }
}
