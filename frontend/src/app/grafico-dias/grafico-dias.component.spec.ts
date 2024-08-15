import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDiasComponent } from './grafico-dias.component';

describe('GraficoDiasComponent', () => {
  let component: GraficoDiasComponent;
  let fixture: ComponentFixture<GraficoDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoDiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
