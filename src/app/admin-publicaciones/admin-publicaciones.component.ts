import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-publicaciones',
  templateUrl: './admin-publicaciones.component.html',
  styleUrls: ['./admin-publicaciones.component.css']
})
export class AdminPublicacionesComponent implements OnInit {
  postContent: string = ''; 
  platforms: string[] = ['facebook', 'twitter', 'instagram'];
  selectedPlatforms: { [key: string]: boolean } = {};
  scheduleDate: string = ''; 
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.platforms.forEach(platform => this.selectedPlatforms[platform] = false);
  }

  // Función para manejar la selección de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Función para programar publicación
  schedulePost() {
    const selectedPlatformsArray = Object.keys(this.selectedPlatforms)
      .filter(platform => this.selectedPlatforms[platform]);

    // Validar que todos los campos estén completos
    if (!this.postContent || !selectedPlatformsArray.length || !this.scheduleDate) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('postContent', this.postContent);
    formData.append('platforms', JSON.stringify(selectedPlatformsArray));
    formData.append('scheduleDate', this.scheduleDate);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('http://ecomarket-servicio-control-usuarios:8082/api/usuarios/schedule-post', formData)
      .subscribe(
        response => {
          alert('Publicación programada con éxito');
          this.resetForm();
        },
        error => {
          alert('Hubo un error al programar la publicación');
          console.error('Error:', error);
        }
      );
  }

  resetForm() {
    this.postContent = '';
    this.selectedPlatforms = {};
    this.scheduleDate = '';
    this.selectedFile = null;
    this.ngOnInit();
  }
}
