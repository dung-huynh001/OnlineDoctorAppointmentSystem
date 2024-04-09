import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartsComponent } from './donut-charts.component';

describe('DonutChartsComponent', () => {
  let component: DonutChartsComponent;
  let fixture: ComponentFixture<DonutChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonutChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonutChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
