import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPermisosComponent } from './modificar-permisos.component';

describe('ModificarPermisosComponent', () => {
  let component: ModificarPermisosComponent;
  let fixture: ComponentFixture<ModificarPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPermisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
