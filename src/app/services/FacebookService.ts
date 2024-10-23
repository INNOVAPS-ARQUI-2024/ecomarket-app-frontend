import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private accessToken = 'YOUR_ACCESS_TOKEN'; // El token de acceso
  private pageId = 'YOUR_PAGE_ID'; // ID de la página de Facebook

  constructor(private http: HttpClient) {}

  // Programar una publicación en Facebook
  programarPublicacionFacebook(mensaje: string, horaProgramada: Date) {
    const url = `https://graph.facebook.com/${this.pageId}/feed`;
    
    const params = {
      message: mensaje,
      published: 'false', // Para programar y no publicar inmediatamente
      scheduled_publish_time: Math.floor(horaProgramada.getTime() / 1000), // Tiempo en formato UNIX
      access_token: this.accessToken
    };

    return this.http.post(url, params);
  }
}
