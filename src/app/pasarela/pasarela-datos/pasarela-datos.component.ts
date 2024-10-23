import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela-datos',
  templateUrl: './pasarela-datos.component.html',
  styleUrls: ['./pasarela-datos.component.css']
})
export class PasarelaDatosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickPagar(){
    this.router.navigate(['/pasarela-tarjeta'])
  }

}
