import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickCheckOut(){
    this.router.navigate(['/pasarela-datos']);
  }
}
