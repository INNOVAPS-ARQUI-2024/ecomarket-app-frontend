import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicacionesComponent } from './admin-publicaciones.component';

describe('AdminPublicacionesComponent', () => {
  let component: AdminPublicacionesComponent;
  let fixture: ComponentFixture<AdminPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
