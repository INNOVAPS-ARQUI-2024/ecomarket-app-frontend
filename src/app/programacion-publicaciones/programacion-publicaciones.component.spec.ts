import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionPublicacionesComponent } from './programacion-publicaciones.component';

describe('ProgramacionPublicacionesComponent', () => {
  let component: ProgramacionPublicacionesComponent;
  let fixture: ComponentFixture<ProgramacionPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramacionPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
