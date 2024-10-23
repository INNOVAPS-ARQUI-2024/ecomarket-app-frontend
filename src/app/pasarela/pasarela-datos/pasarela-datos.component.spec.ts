import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarelaDatosComponent } from './pasarela-datos.component';

describe('PasarelaDatosComponent', () => {
  let component: PasarelaDatosComponent;
  let fixture: ComponentFixture<PasarelaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasarelaDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasarelaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
