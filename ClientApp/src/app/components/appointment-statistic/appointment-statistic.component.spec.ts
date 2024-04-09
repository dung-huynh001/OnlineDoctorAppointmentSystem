import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatisticComponent } from './appointment-statistic.component';

describe('AppointmentStatisticComponent', () => {
  let component: AppointmentStatisticComponent;
  let fixture: ComponentFixture<AppointmentStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
