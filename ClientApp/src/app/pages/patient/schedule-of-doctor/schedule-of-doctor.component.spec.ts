import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfDoctorComponent } from './schedule-of-doctor.component';

describe('ScheduleOfDoctorComponent', () => {
  let component: ScheduleOfDoctorComponent;
  let fixture: ComponentFixture<ScheduleOfDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleOfDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleOfDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
