import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-publicaciones',
  templateUrl: './admin-publicaciones.component.html',
  styleUrls: ['./admin-publicaciones.component.css']
})
export class AdminPublicacionesComponent implements OnInit {
  postContent: string = ''; 
  platforms: string[] = ['facebook', 'twitter', 'instagram']; // Plataformas disponibles
  selectedPlatforms: { [key: string]: boolean } = {}; // Plataformas seleccionadas como objeto
  scheduleDate: string = ''; 
  apiKey: string = '2B632B7F-4E9343C5-AC2533FA-BE1E6318';  
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializar selectedPlatforms con false para cada plataforma
    this.platforms.forEach(platform => this.selectedPlatforms[platform] = false);
  }

  // Función para manejar la selección de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Asignar el archivo seleccionado a `selectedFile`
    }
  }

  schedulePost() {
    const selectedPlatformsArray = Object.keys(this.selectedPlatforms)
      .filter(platform => this.selectedPlatforms[platform]);

    if (this.postContent && selectedPlatformsArray.length && this.scheduleDate) {
      const formData = new FormData();
      formData.append('postContent', this.postContent);
      formData.append('platforms', JSON.stringify(selectedPlatformsArray));
      formData.append('scheduleDate', this.scheduleDate);
      formData.append('apiKey', this.apiKey);

      // Si hay un archivo seleccionado, se añade a formData
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
      

      this.http.post('http://localhost:8082/schedule-post', formData)
        .subscribe(
          response => alert('Publicación programada con éxito'),
          error => alert('Hubo un error al programar la publicación')
        );
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}

