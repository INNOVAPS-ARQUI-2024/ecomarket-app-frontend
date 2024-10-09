import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderSeleccionComponent } from './vender-seleccion.component';

describe('VenderSeleccionComponent', () => {
  let component: VenderSeleccionComponent;
  let fixture: ComponentFixture<VenderSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenderSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
