import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaResenasComponent } from './lista-resenas.component';

describe('ListaResenasComponent', () => {
  let component: ListaResenasComponent;
  let fixture: ComponentFixture<ListaResenasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaResenasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
