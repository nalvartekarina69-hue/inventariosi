import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarIngresoComponent } from './agregar-editar-ingreso.component';

describe('AgregarEditarIngresoComponent', () => {
  let component: AgregarEditarIngresoComponent;
  let fixture: ComponentFixture<AgregarEditarIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarIngresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
