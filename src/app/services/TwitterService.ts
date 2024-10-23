import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private apiUrl = 'https://api.twitter.com/2/tweets';
  private bearerToken = 'YOUR_BEARER_TOKEN'; // Token de acceso de la app

  constructor(private http: HttpClient) {}

  // Programar un tweet
  programarTweet(contenido: string, horaProgramada: Date) {
    // Aquí necesitarías lógica para almacenar el tweet programado
    // y una función que lo envíe cuando llegue la horaProgramada
  }

  // Publicar un tweet inmediatamente
  publicarTweet(contenido: string) {
    const headers = {
      Authorization: `Bearer ${this.bearerToken}`
    };

    const body = {
      text: contenido
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
