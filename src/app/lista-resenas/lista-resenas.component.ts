import { Component, OnInit } from '@angular/core';
import { Resena } from '../model/Resena';
import { EcomarketService } from '../services/ecomarket.service';

@Component({
  selector: 'app-lista-resenas',
  templateUrl: './lista-resenas.component.html',
  styleUrls: ['./lista-resenas.component.css']
})
export class ListaResenasComponent implements OnInit {

  resenas: Resena[] = [];

  constructor(private ecomarketService: EcomarketService) { }

  ngOnInit(): void {
    this.ecomarketService.getResenas().subscribe(data => {
      this.resenas = data;
    });
  }
}
