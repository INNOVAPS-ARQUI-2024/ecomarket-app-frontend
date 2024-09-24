import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resena } from '../model/Resena';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-resena-detalle',
  templateUrl: './resena-detalle.component.html',
  styleUrls: ['./resena-detalle.component.css']
})
export class ResenaDetalleComponent implements OnInit {

  resena: Resena | undefined;

  constructor(
    private route: ActivatedRoute,
    private ecomarketService: EcomarketService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ecomarketService.getResena(id!).subscribe(data => {
      this.resena = data;
    });
  }
}
