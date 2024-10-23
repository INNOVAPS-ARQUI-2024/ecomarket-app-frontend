import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosUsuarioComponent } from './lista-productos-usuario.component';

describe('ListaProductosUsuarioComponent', () => {
  let component: ListaProductosUsuarioComponent;
  let fixture: ComponentFixture<ListaProductosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProductosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProductosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
