import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // publicacionForm: FormGroup;
  // redesSociales = ['Facebook', 'Twitter'];

  // constructor(
  //   private fb: FormBuilder,
  //   private facebookService: FacebookService,
  //   private twitterService: TwitterService
  // ) {
  //   this.publicacionForm = this.fb.group({
  //     redSocial: ['', Validators.required],
  //     contenido: ['', Validators.required],
  //     fechaProgramada: ['', Validators.required]
  //   });
  // }

  // ngOnInit(): void {}

  // crearPublicacion(): void {
  //   if (this.publicacionForm.valid) {
  //     const { redSocial, contenido, fechaProgramada } = this.publicacionForm.value;
  //     const fecha = new Date(fechaProgramada);

  //     if (redSocial === 'Facebook') {
  //       this.facebookService.programarPublicacionFacebook(contenido, fecha)
  //         .subscribe(response => console.log('Publicación programada en Facebook', response));
  //     } else if (redSocial === 'Twitter') {
  //       this.twitterService.publicarTweet(contenido)
  //         .subscribe(response => console.log('Tweet publicado en Twitter', response));
  //     }
  //   } else {
  //     console.log('Formulario inválido');
  //   }
  // }

}
