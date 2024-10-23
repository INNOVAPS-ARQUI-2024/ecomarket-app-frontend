import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarelaTarjetaComponent } from './pasarela-tarjeta.component';

describe('PasarelaTarjetaComponent', () => {
  let component: PasarelaTarjetaComponent;
  let fixture: ComponentFixture<PasarelaTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasarelaTarjetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasarelaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
