import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioAdminComponent } from './registro-usuario-admin.component';

describe('RegistroUsuarioAdminComponent', () => {
  let component: RegistroUsuarioAdminComponent;
  let fixture: ComponentFixture<RegistroUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
